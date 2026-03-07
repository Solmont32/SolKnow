# SolKnow Autonomous Pulse Runner (V4.8 - LOGIC ROBUSTNESS)
# Usage: pwsh -ExecutionPolicy Bypass -File infinite_runner.ps1

if ($IsWindows) { chcp 65001 | Out-Null }
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$CHECK_INTERVAL = 60 
$SYNC_COOLDOWN = 10 
$LOG_FILE = "AUTOMATION_LOG.md"
$TASKS_FILE = "TASKS.md"

function Invoke-Sync($message) {
    $status = git status --porcelain
    if ($status) {
        Write-Host ">>> [SYNC] $message" -ForegroundColor Green
        git add .
        git commit -m $message
        git push origin main
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

      [ STRATEGIC ENGINE V4.8 - ROBUST ]
      ________________________________________________________________________________________________________

       ####   ####  #      #  # #  #  ####  #      #       #  #  #      #  ####  #   #
      #      #    # #      # #  # #  #    # #  #   #       #  #  # #    # #    # #   #
       ####  #    # #      ##   # #  #    # # # #  #       #  #  #  #  #  #    # # # #
           # #    # #      # #  # #  #    # ##   ##        #  #  #   # #  #    # # # #
       ####   ####  ###### #  # # #   ####  #     #        ####  #    #   ####   # # 

                                     S O L K N O W   I N D U S T R I A L
      ________________________________________________________________________________________________________
"@ -ForegroundColor $randomColor
}

function Show-Resting {
    param([int]$seconds)
    for ($i = $seconds; $i -gt 0; $i--) {
        Clear-Host
        Write-Host ">>> NEXT HEARTBEAT: $i SECONDS..." -ForegroundColor DarkGray
        Start-Sleep -Seconds 1
    }
}

function Write-Log($message, $type="INFO", $toFile=$true) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $tag = "[INFO]"
    if ($type -eq "SUCCESS") { $tag = "[OK]" }
    if ($type -eq "ERROR") { $tag = "[ERR]" }
    if ($type -eq "PLAN") { $tag = "[PLAN]" }
    if ($type -eq "EXEC") { $tag = "[EXE]" }
    $logEntry = "[$timestamp] $tag $message"
    Write-Host $logEntry
    if ($toFile) { Add-Content -Path $LOG_FILE -Value $logEntry }
}

if (-not (Test-Path $LOG_FILE)) { Add-Content -Path $LOG_FILE -Value "# SolKnow Logs`n" }

Write-Log "Robust Engine V4.8 Started." "SUCCESS"

while($true) {
    try {
        Show-Logo
        Write-Host ">>> Syncing..." -ForegroundColor Gray
        Invoke-Sync "chore: workspace self-heal"
        git pull origin main --rebase

        # 1. STRATEGIC PLANNING
        $content = Get-Content $TASKS_FILE -Raw
        # 更加鲁棒的检测：如果内容中不包含任何未勾选的任务框
        if ($content -notmatch '- \[ \]') {
            Write-Log "No active tasks found in TASKS.md. Triggering Planner..." "PLAN"
            $planPrompt = @"
Target: $TASKS_FILE
Vision: Math Analysis Integrated System.
Instructions:
1. Audit current content in 'docs/'.
2. Plan 3-5 sub-tasks for Math Analysis depth expansion.
3. Append them under '## 待办子任务' exactly as '- [ ] Task (YYYY-MM-DD)'.
NO Git commands.
"@
            & gemini -y -p $planPrompt
            Invoke-Sync "plan: injecting analytical tasks"
        }

        # 2. SEQUENTIAL EXECUTION
        while ($true) {
            $content = Get-Content $TASKS_FILE -Raw
            # 改进正则：允许前置空格，确保匹配成功
            if ($content -match '(?m)^\s*- \[ \] (.*)') {
                $taskDesc = $matches[1].Trim()
                Write-Log "Locked: $taskDesc" "EXEC"

                # 锁定任务状态 (支持前置空格)
                $newContent = $content -replace "- \[ \] $([regex]::Escape($taskDesc))", "[/] $taskDesc (Processing...)"
                Set-Content $TASKS_FILE $newContent
                Invoke-Sync "lock: $taskDesc"

                $execPrompt = @"
Task: $taskDesc
Rule: Textbook content + 1-2 Examples + Exercises.
Action: 
1. Create/Edit documentation.
2. PHYSICALLY MOVE the task line to '## 已完成任务' and change to '- [x]'.
CRITICAL: If task is not moved, mission REVERTS. NO Git commands.
"@
                & gemini -y -p $execPrompt

                git pull origin main --rebase
                $postCheck = Get-Content $TASKS_FILE -Raw
                if ($postCheck -match '\[\/\]') {
                    Write-Log "Status check failed for: $taskDesc. Reverting..." "ERROR"
                    $revertContent = $postCheck -replace '\[\/\] .* \(Processing...\)', "[ ] $taskDesc"
                    Set-Content $TASKS_FILE $revertContent
                    Invoke-Sync "revert: task status error"
                    break
                } else {
                    Write-Log "Mission success: $taskDesc" "SUCCESS"
                    Invoke-Sync "feat: $taskDesc"
                }
            } else {
                Write-Log "All tasks in queue completed." "SUCCESS"
                break
            }
        }
    } catch {
        Write-Log "Fault: $($_.Exception.Message)" "ERROR"
    }
    Show-Resting $CHECK_INTERVAL
}
