# SolKnow Autonomous Pulse Runner (V3.7 - STRATEGIC TURBO)
# Usage: pwsh -ExecutionPolicy Bypass -File infinite_runner.ps1

if ($IsWindows) { chcp 65001 | Out-Null }
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$CHECK_INTERVAL = 300 
$LOG_FILE = "AUTOMATION_LOG.md"
$TASKS_FILE = "TASKS.md"

function Invoke-GCP($message) {
    Write-Host ">>> [SYNC] $message" -ForegroundColor Gray
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

      [ STRATEGIC ENGINE V3.7 - TURBO MODE ]
      ________________________________________________________________________________________________________

       ####   ####  #      #  # #  #  ####  #      #       #  #  #      #  ####  #   #
      #      #    # #      # #  # #  #    # #  #   #       #  #  # #    # #    # #   #
       ####  #    # #      ##   # #  #    # # # #  #       #  #  #  #  #  #    # # # #
           # #    # #      # #  # #  #    # ##   ##        #  #  #   # #  #    # # # #
       ####   ####  ###### #  # # #   ####  #     #        ####  #    #   ####   # # 

                                     S O L K N O W   I N D U S T R I A L
      ________________________________________________________________________________________________________
      
      >>> FOCUS: MATH ANALYSIS & CS INTEGRATION
      >>> MODE: BATCH EXECUTION (TURBO)
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

Write-Log "SolKnow Industrial Core V3.7 (Turbo) Initialized." "SUCCESS"

while($true) {
    try {
        Show-Logo
        Write-Host ">>> Heartbeat started. Initializing workspace..." -ForegroundColor Gray
        Invoke-GCP "chore: pre-heartbeat synchronization"
        git pull origin main --rebase

        # --- 阶段 1：战略规划 (Strategic Planning) ---
        $content = Get-Content $TASKS_FILE -Raw
        if ($content -notmatch "(?m)^## 待办子任务\s*(\r?\n- \[ \] .*)+") {
            Write-Log "SUB-TASK QUEUE EMPTY. ANALYZING ROADMAP..." "PLAN"
            $planPrompt = @"
Target: $TASKS_FILE
Vision: Math Analysis Integrated System.
Instructions:
1. Review '## 总任务' and '## 已完成任务'.
2. Plan 3-5 new sub-tasks that follow a logical progression of Math Analysis.
3. Each task MUST focus on 'Detail + 1-2 Examples + Exercise Pool Expansion'.
Action: Append under '## 待办子任务'. Run 'gcp'.
"@
            & gemini -y -p $planPrompt
            Write-Log "STRATEGIC PLANNING COMPLETE. BATCH INJECTED." "SUCCESS"
            $content = Get-Content $TASKS_FILE -Raw 
        }

        # --- 阶段 2：全量执行 (Turbo Execution) ---
        # 在单次循环中处理所有待办任务，直到列表清空
        while ($true) {
            $content = Get-Content $TASKS_FILE -Raw
            if ($content -match "(?m)^## 待办子任务[\s\S]*?^- \[ \] (.*)") {
                $taskDesc = $matches[1].Trim()
                Write-Log "TURBO LOCKED TARGET: $taskDesc" "EXEC"

                # 锁定任务并上云
                $processingContent = $content -replace "(?m)^- \[ \] $([regex]::Escape($taskDesc))", "- [/] $taskDesc (Processing...)"
                Set-Content $TASKS_FILE $processingContent
                Invoke-GCP "chore: pulse - processing task: $taskDesc"

                Write-Log "EXECUTING TASK..." "EXEC"
                $execPrompt = @"
Task: $taskDesc
Context: Math Analysis Textbook Quality.
Action: 
1. Perform task (write content, examples, exercises).
2. Move task to '## 已完成任务' and mark as [x].
3. Run 'gcp'.
"@
                & gemini -y -p $execPrompt

                # 同步并验证
                git pull origin main --rebase
                $postCheck = Get-Content $TASKS_FILE -Raw
                if ($postCheck -match "(?m)^- \[\/\] $([regex]::Escape($taskDesc))") {
                    Write-Log "TASK FAILED. REVERTING..." "ERROR"
                    $revertContent = $postCheck -replace "(?m)^- \[\/\] $([regex]::Escape($taskDesc)) \(Processing...\)", "- [ ] $taskDesc"
                    Set-Content $TASKS_FILE $revertContent
                    Invoke-GCP "chore: pulse - task reverted: $taskDesc"
                    break # 跳出 Turbo 循环，等待下次心跳重试
                } else {
                    Write-Log "TASK SUCCESSFUL. MOVING TO NEXT..." "SUCCESS"
                }
            } else {
                Write-Log "ALL SUB-TASKS CLEARED IN THIS CYCLE." "SUCCESS"
                break
            }
        }

        Write-Log "Cloud verification..." "INFO"
        gh run list --limit 1
        
    } catch {
        Write-Log "TURBO ENGINE FAULT: $($_.Exception.Message)" "ERROR"
    }
    
    Show-Resting $CHECK_INTERVAL
}
