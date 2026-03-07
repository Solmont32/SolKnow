# SolKnow Autonomous Pulse Runner (V4.7 - SEQUENTIAL PERFECTIONIST)
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

      [ STRATEGIC SEQUENCER V4.7 ]
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
        Write-Host ">>> NEXT CYCLE: $i SECONDS..." -ForegroundColor DarkGray
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

if (-not (Test-Path $LOG_FILE)) { Add-Content -Path $LOG_FILE -Value "# SolKnow Audit Logs`n" }

Write-Log "System V4.7 (Sequential) Started." "SUCCESS"

while($true) {
    try {
        Show-Logo
        Write-Host ">>> Syncing..." -ForegroundColor Gray
        Invoke-Sync "chore: pre-heartbeat self-heal"
        git pull origin main --rebase

        # 1. STRATEGIC PLANNING
        $content = Get-Content $TASKS_FILE -Raw
        if ($content -notlike "*- [ ] *") {
            Write-Log "No tasks. Auditing project state..." "PLAN"
            $planPrompt = @"
Target: $TASKS_FILE
Vision: Math Analysis Integrated System.
Instructions:
1. Audit 'docs/' and 'sidebars.ts'.
2. Plan 3-5 sub-tasks to expand Math Analysis (Textbook Style).
3. Append under '## 待办子任务' as '- [ ] Task (YYYY-MM-DD)'.
NO Git commands.
"@
            & gemini -y -p $planPrompt
            Invoke-Sync "plan: new roadmap batch"
        }

        # 2. SEQUENTIAL EXECUTION
        while ($true) {
            # 关键：每一轮循环都重新读取文件，确保状态最新
            $content = Get-Content $TASKS_FILE -Raw
            if ($content -match '^- \[ \] (.*)') {
                $taskDesc = $matches[1].Trim()
                Write-Log "Current Target: $taskDesc" "EXEC"

                # 锁定任务
                $newContent = $content -replace "\[ \] $([regex]::Escape($taskDesc))", "[/] $taskDesc (Processing...)"
                Set-Content $TASKS_FILE $newContent
                Invoke-Sync "lock: $taskDesc"

                $execPrompt = @"
Task: $taskDesc
Objective: Textbook content + Examples + Exercises.
Action: 
1. Perform content creation.
2. MARK AS DONE: Move the task line from '## 待办子任务' to '## 已完成任务' and change it to '- [x]'.
CRITICAL: If you finish the work but fail to MOVE the task to the completed list, the mission will be reverted.
NO Git commands.
"@
                & gemini -y -p $execPrompt

                # 验证搬运结果
                git pull origin main --rebase
                $postCheck = Get-Content $TASKS_FILE -Raw
                if ($postCheck -like "*[/] $taskDesc*") {
                    Write-Log "Status update failed for: $taskDesc. Reverting..." "ERROR"
                    $revertContent = $postCheck -replace "\[\/\] $([regex]::Escape($taskDesc)) \(Processing...\)", "[ ] $taskDesc"
                    Set-Content $TASKS_FILE $revertContent
                    Invoke-Sync "revert: $taskDesc (status error)"
                    break # 发生错误，跳出本轮执行等待下次心跳
                } else {
                    Write-Log "Task completed and moved: $taskDesc" "SUCCESS"
                    Invoke-Sync "feat: $taskDesc"
                }
            } else {
                # 没有更多待办任务，退出执行循环
                break
            }
        }
    } catch {
        Write-Log "System Error: $($_.Exception.Message)" "ERROR"
    }
    Show-Resting $CHECK_INTERVAL
}
