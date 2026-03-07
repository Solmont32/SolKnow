# SolKnow Autonomous Pulse Runner (V3.8 - LIGHTWEIGHT STANDARD)
# Usage: pwsh -ExecutionPolicy Bypass -File infinite_runner.ps1

if ($IsWindows) { chcp 65001 | Out-Null }
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$CHECK_INTERVAL = 60 
$LOG_FILE = "AUTOMATION_LOG.md"
$TASKS_FILE = "TASKS.md"

# 内部同步函数：使用标准 Git 指令代替 gcp 别名
function Invoke-Sync($message) {
    Write-Host ">>> [GIT] $message" -ForegroundColor Gray
    git add .
    $status = git status --porcelain
    if ($status) {
        git commit -m $message
        git push origin main
    }
}

function Show-Logo {
    $colors = @("Cyan", "Blue", "White")
    $randomColor = $colors[(Get-Random -Maximum $colors.Count)]
    Clear-Host
    Write-Host @"

      [ STRATEGIC ENGINE V3.8 - LIGHTWEIGHT ]
      ________________________________________________________________________________________________________

       ####   ####  #      #  # #  #  ####  #      #       #  #  #      #  ####  #   #
      #      #    # #      # #  # #  #    # #  #   #       #  #  # #    # #    # #   #
       ####  #    # #      ##   # #  #    # # # #  #       #  #  #  #  #  #    # # # #
           # #    # #      # #  # #  #    # ##   ##        #  #  #   # #  #    # # # #
       ####   ####  ###### #  # # #   ####  #     #        ####  #    #   ####   # # 

                                     S O L K N O W   I N D U S T R I A L
      ________________________________________________________________________________________________________
      
      >>> FOCUS: MATH ANALYSIS & CS INTEGRATION
      >>> SYNC FREQUENCY: 60s
      >>> TIME: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
      ________________________________________________________________________________________________________

"@ -ForegroundColor $randomColor
}

function Show-Resting {
    param([int]$seconds)
    for ($i = $seconds; $i -gt 0; $i--) {
        Clear-Host
        $bar = "[" + ("#" * ($seconds - $i)) + ("." * $i) + "]"
        Write-Host @"

      [ SYSTEM STANDBY ]
      ________________________________________________________________________________________________________

               S  T  A  N  D  B  Y     M  O  D  E     A  C  T  I  V  A  T  E  D

      ________________________________________________________________________________________________________
      
      >>> NEXT HEARTBEAT: $i SECONDS
      >>> $bar
"@ -ForegroundColor DarkGray
        Start-Sleep -Seconds 1
    }
}

function Write-Log($message, $type="INFO") {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $color = "Cyan"; $tag = "[VITAL]"
    if ($type -eq "SUCCESS") { $color = "Green"; $tag = "[STABLE]" }
    if ($type -eq "ERROR") { $color = "Red"; $tag = "[CRITICAL]" }
    if ($type -eq "PLAN") { $color = "Magenta"; $tag = "[STRATEGIST]" }
    if ($type -eq "EXEC") { $color = "Yellow"; $tag = "[EXECUTOR]" }
    
    $logEntry = "[$timestamp] $tag $message"
    Write-Host $logEntry -ForegroundColor $color
    Add-Content -Path $LOG_FILE -Value $logEntry
}

if (-not (Test-Path $LOG_FILE)) { Add-Content -Path $LOG_FILE -Value "# SolKnow Automation Vital Logs`n" }

Write-Log "SolKnow Industrial Core V3.8 Initialized." "SUCCESS"

while($true) {
    try {
        Show-Logo
        Write-Host ">>> Heartbeat started. Syncing..." -ForegroundColor Gray
        Invoke-Sync "chore: scheduled pulse sync"
        git pull origin main --rebase

        # --- 阶段 1：规划代理 (Planning Agent) ---
        $content = Get-Get-Content $TASKS_FILE -Raw
        if ($content -notmatch "(?m)^## 待办子任务\s*(\r?\n- \[ \] .*)+") {
            Write-Log "SUB-TASK QUEUE EMPTY. PLANNING..." "PLAN"
            $planPrompt = @"
Target: $TASKS_FILE
Objective: Read '## 总任务'. Plan 3-5 granular sub-tasks for Math Analysis depth expansion.
Action: Append them under '## 待办子任务' using the format '- [ ] Task (YYYY-MM-DD)'.
Note: Please stage, commit, and push your changes once the planning is done.
"@
            & gemini -y -p $planPrompt
            Write-Log "STRATEGIC PLANNING COMPLETE." "SUCCESS"
            $content = Get-Content $TASKS_FILE -Raw 
        }

        # --- 阶段 2：执行代理 (Execution Agent) ---
        while ($true) {
            $content = Get-Content $TASKS_FILE -Raw
            if ($content -match "(?m)^## 待办子任务[\s\S]*?^- \[ \] (.*)") {
                $taskDesc = $matches[1].Trim()
                Write-Log "LOCKED TARGET: $taskDesc" "EXEC"

                # 锁定并提交
                $processingContent = $content -replace "(?m)^- \[ \] $([regex]::Escape($taskDesc))", "- [/] $taskDesc (Processing...)"
                Set-Content $TASKS_FILE $processingContent
                Invoke-Sync "chore: pulse - processing task: $taskDesc"

                Write-Log "EXECUTING..." "EXEC"
                $execPrompt = @"
Task: $taskDesc
Objective: Textbook quality content + 1-2 examples + exercise pool expansion.
Instruction: 
1. Complete the content in relevant files.
2. Move the task to '## 已完成任务' and mark as [x].
3. Stage, commit, and push all changes.
"@
                & gemini -y -p $execPrompt

                git pull origin main --rebase
                $postCheck = Get-Content $TASKS_FILE -Raw
                if ($postCheck -match "(?m)^- \[\/\] $([regex]::Escape($taskDesc))") {
                    Write-Log "TASK FAILED. REVERTING..." "ERROR"
                    $revertContent = $postCheck -replace "(?m)^- \[\/\] $([regex]::Escape($taskDesc)) \(Processing...\)", "- [ ] $taskDesc"
                    Set-Content $TASKS_FILE $revertContent
                    Invoke-Sync "chore: pulse - task reverted: $taskDesc"
                    break 
                } else {
                    Write-Log "SUCCESS: $taskDesc" "SUCCESS"
                }
            } else {
                break
            }
        }
        
    } catch {
        Write-Log "ENGINE FAULT: $($_.Exception.Message)" "ERROR"
    }
    
    Show-Resting $CHECK_INTERVAL
}
