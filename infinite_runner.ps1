# SolKnow Autonomous Pulse Runner (V3.1 - REFINED EDITION)
# Usage: pwsh -ExecutionPolicy Bypass -File infinite_runner.ps1

$CHECK_INTERVAL = 300 
$LOG_FILE = "AUTOMATION_LOG.md"
$TASKS_FILE = "TASKS.md"

function Show-Logo {
    $colors = @("Cyan", "Blue", "White")
    $randomColor = $colors[(Get-Random -Maximum $colors.Count)]
    Clear-Host
    Write-Host @"

      [ AUTONOMOUS MODE ACTIVE ]
      __________________________________________________________________________________________________________________________

      ███           █████████   ███████████  █████        █████  █████  ██████   █████  ███████████  █████        █████ 
      ░░░███       ███░░░░░███ ░░███░░░░░███░░███        ░░███  ░░███  ░░██████ ░░███ ░░███░░░░░███░░███        ░░███  
        ░░░███    ░███    ░░░   ░███    ░███ ░███         ░███   ░███   ░███░███ ░███  ░███    ░███ ░███         ░███  
          ░░░███  ░░█████████   ░███    ░███ ░███         ░███████     ░███░░███░███  ░███    ░███ ░███    █    ░███  
           ███░    ░░░░░░░░███  ░███    ░███ ░███         ░███░░███    ░███ ░░██████  ░███    ░███ ░███   ███   ░███  
         ███░      ███    ░███  ░███    ░███ ░███      █  ░███ ░░███   ░███  ░░█████  ░███    ░███ ░███  █████  ░███  
       ███░       ░░█████████   ███████████  ███████████  █████ ░░███  ░█████  ░░███ ░░███████████ ░██████░████████  
      ░░░          ░░░░░░░░░   ░░░░░░░░░░░  ░░░░░░░░░░░  ░░░░░   ░░░   ░░░░░    ░░░   ░░░░░░░░░░░  ░░░░░░  ░░░░░░░░   

                                               S O L K N O W   I N D U S T R I A L
      __________________________________________________________________________________________________________________________
      
      >>> TARGET: INTEGRATED ZERO-FOUNDATION LEARNING SYSTEM
      >>> STATUS: AUTONOMOUS PLANNING & EXECUTION
      >>> FREQUENCY: 300s SYNC
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
      
      >>> SYNCING WITH CLOUD IN $($CHECK_INTERVAL) SECONDS...
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

# Ensure Vital Files Exist
if (-not (Test-Path $LOG_FILE)) { Add-Content -Path $LOG_FILE -Value "# SolKnow Automation Vital Logs`n" }
if (-not (Test-Path $TASKS_FILE)) { New-Item -Path $TASKS_FILE -ItemType File | Out-Null }

Write-Log "SolKnow Industrial Core V3.1 Initialized." "SUCCESS"

while($true) {
    try {
        Show-Logo
        Write-Log "Pulling latest state from cloud..."
        git pull origin main --rebase

        $content = Get-Content $TASKS_FILE -Raw
        
        # 1. STRATEGIC PLANNING PHASE
        if ($content -notmatch "(?m)^- \[ \] (.*)") {
            Write-Log "NO ACTIVE SUB-TASKS. ANALYZING GOALS IN $TASKS_FILE..." "PLAN"
            
            $planPrompt = @"
Objective: Read $TASKS_FILE. Based on the project description and mission in that file, plan exactly 1-3 granular, high-quality technical sub-tasks.
Action: Append them to $TASKS_FILE under the '## 待办任务' section as '- [ ] Task Description' and run 'gcp'.
Requirement: Tasks must be highly relevant to the 'integrated zero-foundation learning system' goal.
"@
            & gemini -y -p $planPrompt
            Write-Log "STRATEGIC PLANNING COMPLETE. SUB-TASKS INJECTED." "SUCCESS"
            $content = Get-Content $TASKS_FILE -Raw # Refresh content
        }

        # 2. EXECUTION PHASE
        if ($content -match "(?m)^- \[ \] (.*)") {
            $taskDesc = $matches[1].Trim()
            Write-Log "ACTIVE SUB-TASK DETECTED: $taskDesc" "EXEC"

            # Mark as processing to prevent race conditions
            $processingContent = $content -replace "(?m)^- \[ \] $([regex]::Escape($taskDesc))", "- [/] $taskDesc (Processing...)"
            Set-Content $TASKS_FILE $processingContent
            git add $TASKS_FILE
            git commit -m "chore: pulse - processing sub-task: $taskDesc"
            git push origin main

            Write-Log "ACTIVATING EXECUTOR..." "EXEC"
            $execPrompt = @"
Task: $taskDesc.
Vision: Refer to the top of $TASKS_FILE for project goals.
Instructions: 
1. Execute the task (write code/docs).
2. Mark [x] in $TASKS_FILE.
3. Finalize with 'gcp'.
4. Verify with 'gh run list'.
"@
            & gemini -y -p $execPrompt

            # Post-Execution Validation
            $postCheck = Get-Content $TASKS_FILE -Raw
            if ($postCheck -match "(?m)^- \[\/\] $([regex]::Escape($taskDesc))") {
                Write-Log "EXECUTOR FAILED TO COMPLETE OR MARK TASK. REVERTING STATE." "ERROR"
                $revertContent = $postCheck -replace "(?m)^- \[\/\] $([regex]::Escape($taskDesc)) \(Processing...\)", "- [ ] $taskDesc"
                Set-Content $TASKS_FILE $revertContent
            } else {
                Write-Log "SUB-TASK COMPLETED: $taskDesc" "SUCCESS"
            }
        }
        
        # 3. GLOBAL CLOUD REVIEW
        Write-Log "Reviewing cloud deployment status..." "INFO"
        gh run list --limit 1
        
    } catch {
        Write-Log "CORE SYSTEM FAULT: $($_.Exception.Message)" "ERROR"
    }
    
    Show-Resting
    Start-Sleep -Seconds $CHECK_INTERVAL
}
