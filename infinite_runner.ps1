# SolKnow Autonomous Pulse Runner (V3.5 - RESILIENT EDITION)
# Usage: pwsh -ExecutionPolicy Bypass -File infinite_runner.ps1

# 强制 UTF-8 编码确保 ASCII 艺术不乱码
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

$CHECK_INTERVAL = 300 
$LOG_FILE = "AUTOMATION_LOG.md"
$TASKS_FILE = "TASKS.md"

function Invoke-GCP($message) {
    Write-Host ">>> Executing Cloud Sync: $message" -ForegroundColor Gray
    git add .
    # 仅在有更改时才 commit
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
    # 换用更兼容的实心块字符
    Write-Host @"

      [ STRATEGIC AUTONOMY V3.5 ]
      __________________________________________________________________________________________________________________________

      ███           █████████   ███████████  █████        █████  █████  ██████   █████  ███████████  █████        █████ 
      ░░░███       ███░░░░░███ ░░███░░░░░███░░███        ░░███  ░░███  ░░██████ ░░███ ░░███░░░░░███░░███        ░░███  
        ░░░███    ░███    ░░░   ░███    ░███ ░███         ░███   ░███   ░███░███ ░███  ░███    ░███ ░███      ░███   
          ░░░███  ░░█████████   ░███    ░███ ░███         ░███████     ░███░░███░███  ░███    ░███ ░███  ██  ░███   
           ███░    ░░░░░░░░███  ░███    ░███ ░███         ░███░░███    ░███ ░░██████  ░███    ░███ ░███ ░███ ░███   
         ███░      ███    ░███  ░███    ░███ ░███      █  ░███ ░░███   ░███  ░░█████  ░███    ░███ ░███░█████░███   
       ███░       ░░█████████   ███████████  ███████████  █████ ░░███  ░█████  ░░███ ░░███████████ ░██████░██████   
      ░░░          ░░░░░░░░░   ░░░░░░░░░░░  ░░░░░░░░░░░  ░░░░░   ░░░   ░░░░░    ░░░   ░░░░░░░░░░░  ░░░░░░ ░░░░░░    

                                               S O L K N O W   I N D U S T R I A L
      __________________________________________________________________________________________________________________________
      
      >>> TARGET: INTEGRATED LEARNING SYSTEM (MATH & CS)
      >>> STATUS: RESILIENT SYNC & AUTO-PLANNING
      >>> TIME: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
      __________________________________________________________________________________________________________________________

"@ -ForegroundColor $randomColor
}

function Show-Resting {
    Clear-Host
    Write-Host @"

      [ SYSTEM STANDBY ]
      __________________________________________________________________________________________________________________________

       ███████████  ███████████   █████████  █████  ░░███  ███████████  ███████████  █████      █████
      ░░███░░░░░░░ ░░░░███░░░░   ███░░░░░███ ░█████  ░███ ░░███░░░░░███░░███░░░░░███░░███      ░░███ 
       ░░█████████     ░███     ░███    ░███ ░███░███ ░███  ░███    ░███ ░███    ░███ ░███      ░███  
        ░░░░░░░░███    ░███     ░███████████ ░███░░███████  ░███    ░███ ░██████████  ░░███    ███░   
       ███████████     ░███     ░███░░░░░███ ░███ ░░██████  ░███    ░███ ░███░░░░░███   ░░██████░     
      ░░░░░░░░░░░      ░░░      ░░░     ░░░  ░░░   ░░░░░░   ███████████  ███████████     ░░░███░      

                                               R E S T I N G   P H A S E
      __________________________________________________________________________________________________________________________
      
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

Write-Log "SolKnow Industrial Core V3.5 (Resilient) Initialized." "SUCCESS"

while($true) {
    try {
        Show-Logo
        
        # 弹性同步逻辑：在 Pull 前自动 Commit 未存盘的更改
        Write-Host ">>> Resolving local workspace potential conflicts..." -ForegroundColor Gray
        Invoke-GCP "chore: autonomous workspace sync before heartbeat"
        
        Write-Log "Pulling latest intelligence from cloud..." "INFO"
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
        
        Write-Log "Deployment verification..." "INFO"
        gh run list --limit 1
        
    } catch {
        Write-Log "SYSTEM FAULT: $($_.Exception.Message)" "ERROR"
    }
    
    Show-Resting
    Start-Sleep -Seconds $CHECK_INTERVAL
}
