# SolKnow Autonomous Pulse Runner (V6.0 - CODEX EDITION)
# Usage: powershell -ExecutionPolicy Bypass -File infinite_runner_codex.ps1

param(
    [int]$CheckInterval = 60,
    [int]$SyncCooldown = 10,
    [string]$LogFile = "AUTOMATION_LOG.md",
    [string]$TasksFile = "TASKS.md",
    [string]$LockFile = ".codex_runner.lock",
    [string]$CodexOutputFile = ".codex_last_message.txt",
    [switch]$SkipTypecheck,
    [int]$TypecheckTimeoutSeconds = 180
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
        $written = $false
        for ($attempt = 1; $attempt -le 5; $attempt++) {
            try {
                Add-Content -Path $LogFile -Value $logEntry -Encoding UTF8
                $written = $true
                break
            } catch {
                Start-Sleep -Milliseconds (120 * $attempt)
            }
        }

        if (-not $written) {
            [Console]::Error.WriteLine("[$timestamp] [WARN] Log write skipped due to file lock: $LogFile")
        }
    }
}

function Clear-HostSafe {
    try {
        if ($Host -and $Host.UI -and $Host.UI.RawUI) {
            Clear-Host
        }
    } catch {
        # Ignore non-interactive host clear failures.
    }
}

function Ensure-LogFile {
    if (-not (Test-Path $LogFile)) {
        $ok = $false
        for ($attempt = 1; $attempt -le 3; $attempt++) {
            try {
                Add-Content -Path $LogFile -Value "# SolKnow Audit Logs`n" -Encoding UTF8
                $ok = $true
                break
            } catch {
                Start-Sleep -Milliseconds (100 * $attempt)
            }
        }
        if (-not $ok) {
            [Console]::Error.WriteLine("[WARN] Unable to initialize log file (locked): $LogFile")
        }
    }
}

function Repair-LogConflictArtifacts {
    if (-not (Test-Path $LogFile)) {
        return
    }

    try {
        $lines = Get-Content -Path $LogFile
        $filtered = @($lines | Where-Object { $_ -notmatch '^(<<<<<<< .+|=======|>>>>>>> .+)$' })
        if ($filtered.Count -ne $lines.Count) {
            Set-Content -Path $LogFile -Value $filtered -Encoding UTF8
            Write-Log "Startup: removed merge-marker artifacts from automation log." "WARN"
        }
    } catch {
        Write-Log "Startup: unable to sanitize automation log: $($_.Exception.Message)" "WARN" $false
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

function Remove-StaleGitIndexLock {
    $indexLock = ".git\index.lock"
    if (-not (Test-Path $indexLock)) {
        return $false
    }

    try {
        $item = Get-Item $indexLock -ErrorAction Stop
        $ageSeconds = ((Get-Date) - $item.LastWriteTime).TotalSeconds

        if ($ageSeconds -ge 20) {
            Remove-Item $indexLock -Force -ErrorAction Stop
            Write-Log "Removed stale git index lock: $indexLock" "WARN"
            return $true
        }

        Write-Log "git index lock exists and appears active: $indexLock" "WARN"
        return $false
    } catch {
        Write-Log "Failed to process git index lock: $($_.Exception.Message)" "WARN"
        return $false
    }
}

function Invoke-GitCommandWithRetry {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Command,
        [Parameter(Mandatory = $true)]
        [string]$Label,
        [int]$MaxAttempts = 3
    )

    for ($attempt = 1; $attempt -le $MaxAttempts; $attempt++) {
        $output = cmd /c "$Command 2>&1"
        $exitCode = $LASTEXITCODE
        $outputText = (@($output) -join "`n")

        if ($exitCode -eq 0) {
            return [PSCustomObject]@{
                ExitCode = 0
                Output = @($output)
            }
        }

        $hitIndexIssue = ($outputText -match '(?i)could not write index|index\.lock|unable to create.*index\.lock')
        if ($hitIndexIssue -and $attempt -lt $MaxAttempts) {
            Write-Log "$Label failed due to index lock/write issue (attempt $attempt/$MaxAttempts). Retrying..." "WARN"
            $null = Remove-StaleGitIndexLock
            Start-Sleep -Seconds 2
            continue
        }

        return [PSCustomObject]@{
            ExitCode = $exitCode
            Output = @($output)
        }
    }

    return [PSCustomObject]@{
        ExitCode = 1
        Output = @("$Label failed unexpectedly.")
    }
}

function Get-UnmergedPaths {
    $unmerged = @(git ls-files -u)
    if ($LASTEXITCODE -ne 0 -or -not $unmerged) {
        return @()
    }

    $paths = @()
    foreach ($line in $unmerged) {
        $parts = $line -split '\s+'
        if ($parts.Length -ge 4) {
            $paths += $parts[3]
        }
    }
    return $paths | Select-Object -Unique
}

function Resolve-ExcludedUnmergedPaths {
    $unmergedPaths = Get-UnmergedPaths
    if (-not $unmergedPaths -or $unmergedPaths.Count -eq 0) {
        return $true
    }

    $nonExcluded = @($unmergedPaths | Where-Object { $global:EXCLUDED_SYNC_PATHS -notcontains $_ })
    if ($nonExcluded.Count -gt 0) {
        Write-Log "Detected non-runtime merge conflicts: $($nonExcluded -join ', ')" "ERROR"
        return $false
    }

    foreach ($path in $unmergedPaths) {
        Write-Log "Auto-resolving runtime conflict for $path (prefer local runner copy)." "WARN"
        cmd /c "git checkout --theirs -- `"$path`" 1>nul 2>nul"
        if ($LASTEXITCODE -ne 0) {
            cmd /c "git checkout --ours -- `"$path`" 1>nul 2>nul"
        }
        & git add -- $path *> $null
        & git reset -- $path *> $null
    }

    $remaining = Get-UnmergedPaths
    if ($remaining.Count -gt 0) {
        Write-Log "Runtime conflict auto-resolve incomplete: $($remaining -join ', ')" "ERROR"
        return $false
    }

    Write-Log "Runtime merge conflicts resolved automatically." "INFO"
    return $true
}

function Ensure-GitHealth {
    $null = Remove-StaleGitIndexLock
    return (Resolve-ExcludedUnmergedPaths)
}

function Invoke-GitRebasePull {
    $pullResult = Invoke-GitCommandWithRetry -Command "git pull origin main --rebase" -Label "git pull --rebase"
    $pullOutput = $pullResult.Output
    $pullExit = $pullResult.ExitCode

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
    function Test-IsActiveRunnerProcess([int]$procId) {
        if (-not $procId) {
            return $false
        }

        $proc = Get-CimInstance Win32_Process -Filter "ProcessId=$procId" -ErrorAction SilentlyContinue
        if (-not $proc) {
            return $false
        }

        $cmd = [string]$proc.CommandLine
        if ([string]::IsNullOrWhiteSpace($cmd)) {
            return $false
        }

        return ($cmd -match 'infinite_runner_codex\.ps1')
    }

    if (Test-Path $LockFile) {
        $existing = Get-Content -Path $LockFile -ErrorAction SilentlyContinue
        $pidLine = $existing | Where-Object { $_ -match '^pid=\d+$' } | Select-Object -First 1
        $cwdLine = $existing | Where-Object { $_ -match '^cwd=' } | Select-Object -First 1
        $existingPid = $null
        $existingCwd = $null

        if ($pidLine) {
            $existingPid = [int]($pidLine -replace '^pid=', '')
        }
        if ($cwdLine) {
            $existingCwd = ($cwdLine -replace '^cwd=', '').Trim()
        }

        $lockIsActive = Test-IsActiveRunnerProcess $existingPid

        if ($lockIsActive) {
            throw "Runner lock already exists: $LockFile | pid=$existingPid cwd=$existingCwd"
        }

        if ($existingPid) {
            Write-Log "Detected stale/non-runner lock (pid=$existingPid). Reclaiming $LockFile." "WARN"
        } else {
            Write-Log "Detected malformed runner lock. Reclaiming $LockFile." "WARN"
        }
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
    Clear-HostSafe
    Write-Host @"
      [ SOLKNOW OMNI-FLOW V6.0 - CODEX EDITION ]
      ________________________________________________________________________________________________________
      S T R A T E G I C   A U T O N O M Y
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
    $updated = [regex]::Replace($content, '(?m)^\s*\[\/\]\s+(.*?)\s+\(正在执行\.\.\.\)\s*$', '- [ ] $1')
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

function Suspend-WorkspaceChanges {
    $stashName = "codex-runner-workspace-$(Get-Date -Format 'yyyyMMddHHmmss')"
    $statusBefore = @(git status --porcelain)
    if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace(($statusBefore -join "").Trim())) {
        return $null
    }

    $beforeRefs = @(git stash list --format="%gd")
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to inspect stash state before suspending workspace changes."
    }

    & git stash push --include-untracked -m $stashName *> $null
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to stash workspace changes."
    }

    $afterRefs = @(git stash list --format="%gd")
    if ($LASTEXITCODE -ne 0 -or -not $afterRefs -or $afterRefs.Count -eq 0) {
        throw "Unable to verify temporary workspace stash."
    }

    foreach ($ref in $afterRefs) {
        if ($beforeRefs -notcontains $ref) {
            return $ref
        }
    }

    throw "Unable to verify temporary workspace stash."
}

function Restore-WorkspaceChanges($stashRef) {
    if ([string]::IsNullOrWhiteSpace($stashRef)) {
        return
    }

    cmd /c "git stash pop $stashRef 1>nul 2>nul"
    if ($LASTEXITCODE -ne 0) {
        Write-Log "Failed to restore temporary workspace stash: $stashRef (kept for manual recovery)." "WARN"
        return
    }

    Write-Log "Restored temporary workspace stash: $stashRef" "INFO"
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

function Restore-LatestCodexWorkspaceStash {
    $entries = @(git stash list)
    if ($LASTEXITCODE -ne 0 -or -not $entries) {
        return
    }

    $targetEntry = $entries | Where-Object { $_ -match 'codex-runner-workspace-' } | Select-Object -First 1
    if (-not $targetEntry) {
        return
    }

    $stashRef = ($targetEntry -split ':', 2)[0].Trim()
    if (-not [string]::IsNullOrWhiteSpace($stashRef)) {
        Restore-WorkspaceChanges $stashRef
    }
}

function Invoke-InitialPullSafely {
    if (-not (Ensure-GitHealth)) {
        Write-Log "Initial sync skipped: unresolved non-runtime conflicts detected." "WARN"
        return $false
    }

    if (Test-HasSyncableChanges) {
        Write-Log "Initial sync skipped: workspace has local syncable changes." "WARN"
        return $false
    }

    $runtimeStash = $null
    $workspaceStash = $null
    try {
        $runtimeStash = Suspend-ExcludedChanges
        $workspaceStash = Suspend-WorkspaceChanges

        $pullExit = Invoke-GitRebasePull
        if ($pullExit -ne 0) {
            throw "Initial git pull --rebase failed."
        }

        return $true
    } finally {
        Restore-WorkspaceChanges $workspaceStash
        Restore-ExcludedChanges $runtimeStash
    }
}

function Invoke-Sync($message) {
    if (-not (Ensure-GitHealth)) {
        Write-Log "Sync aborted: unresolved non-runtime conflicts detected." "ERROR"
        return $false
    }

    $paths = Get-ChangedPaths
    if (-not $paths -or $paths.Count -eq 0) {
        Write-Log "No syncable changes detected." "INFO"
        return $false
    }

    if ($SkipTypecheck) {
        Write-Log "Pre-flight: type-check skipped by flag (--SkipTypecheck)." "WARN"
    } else {
        Write-Log "Pre-flight: Running local type-check..." "INFO"

        $stamp = Get-Date -Format "yyyyMMddHHmmssfff"
        $tmpOut = Join-Path $env:TEMP "solknow_typecheck_${PID}_${stamp}.out.log"
        $tmpErr = Join-Path $env:TEMP "solknow_typecheck_${PID}_${stamp}.err.log"

        try {
            $proc = Start-Process -FilePath "cmd.exe" -ArgumentList "/c", "npm run typecheck" -NoNewWindow -PassThru -RedirectStandardOutput $tmpOut -RedirectStandardError $tmpErr
            $finished = $proc.WaitForExit($TypecheckTimeoutSeconds * 1000)

            if (-not $finished) {
                Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
                Write-Log "Pre-flight WARN: type-check timed out after ${TypecheckTimeoutSeconds}s. Continue sync." "WARN"
            } elseif ($proc.ExitCode -ne 0) {
                $preview = @()
                if (Test-Path $tmpOut) { $preview += @(Get-Content -Path $tmpOut -ErrorAction SilentlyContinue | Select-Object -Last 3) }
                if (Test-Path $tmpErr) { $preview += @(Get-Content -Path $tmpErr -ErrorAction SilentlyContinue | Select-Object -Last 3) }
                $preview = $preview | Where-Object { -not [string]::IsNullOrWhiteSpace($_) } | Select-Object -First 3

                if ($preview.Count -gt 0) {
                    Write-Log "Pre-flight detail: $($preview -join ' | ')" "ERROR"
                }
                Write-Log "Pre-flight FAILED: type-check errors detected. Sync aborted." "ERROR"
                return $false
            }
        } finally {
            Remove-Item $tmpOut -Force -ErrorAction SilentlyContinue
            Remove-Item $tmpErr -Force -ErrorAction SilentlyContinue
        }
    }

    Write-Log ">>> [SYNC] Aligning changes with cloud..." "EXEC"
    $addResult = Invoke-GitCommandWithRetry -Command ("git add -- " + (($paths | ForEach-Object { '"' + $_ + '"' }) -join " ")) -Label "git add"
    if ($addResult.ExitCode -ne 0) {
        throw "git add failed."
    }

    git diff --cached --quiet
    if ($LASTEXITCODE -eq 0) {
        Write-Log "No staged changes after exclusions." "INFO"
        return $false
    }

    $safeMessage = $message.Replace('"', '\"')
    $commitResult = Invoke-GitCommandWithRetry -Command "git commit -m `"$safeMessage`"" -Label "git commit"
    if ($commitResult.ExitCode -ne 0) {
        throw "git commit failed."
    }

    $runtimeStash = $null
    $workspaceStash = $null
    try {
        $runtimeStash = Suspend-ExcludedChanges
        $workspaceStash = Suspend-WorkspaceChanges

        $pullExit = Invoke-GitRebasePull
        if ($pullExit -ne 0) {
            throw "git pull --rebase failed."
        }

        $pushResult = Invoke-GitCommandWithRetry -Command "git push origin main" -Label "git push"
        if ($pushResult.ExitCode -ne 0) {
            throw "git push failed."
        }
    } finally {
        Restore-WorkspaceChanges $workspaceStash
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

function Get-CodexFailureCooldownSeconds($modeLabel) {
    if ($modeLabel -eq "planning") {
        return 60
    }
    return 300
}

function Get-CodexTimeoutSeconds($modeLabel) {
    if ($modeLabel -eq "planning") {
        return 420
    }
    return 1200
}

function Invoke-CodexProcessWithTimeout(
    [string[]]$CliArgs,
    [int]$timeoutSeconds,
    [int]$heartbeatSeconds = 30,
    [string]$modeLabel = "unknown",
    [string]$displayModel = "<default>"
) {
    $stamp = Get-Date -Format "yyyyMMddHHmmssfff"
    $tmpOut = Join-Path $env:TEMP "codex_runner_${PID}_${stamp}.out.log"
    $tmpErr = Join-Path $env:TEMP "codex_runner_${PID}_${stamp}.err.log"

    $proc = $null
    try {
        $safeArgs = @()
        foreach ($arg in @($CliArgs)) {
            if ($null -eq $arg) {
                continue
            }
            $s = [string]$arg
            if ($s.Length -eq 0) {
                continue
            }
            $safeArgs += $s
        }
        if (-not $safeArgs -or $safeArgs.Count -eq 0) {
            return [PSCustomObject]@{
                ExitCode = 2
                Output = @("Codex invocation failed: empty argument list after sanitization.")
            }
        }

        $proc = Start-Process -FilePath $global:CODEX_LAUNCHER -ArgumentList $safeArgs -NoNewWindow -PassThru -RedirectStandardOutput $tmpOut -RedirectStandardError $tmpErr

        $sw = [System.Diagnostics.Stopwatch]::StartNew()
        $nextBeatSeconds = [Math]::Max(1, $heartbeatSeconds)
        $timedOut = $false

        while ($true) {
            if ($proc.WaitForExit(1000)) {
                break
            }

            $elapsed = [int]$sw.Elapsed.TotalSeconds
            if ($elapsed -ge $nextBeatSeconds) {
                $remaining = [Math]::Max(0, $timeoutSeconds - $elapsed)
                Write-Log "Codex still running... mode=$modeLabel model=$displayModel elapsed=${elapsed}s remaining=${remaining}s" "INFO"
                $nextBeatSeconds += [Math]::Max(1, $heartbeatSeconds)
            }

            if ($elapsed -ge $timeoutSeconds) {
                $timedOut = $true
                break
            }
        }

        $sw.Stop()
        if ($timedOut) {
            try {
                Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
            } catch {}
            return [PSCustomObject]@{
                ExitCode = 124
                Output = @("Codex process timed out after ${timeoutSeconds}s.")
            }
        }

        $all = @()
        if (Test-Path $tmpOut) {
            $all += @(Get-Content -Path $tmpOut -ErrorAction SilentlyContinue)
        }
        if (Test-Path $tmpErr) {
            $all += @(Get-Content -Path $tmpErr -ErrorAction SilentlyContinue)
        }

        return [PSCustomObject]@{
            ExitCode = $proc.ExitCode
            Output = $all
        }
    } finally {
        Remove-Item $tmpOut -Force -ErrorAction SilentlyContinue
        Remove-Item $tmpErr -Force -ErrorAction SilentlyContinue
    }
}

function Invoke-CodexSmart($prompt, $modeLabel) {
    $timeoutSeconds = Get-CodexTimeoutSeconds $modeLabel
    try {
        Write-Log "Attempting pulse with default Codex model for $modeLabel..." "INFO"

        if (Test-Path $CodexOutputFile) {
            Remove-Item $CodexOutputFile -Force -ErrorAction SilentlyContinue
        }

        $cliArgs = @(
            "exec",
            "--dangerously-bypass-approvals-and-sandbox",
            "--cd", ".",
            "--output-last-message", $CodexOutputFile,
            "--skip-git-repo-check",
            "--color", "never",
            "--add-dir", ".",
            $prompt
        )

        $execResult = Invoke-CodexProcessWithTimeout -CliArgs $cliArgs -timeoutSeconds $timeoutSeconds -heartbeatSeconds 30 -modeLabel $modeLabel -displayModel "DEFAULT"
        
        if ($execResult.ExitCode -eq 0) {
            if (Test-Path $CodexOutputFile) {
                $lastMessage = Get-Content -Path $CodexOutputFile -Raw -ErrorAction SilentlyContinue
                if (-not [string]::IsNullOrWhiteSpace($lastMessage)) {
                    Write-Log "Codex summary: $($lastMessage.Trim())" "INFO"
                }
            }
            return $true
        }

        Write-Log "Codex execution failed with exit code $($execResult.ExitCode)" "ERROR"
        return $false
    } catch {
        Write-Log "Codex error: $($_.Exception.Message)" "ERROR"
        return $false
    }
}

function Assert-TaskIntegrity($expectedTask) {
    $content = Get-TasksRaw
    if ($content -match '\[\/\]') {
        Write-Log "Integrity FAILED for: $expectedTask. Reverting lock marker." "ERROR"
        $updated = [regex]::Replace($content, '(?m)^\s*\[\/\]\s+(.*?)\s+\(正在执行\.\.\.\)\s*$', '- [ ] $1')
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
    $planned = Invoke-CodexSmart -prompt (Build-PlanPrompt) -modeLabel "planning"
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

        $executed = Invoke-CodexSmart -prompt (Build-ExecPrompt $taskDesc) -modeLabel "execution"
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
    Repair-LogConflictArtifacts
    Assert-Environment
    Restore-LatestCodexRuntimeStash
    Restore-LatestCodexWorkspaceStash
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
            Clear-HostSafe
            Write-Host ">>> CODEX-FLOW STANDBY | HEARTBEAT: $i s | MODEL: DEFAULT" -ForegroundColor DarkGray
            Start-Sleep -Seconds 1
        }
    }
} finally {
    Release-Lock
}

