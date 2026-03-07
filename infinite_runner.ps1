# SolKnow Autonomous Pulse Runner (V5.0 - OMNI-FLOW)
# Usage: pwsh -ExecutionPolicy Bypass -File infinite_runner.ps1

if ($IsWindows) { chcp 65001 | Out-Null }
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$CHECK_INTERVAL = 60 
$SYNC_COOLDOWN = 10 
$LOG_FILE = "AUTOMATION_LOG.md"
$TASKS_FILE = "TASKS.md"
$LAST_CHECKED_RUN_ID = ""

function Check-CloudStatus {
    try {
        $lastRunJson = gh run list --workflow "Deploy to GitHub Pages" --limit 1 --json databaseId,status,conclusion,displayTitle
        $lastRun = $lastRunJson | ConvertFrom-Json
        if ($lastRun -and $lastRun[0].databaseId -ne $global:LAST_CHECKED_RUN_ID) {
            $status = $lastRun[0].status
            $conclusion = $lastRun[0].conclusion
            $title = $lastRun[0].displayTitle
            
            if ($status -eq "completed") {
                if ($conclusion -eq "success") {
                    Write-Log "Cloud Deployment VERIFIED: $title" "SUCCESS"
                } else {
                    Write-Log "Cloud Deployment ALERT: $title FAILED on cloud!" "ERROR"
                }
                $global:LAST_CHECKED_RUN_ID = $lastRun[0].databaseId
            }
        }
    } catch {
        # 允许静默失败，避免影响主逻辑
    }
}

function Invoke-Sync($message) {
    $status = git status --porcelain
    if ($status) {
        # --- 本地预判：类型检查 ---
        Write-Log "Pre-flight: Running local type-check..." "INFO"
        npm run typecheck > $null 2>&1
        if ($LASTEXITCODE -ne 0) {
            Write-Log "Pre-flight FAILED: Type errors detected. Sync aborted." "ERROR"
            return $false
        }

        Write-Log ">>> [SYNC] Changes detected. Aligning with cloud..." "EXEC"
        git add .
        git commit -m $message
        git pull origin main --rebase
        git push origin main
        Write-Log "Push completed. Cloud status will be verified in background." "SUCCESS"
        
        Start-Sleep -Seconds $SYNC_COOLDOWN
        return $true
    }
    return $false
}

function Show-Logo {
    $colors = @("Cyan", "Blue", "White")
    $randomColor = $colors[(Get-Random -Maximum $colors.Count)]
    Clear-Host
    Write-Host @"

      [ SOLKNOW OMNI-FLOW V5.0 ]
      ________________________________________________________________________________________________________

       ####   ####  #      #  # #  #  ####  #      #       #  #  #      #  ####  #   #
      #      #    # #      # #  # #  #    # #  #   #       #  #  # #    # #    # #   #
       ####  #    # #      ##   # #  #    # # # #  #       #  #  #  #  #  #    # # # #
           # #    # #      # #  # #  #    # ##   ##        #  #  #   # #  #    # # # #
       ####   ####  ###### #  # # #   ####  #     #        ####  #    #   ####   # # 

                                     S T R A T E G I C   A U T O N O M Y
      ________________________________________________________________________________________________________
"@ -ForegroundColor $randomColor
}

function Write-Log($message, $type="INFO", $toFile=$true) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $tag = "[INFO]"
    if ($type -eq "SUCCESS") { $tag = "[ OK ]" }
    if ($type -eq "ERROR") { $tag = "[ERR ]" }
    if ($type -eq "PLAN") { $tag = "[PLAN]" }
    if ($type -eq "EXEC") { $tag = "[EXE ]" }
    $logEntry = "[$timestamp] $tag $message"
    Write-Host $logEntry
    if ($toFile) { Add-Content -Path $LOG_FILE -Value $logEntry }
}

# --- 启动自愈：修复卡住的 Processing 状态 ---
function Startup-Heal {
    if (Test-Path $TASKS_FILE) {
        $content = Get-Content $TASKS_FILE -Raw
        if ($content -match '\[\/\] (.*) \(正在执行...\)') {
            Write-Log "Startup: Detected stuck task. Reverting to pending state..." "ERROR"
            $healed = $content -replace '\[\/\] (.*) \(正在执行...\)', '[ ] $1'
            Set-Content $TASKS_FILE $healed
            Invoke-Sync "chore: startup self-heal - recovered stuck task"
        }
    }
}

if (-not (Test-Path $LOG_FILE)) { Add-Content -Path $LOG_FILE -Value "# SolKnow Audit Logs`n" }

Write-Log "Omni-Flow Engine V5.0 Initialized." "SUCCESS"
Startup-Heal

while($true) {
    try {
        Show-Logo
        Check-CloudStatus
        Write-Host ">>> Initializing pulse sync..." -ForegroundColor Gray
        git pull origin main --rebase

        # 1. STRATEGIC AUDIT & PLANNING
        $content = Get-Content $TASKS_FILE -Raw
        if ($content -notmatch '- \[ \]') {
            Write-Log "No pending tasks. Initiating audit-first planning..." "PLAN"
            $planPrompt = @"
Current Date: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
Goal: Plan 3-5 sub-tasks for '## 总任务' in $TASKS_FILE.
Mandatory Action:
1. Audit 'docs/academic-math/analysis/' and 'sidebars.ts'.
2. Plan granular, textbook-quality chapters (Theory + Examples + Exercises).
3. Append under '## 待办子任务' header as '- [ ] Task (YYYY-MM-DD)'.
Requirement: Do NOT use Git. Be precise.
"@
            & gemini -y -p $planPrompt
            Invoke-Sync "plan: strategic roadmap expansion"
        }

        # 2. SEQUENTIAL EXECUTION
        while ($true) {
            $content = Get-Content $TASKS_FILE -Raw
            if ($content -match '(?m)^\s*- \[ \] (.*)') {
                $taskDesc = $matches[1].Trim()
                Write-Log "Target Locked: $taskDesc" "EXEC"

                # 锁定任务状态
                $lockedContent = $content -replace "- \[ \] $([regex]::Escape($taskDesc))", "[/] $taskDesc (正在执行...)"
                Set-Content $TASKS_FILE $lockedContent
                Invoke-Sync "lock: $taskDesc"

                $execPrompt = @"
Current Date: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
Task: $taskDesc
Context: Math Analysis Integrated Zero-Foundation System.
Instruction: 
1. Research existing files to maintain continuity.
2. Implement content, examples, and exercise additions.
3. MOVE the task line from '## 待办子任务' to the TOP of '## 已完成任务' and change to '- [x]'.
CRITICAL: NO Git commands. Status update must be perfect.
"@
                & gemini -y -p $execPrompt

                git pull origin main --rebase
                $postCheck = Get-Content $TASKS_FILE -Raw
                if ($postCheck -match '\[\/\]') {
                    Write-Log "Integrity check FAILED for: $taskDesc. Reverting." "ERROR"
                    $revertContent = $postCheck -replace '\[\/\] .* \(正在执行...\)', "[ ] $taskDesc"
                    Set-Content $TASKS_FILE $revertContent
                    Invoke-Sync "revert: failed mission status"
                    break
                } else {
                    Write-Log "Mission Accomplished: $taskDesc" "SUCCESS"
                    Invoke-Sync "feat: completed $taskDesc"
                }
            } else {
                Write-Log "Batch queue cleared." "SUCCESS"
                break
            }
        }
    } catch {
        Write-Log "Critical Fault: $($_.Exception.Message)" "ERROR"
    }
    
    # 动态休眠 UI
    for ($i = $CHECK_INTERVAL; $i -gt 0; $i--) {
        Clear-Host
        Write-Host ">>> OMNI-FLOW STANDBY | NEXT HEARTBEAT: $i SECONDS..." -ForegroundColor DarkGray
        Start-Sleep -Seconds 1
    }
}
