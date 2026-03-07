# SolKnow Autonomous Pulse Runner (V3.6 - UNIVERSAL AESTHETIC)
# Usage: pwsh -ExecutionPolicy Bypass -File infinite_runner.ps1

# 核心：强制设置 Windows 终端代码页为 65001 (UTF-8)
if ($IsWindows) {
    chcp 65001 | Out-Null
}
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$CHECK_INTERVAL = 300 
$LOG_FILE = "AUTOMATION_LOG.md"
$TASKS_FILE = "TASKS.md"

function Invoke-GCP($message) {
    Write-Host ">>> Cloud Sync: $message" -ForegroundColor Gray
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
    # 使用基础字符重构的工业级 Logo，确保 0 乱码
    Write-Host @"

      [ STRATEGIC CORE ACTIVE ]
      ________________________________________________________________________________________________________

       ####   ####  #      #  # #  #  ####  #      #       #  #  #      #  ####  #   #
      #      #    # #      # #  # #  #    # #  #   #       #  #  # #    # #    # #   #
       ####  #    # #      ##   # #  #    # # # #  #       #  #  #  #  #  #    # # # #
           # #    # #      # #  # #  #    # ##   ##        #  #  #   # #  #    # # # #
       ####   ####  ###### #  # # #   ####  #     #        ####  #    #   ####   # # 

                                     S O L K N O W   I N D U S T R I A L
      ________________________________________________________________________________________________________
      
      >>> OBJECTIVE: INTEGRATED LEARNING SYSTEM (MATH & CS)
      >>> STATUS: RESILIENT SYNC & AUTO-PLANNING
      >>> TIME: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
      ________________________________________________________________________________________________________

"@ -ForegroundColor $randomColor
}

function Show-Resting {
    Clear-Host
    Write-Host @"

      [ SYSTEM STANDBY ]
      ________________________________________________________________________________________________________

               S  T  A  N  D  B  Y     M  O  D  E     A  C  T  I  V  A  T  E  D

      ________________________________________________________________________________________________________
      
      >>> NEXT HEARTBEAT IN $($CHECK_INTERVAL) SECONDS...
"@ -ForegroundColor DarkGray
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

Write-Log "SolKnow Industrial Core V3.6 (Universal) Initialized." "SUCCESS"

while($true) {
    try {
        Show-Logo
        
        Write-Host ">>> Verifying workspace integrity..." -ForegroundColor Gray
        Invoke-GCP "chore: automated pre-pulse sync"
        
        Write-Log "Pulling intelligence from cloud..." "INFO"
        git pull origin main --rebase

        $content = Get-Content $TASKS_FILE -Raw
        
        # 1. STRATEGIC PLANNING PHASE
        if ($content -notmatch "(?m)^## 待办子任务\s*(\r?\n- \[ \] .*)+") {
            Write-Log "SUB-TASK LIST DEPLETED. PLANNING NEXT BATCH..." "PLAN"
            
            $planPrompt = @"
Target: $TASKS_FILE
Objective: Read '## 总任务'. Plan 3-5 granular sub-tasks to fulfill it.
Requirements: Textbook quality, detailed knowledge, 1-2 examples, and multiple exercises per task.
Action: Append them under '## 待办子任务' header as '- [ ] Task (YYYY-MM-DD)'.
Rule: Do NOT change other sections. Run 'gcp' via Gemini CLI when done.
"@
            & gemini -y -p $planPrompt
            Write-Log "PLANNING COMPLETE." "SUCCESS"
            $content = Get-Content $TASKS_FILE -Raw 
        }

        # 2. TACTICAL EXECUTION PHASE
        if ($content -match "(?m)^## 待办子任务[\s\S]*?^- \[ \] (.*)") {
            $taskDesc = $matches[1].Trim()
            Write-Log "LOCKED TARGET: $taskDesc" "EXEC"

            $processingContent = $content -replace "(?m)^- \[ \] $([regex]::Escape($taskDesc))", "- [/] $taskDesc (Processing...)"
            Set-Content $TASKS_FILE $processingContent
            Invoke-GCP "chore: pulse - locking task: $taskDesc"

            Write-Log "EXECUTOR DEPLOYED." "EXEC"
            $execPrompt = @"
Task: $taskDesc
Context: Math Analysis Textbook Style.
Action: 
1. Perform task (content + examples + exercises).
2. Physical move: Remove from '## 待办子任务', add to '## 已完成任务' as '- [x]'.
3. Run 'gcp'.
4. Verify with 'gh run list'.
"@
            & gemini -y -p $execPrompt

            $postCheck = Get-Content $TASKS_FILE -Raw
            if ($postCheck -match "(?m)^- \[\/\] $([regex]::Escape($taskDesc))") {
                Write-Log "EXECUTOR INTERRUPTED. REVERTING TASK STATUS." "ERROR"
                $revertContent = $postCheck -replace "(?m)^- \[\/\] $([regex]::Escape($taskDesc)) \(Processing...\)", "- [ ] $taskDesc"
                Set-Content $TASKS_FILE $revertContent
                Invoke-GCP "chore: pulse - reverting failed task: $taskDesc"
            } else {
                Write-Log "MISSION SUCCESS: $taskDesc" "SUCCESS"
            }
        }
        
        Write-Log "Cloud verification..." "INFO"
        gh run list --limit 1
        
    } catch {
        Write-Log "SYSTEM FAULT: $($_.Exception.Message)" "ERROR"
    }
    
    Show-Resting
    Start-Sleep -Seconds $CHECK_INTERVAL
}
