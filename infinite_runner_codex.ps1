# SolKnow Autonomous Pulse Runner (V6.0 - CODEX EDITION)
# Usage: powershell -ExecutionPolicy Bypass -File infinite_runner_codex.ps1

param(
    [int]$CheckInterval = 60,
    [int]$SyncCooldown = 10,
    [string]$LogFile = "AUTOMATION_LOG.md",
    [string]$TasksFile = "TASKS.md",
    [string]$LockFile = ".codex_runner.lock",
    [string]$CodexOutputFile = ".codex_last_message.txt"
)

if ($IsWindows) { chcp 65001 | Out-Null }
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$ErrorActionPreference = "Stop"
if ($null -ne (Get-Variable -Name PSNativeCommandUseErrorActionPreference -ErrorAction SilentlyContinue)) {
    $PSNativeCommandUseErrorActionPreference = $false
}

function Resolve-CodexLauncher {
    $candidates = @()
    try {
        $candidates = @(where.exe codex 2>$null)
    } catch {
        $candidates = @()
    }

    $cmdCandidate = $candidates | Where-Object { $_ -match '\.cmd$' } | Select-Object -First 1
    if (-not [string]::IsNullOrWhiteSpace($cmdCandidate)) {
        return $cmdCandidate.Trim()
    }

    $direct = Get-Command "codex" -ErrorAction SilentlyContinue
    if ($direct -and -not [string]::IsNullOrWhiteSpace($direct.Path)) {
        return $direct.Path
    }

    return "codex"
}

$global:LAST_CHECKED_RUN_ID = ""
$global:WORKSPACE_ROOT = (Get-Location).Path
$global:CODEX_LAUNCHER = Resolve-CodexLauncher
$global:EXCLUDED_SYNC_PATHS = @(
    $LogFile,
    $LockFile,
    $CodexOutputFile
)

# 模型优先级：优先使用指定主模型，再回退到 Codex 专用模型。
$MODEL_CANDIDATES_PRIMARY = @("gpt-5.4", "gpt-5.3-codex")
$MODEL_CANDIDATES_EXECUTOR = @("gpt-5.4", "gpt-5.3-codex")

function Write-Log($message, $type = "INFO", $toFile = $true) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $tag = "[INFO]"
    $color = "Gray"

    if ($type -eq "SUCCESS") { $tag = "[ OK ]"; $color = "Green" }
    elseif ($type -eq "ERROR") { $tag = "[ERR ]"; $color = "Red" }
    elseif ($type -eq "PLAN") { $tag = "[PLAN]"; $color = "Cyan" }
    elseif ($type -eq "EXEC") { $tag = "[EXE ]"; $color = "Yellow" }
    elseif ($type -eq "WARN") { $tag = "[WARN]"; $color = "DarkYellow" }

    $logEntry = "[$timestamp] $tag $message"
    Write-Host $logEntry -ForegroundColor $color
    if ($toFile) {
        Add-Content -Path $LogFile -Value $logEntry -Encoding UTF8
    }
}

function Ensure-LogFile {
    if (-not (Test-Path $LogFile)) {
        Add-Content -Path $LogFile -Value "# SolKnow Audit Logs`n" -Encoding UTF8
    }
}

function Ensure-Command($commandName) {
    if (-not (Get-Command $commandName -ErrorAction SilentlyContinue)) {
        throw "Required command not found: $commandName"
    }
}

function Test-GitAvailable {
    try {
        git rev-parse --is-inside-work-tree *> $null
        return ($LASTEXITCODE -eq 0)
    } catch {
        return $false
    }
}

function Invoke-GitRebasePull {
    $pullOutput = cmd /c "git pull origin main --rebase 2>&1"
    $pullExit = $LASTEXITCODE

    if ($pullOutput) {
        $logType = if ($pullExit -eq 0) { "INFO" } else { "WARN" }
        foreach ($line in @($pullOutput)) {
            if (-not [string]::IsNullOrWhiteSpace($line)) {
                Write-Log "git pull: $line" $logType
            }
        }
    }

    if ($pullExit -ne 0) {
        $rebaseMerge = Test-Path ".git\rebase-merge"
        $rebaseApply = Test-Path ".git\rebase-apply"
        if ($rebaseMerge -or $rebaseApply) {
            Write-Log "Detected unfinished rebase state. Trying auto-abort." "WARN"
            cmd /c "git rebase --abort 2>&1" *> $null
        }
    }

    return $pullExit
}

function Acquire-Lock {
    if (Test-Path $LockFile) {
        $existing = Get-Content -Path $LockFile -ErrorAction SilentlyContinue
        $pidLine = $existing | Where-Object { $_ -match '^pid=\d+$' } | Select-Object -First 1
        $existingPid = $null

        if ($pidLine) {
            $existingPid = [int]($pidLine -replace '^pid=', '')
        }

        $lockIsActive = $false
        if ($existingPid) {
            $activeProcess = Get-Process -Id $existingPid -ErrorAction SilentlyContinue
            if ($activeProcess) {
                $lockIsActive = $true
            }
        }

        if ($lockIsActive) {
            throw "Runner lock already exists: $LockFile | $existing"
        }

        Write-Log "Detected stale runner lock. Reclaiming $LockFile." "WARN"
        Remove-Item $LockFile -Force -ErrorAction SilentlyContinue
    }

    $payload = @(
        "pid=$PID"
        "started=$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
        "cwd=$($global:WORKSPACE_ROOT)"
    )
    Set-Content -Path $LockFile -Value $payload -Encoding UTF8
}

function Release-Lock {
    if (Test-Path $LockFile) {
        Remove-Item $LockFile -Force -ErrorAction SilentlyContinue
    }
}

function Show-Logo {
    $colors = @("Cyan", "Blue", "White")
    $randomColor = $colors[(Get-Random -Maximum $colors.Count)]
    Clear-Host
    Write-Host @"
      [ SOLKNOW OMNI-FLOW V6.0 - CODEX EDITION ]
      ________________________________________________________________________________________________________
      S T R A T E G I C   A U T O N O M Y (CODEX EXEC / SAFE SYNC / LOCKED SINGLETON)
      ________________________________________________________________________________________________________
"@ -ForegroundColor $randomColor
}

function Check-CloudStatus {
    try {
        $lastRunJson = gh run list --workflow "Deploy to GitHub Pages" --limit 1 --json databaseId,status,conclusion,displayTitle
        if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($lastRunJson)) {
            Write-Log "Cloud status check skipped: gh returned no data." "WARN"
            return
        }

        $lastRun = $lastRunJson | ConvertFrom-Json
        if ($lastRun -and $lastRun[0].databaseId -ne $global:LAST_CHECKED_RUN_ID) {
            if ($lastRun[0].status -eq "completed") {
                if ($lastRun[0].conclusion -eq "success") {
                    Write-Log "Cloud Deployment VERIFIED: $($lastRun[0].displayTitle)" "SUCCESS"
                } else {
                    Write-Log "Cloud Deployment ALERT: $($lastRun[0].displayTitle) FAILED!" "ERROR"
                }
                $global:LAST_CHECKED_RUN_ID = $lastRun[0].databaseId
            }
        }
    } catch {
        Write-Log "Cloud status check failed: $($_.Exception.Message)" "WARN"
    }
}

function Get-TasksRaw {
    if (-not (Test-Path $TasksFile)) {
        throw "Tasks file not found: $TasksFile"
    }
    return Get-Content -Path $TasksFile -Raw
}

function Get-NextPendingTask {
    $content = Get-TasksRaw
    $match = [regex]::Match($content, '(?m)^\s*- \[ \] (.*)$')
    if ($match.Success) {
        return $match.Groups[1].Value.Trim()
    }
    return $null
}

function Replace-FileContent($path, $content) {
    [System.IO.File]::WriteAllText((Resolve-Path $path), $content, [System.Text.UTF8Encoding]::new($false))
}

function Lock-Task($taskDesc) {
    $content = Get-TasksRaw
    $escaped = [regex]::Escape($taskDesc)
    $replacement = "[/] $taskDesc (正在执行...)"
    $updated = [regex]::Replace($content, "(?m)^\s*- \[ \] $escaped\s*$", $replacement, 1)

    if ($updated -eq $content) {
        throw "Unable to lock task: $taskDesc"
    }

    Replace-FileContent -path $TasksFile -content $updated
}

function Unlock-StuckTasks {
    if (-not (Test-Path $TasksFile)) {
        return
    }

    $content = Get-TasksRaw
    $updated = [regex]::Replace($content, '(?m)^\s*\[\/\]\s+(.*?)\s+\((正在执行\.\.\.|姝ｅ湪鎵ц\.\.\.)\)\s*$', '- [ ] $1')
    if ($updated -ne $content) {
        Write-Log "Startup: detected stuck task marker and reverted it." "WARN"
        Replace-FileContent -path $TasksFile -content $updated
        $null = Invoke-Sync "chore: startup self-heal"
    }
}

function Get-ChangedPaths {
    $lines = git status --porcelain
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to query git status."
    }

    $paths = @()
    foreach ($line in $lines) {
        if ([string]::IsNullOrWhiteSpace($line) -or $line.Length -lt 4) {
            continue
        }

        $rawPath = $line.Substring(3).Trim()
        if ($rawPath -match ' -> ') {
            $rawPath = ($rawPath -split ' -> ')[-1].Trim()
        }

        if ($global:EXCLUDED_SYNC_PATHS -contains $rawPath) {
            continue
        }

        $paths += $rawPath
    }

    return $paths | Select-Object -Unique
}

function Test-HasSyncableChanges {
    $paths = Get-ChangedPaths
    return ($paths -and $paths.Count -gt 0)
}

function Suspend-ExcludedChanges {
    $stashName = "codex-runner-temp-$(Get-Date -Format 'yyyyMMddHHmmss')"
    $targetPaths = @()

    foreach ($path in $global:EXCLUDED_SYNC_PATHS) {
        if (Test-Path $path) {
            $targetPaths += $path
        }
    }

    if (-not $targetPaths -or $targetPaths.Count -eq 0) {
        return $null
    }

    $statusBefore = git status --porcelain -- $targetPaths
    if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace(($statusBefore -join "").Trim())) {
        return $null
    }

    $beforeRefs = @(git stash list --format="%gd")
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to inspect stash state before suspending runtime changes."
    }

    & git stash push --include-untracked -m $stashName -- $targetPaths *> $null
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to stash excluded runtime changes."
    }

    $afterRefs = @(git stash list --format="%gd")
    if ($LASTEXITCODE -ne 0 -or -not $afterRefs -or $afterRefs.Count -eq 0) {
        throw "Unable to verify temporary runtime stash."
    }

    foreach ($ref in $afterRefs) {
        if ($beforeRefs -notcontains $ref) {
            return $ref
        }
    }

    throw "Unable to verify temporary runtime stash."
}

function Restore-ExcludedChanges($stashRef) {
    if ([string]::IsNullOrWhiteSpace($stashRef)) {
        return
    }

    $stashFiles = @(git stash show --name-only --format="" $stashRef)
    if ($LASTEXITCODE -ne 0) {
        Write-Log "Failed to inspect temporary runtime stash: $stashRef" "WARN"
        return
    }

    $stashPaths = $stashFiles | Where-Object { -not [string]::IsNullOrWhiteSpace($_) } | ForEach-Object { $_.Trim() } | Select-Object -Unique
    $workingPaths = @()
    $statusLines = @(git status --porcelain)
    if ($LASTEXITCODE -eq 0) {
        foreach ($line in $statusLines) {
            if ([string]::IsNullOrWhiteSpace($line) -or $line.Length -lt 4) {
                continue
            }

            $rawPath = $line.Substring(3).Trim()
            if ($rawPath -match ' -> ') {
                $rawPath = ($rawPath -split ' -> ')[-1].Trim()
            }
            $workingPaths += $rawPath
        }
    }

    $conflicts = @($stashPaths | Where-Object { $workingPaths -contains $_ })
    if ($conflicts.Count -gt 0) {
        Write-Log "Skipped restoring temporary runtime stash $stashRef due to local changes in: $($conflicts -join ', ')" "WARN"
        if ($stashRef -match '^stash@\{\d+\}$') {
            cmd /c "git stash drop $stashRef 1>nul 2>nul"
            if ($LASTEXITCODE -eq 0) {
                Write-Log "Dropped stale temporary runtime stash: $stashRef" "INFO"
            }
        }
        return
    }

    cmd /c "git stash pop $stashRef 1>nul 2>nul"
    if ($LASTEXITCODE -ne 0) {
        Write-Log "Failed to restore temporary runtime stash: $stashRef" "WARN"
        return
    }

    Write-Log "Restored temporary runtime stash: $stashRef" "INFO"
}

function Restore-LatestCodexRuntimeStash {
    $entries = @(git stash list)
    if ($LASTEXITCODE -ne 0 -or -not $entries) {
        return
    }

    $targetEntry = $entries | Where-Object { $_ -match 'codex-runner-temp-' } | Select-Object -First 1
    if (-not $targetEntry) {
        return
    }

    $stashRef = ($targetEntry -split ':', 2)[0].Trim()
    if (-not [string]::IsNullOrWhiteSpace($stashRef)) {
        Restore-ExcludedChanges $stashRef
    }
}

function Invoke-InitialPullSafely {
    if (Test-HasSyncableChanges) {
        Write-Log "Initial sync skipped: workspace has local syncable changes." "WARN"
        return $false
    }

    $runtimeStash = $null
    try {
        $runtimeStash = Suspend-ExcludedChanges

        $pullExit = Invoke-GitRebasePull
        if ($pullExit -ne 0) {
            throw "Initial git pull --rebase failed."
        }

        return $true
    } finally {
        Restore-ExcludedChanges $runtimeStash
    }
}

function Invoke-Sync($message) {
    $paths = Get-ChangedPaths
    if (-not $paths -or $paths.Count -eq 0) {
        Write-Log "No syncable changes detected." "INFO"
        return $false
    }

    Write-Log "Pre-flight: Running local type-check..." "INFO"
    npm run typecheck *> $null
    if ($LASTEXITCODE -ne 0) {
        Write-Log "Pre-flight FAILED: type-check errors detected. Sync aborted." "ERROR"
        return $false
    }

    Write-Log ">>> [SYNC] Aligning changes with cloud..." "EXEC"
    & git add -- $paths
    if ($LASTEXITCODE -ne 0) {
        throw "git add failed."
    }

    git diff --cached --quiet
    if ($LASTEXITCODE -eq 0) {
        Write-Log "No staged changes after exclusions." "INFO"
        return $false
    }

    git commit -m $message
    if ($LASTEXITCODE -ne 0) {
        throw "git commit failed."
    }

    $runtimeStash = $null
    try {
        $runtimeStash = Suspend-ExcludedChanges

        $pullExit = Invoke-GitRebasePull
        if ($pullExit -ne 0) {
            throw "git pull --rebase failed."
        }

        git push origin main
        if ($LASTEXITCODE -ne 0) {
            throw "git push failed."
        }
    } finally {
        Restore-ExcludedChanges $runtimeStash
    }

    Start-Sleep -Seconds $SyncCooldown
    return $true
}

function Build-PlanPrompt {
    return @"
[STRATEGIC PLANNER]
Current Date: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
Workspace: $($global:WORKSPACE_ROOT)
Goal: Plan 3-5 sub-tasks for '## 总任务' based on current repo state.
Mandatory Action:
1. Audit docs/, src/, sidebars.ts, and current TASKS.md.
2. Prefer high-value, concrete tasks that can be completed in one pass.
3. Append tasks to $TasksFile as '- [ ] Task (YYYY-MM-DD)'.
Requirements:
- Do not run Git commands.
- Avoid duplicate tasks.
- Keep task wording specific and directly executable.
"@
}

function Build-ExecPrompt($taskDesc) {
    return @"
[EXECUTOR]
Task: $taskDesc
Workspace: $($global:WORKSPACE_ROOT)
Context: SolKnow knowledge base and automation workflow.
Instruction:
1. Inspect the relevant docs and project files before editing.
2. Implement the task completely with production-quality changes.
3. Update $TasksFile by moving the completed task to '## 已完成任务' and mark it as '- [x]'.
4. Do not run Git commands.
5. Keep changes scoped to the task.
"@
}

function Invoke-CodexSmart($prompt, [string[]]$models, $modeLabel) {
    foreach ($model in $models) {
        try {
            $displayModel = if ([string]::IsNullOrWhiteSpace($model)) { "<default>" } else { $model }
            Write-Log "Attempting pulse with Codex [$displayModel] for $modeLabel..." "INFO"

            if (Test-Path $CodexOutputFile) {
                Remove-Item $CodexOutputFile -Force -ErrorAction SilentlyContinue
            }

            $args = @(
                "exec",
                "--dangerously-bypass-approvals-and-sandbox",
                "--cd", ".",
                "--output-last-message", $CodexOutputFile,
                "--skip-git-repo-check",
                "--color", "never",
                "--add-dir", "."
            )

            if (-not [string]::IsNullOrWhiteSpace($model)) {
                $args += @("--model", $model)
            }

            $args += $prompt

            & $global:CODEX_LAUNCHER @args
            $exitCode = $LASTEXITCODE

            if ($exitCode -eq 0) {
                if (Test-Path $CodexOutputFile) {
                    $lastMessage = Get-Content -Path $CodexOutputFile -Raw -ErrorAction SilentlyContinue
                    if (-not [string]::IsNullOrWhiteSpace($lastMessage)) {
                        Write-Log "Codex summary: $($lastMessage.Trim())" "INFO"
                    }
                }
                Write-Log "Codex execution completed successfully with model [$displayModel]" "SUCCESS"
                return $true
            }

            Write-Log "Codex call failed with exit code $exitCode on model [$displayModel]" "ERROR"
        } catch {
            Write-Log "Codex error on model [$displayModel]: $($_.Exception.Message)" "ERROR"
        }
    }

    Write-Log "All Codex model attempts failed for $modeLabel. Cooling down for 5 minutes..." "ERROR"
    Start-Sleep -Seconds 300
    return $false
}

function Assert-TaskIntegrity($expectedTask) {
    $content = Get-TasksRaw
    if ($content -match '\[\/\]') {
        Write-Log "Integrity FAILED for: $expectedTask. Reverting lock marker." "ERROR"
        $updated = [regex]::Replace($content, '(?m)^\s*\[\/\]\s+(.*?)\s+\((正在执行\.\.\.|姝ｅ湪鎵ц\.\.\.)\)\s*$', '- [ ] $1')
        Replace-FileContent -path $TasksFile -content $updated
        $null = Invoke-Sync "revert: failure"
        return $false
    }
    return $true
}

function Assert-Environment {
    Ensure-Command "git"
    Ensure-Command "npm"
    Ensure-Command $global:CODEX_LAUNCHER
    Ensure-Command "gh"

    if (-not (Test-GitAvailable)) {
        throw "Current directory is not inside a git repository."
    }

    if (-not (Test-Path $TasksFile)) {
        throw "Missing tasks file: $TasksFile"
    }
}

function Run-PlanningCycle {
    $nextTask = Get-NextPendingTask
    if ($null -ne $nextTask) {
        return
    }

    Write-Log "No pending tasks. Running deep audit..." "PLAN"
    $planned = Invoke-CodexSmart -prompt (Build-PlanPrompt) -models $MODEL_CANDIDATES_PRIMARY -modeLabel "planning"
    if ($planned) {
        $null = Invoke-Sync "plan: strategic expansion via Codex"
    }
}

function Run-ExecutionCycle {
    while ($true) {
        $taskDesc = Get-NextPendingTask
        if ([string]::IsNullOrWhiteSpace($taskDesc)) {
            Write-Log "Batch queue cleared." "SUCCESS"
            break
        }

        Write-Log "Target Locked: $taskDesc" "EXEC"
        Lock-Task $taskDesc
        $null = Invoke-Sync "lock: $taskDesc"

        $executed = Invoke-CodexSmart -prompt (Build-ExecPrompt $taskDesc) -models $MODEL_CANDIDATES_EXECUTOR -modeLabel "execution"
        if (-not $executed) {
            Assert-TaskIntegrity $taskDesc *> $null
            break
        }

        if (Assert-TaskIntegrity $taskDesc) {
            Write-Log "Mission Accomplished: $taskDesc" "SUCCESS"
            $null = Invoke-Sync "feat: completed $taskDesc via Codex"
        } else {
            break
        }
    }
}

try {
    Ensure-LogFile
    Assert-Environment
    Restore-LatestCodexRuntimeStash
    Acquire-Lock
    Write-Log "Codex Engine V6.0 Initialized." "SUCCESS"
    Unlock-StuckTasks

    while ($true) {
        try {
            Show-Logo
            Check-CloudStatus
            Write-Host ">>> Initializing pulse sync..." -ForegroundColor Gray

            Invoke-InitialPullSafely *> $null

            Run-PlanningCycle
            Run-ExecutionCycle
        } catch {
            Write-Log "Critical Fault: $($_.Exception.Message)" "ERROR"
            Start-Sleep -Seconds 60
        }

        for ($i = $CheckInterval; $i -gt 0; $i--) {
            Clear-Host
            Write-Host ">>> CODEX-FLOW STANDBY | HEARTBEAT: $i s | MODE: PLAN -> EXECUTE -> SYNC" -ForegroundColor DarkGray
            Start-Sleep -Seconds 1
        }
    }
} finally {
    Release-Lock
}
