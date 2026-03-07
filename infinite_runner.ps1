# SolKnow Autonomous Pulse Runner (V3.3 - ALIGNED EDITION)
# Usage: pwsh -ExecutionPolicy Bypass -File infinite_runner.ps1

$CHECK_INTERVAL = 300 
$LOG_FILE = "AUTOMATION_LOG.md"
$TASKS_FILE = "TASKS.md"

function Show-Logo {
    $colors = @("Cyan", "Blue", "White")
    $randomColor = $colors[(Get-Random -Maximum $colors.Count)]
    Clear-Host
    Write-Host @"

      [ STRATEGIC AUTONOMY V3.3 ]
      __________________________________________________________________________________________________________________________

      ███           █████████   ███████████  █████        █████  █████  ██████   █████  ███████████  █████        █████ 
      ░░░███       ███░░░░░███ ░░███░░░░░███░░███        ░░███  ░░███  ░░██████ ░░███ ░░███░░░░░███░░███        ░░███  
        ░░░███    ░███    ░░░   ░███    ░███ ░███         ░███   ░███   ░███░███ ░███  ░███    ░███ ░███         ░███  
          ░░░███  ░░█████████   ░███    ░███ ░███         ░███████     ░███░░███░███  ░███    ░███ ░███    █    ░███  
           ███░    ░░░░░░░░███  ░███    ░███ ░███         ░███░░███    ░███ ░░██████  ░███    ░███ ░███   ███   ░███  
         ███░      ███    ░███  ░███    ░███ ░███      █  ░███ ░░███   ░███  ░░█████  ░███    ░███ ░███  █████  ░███  
       ███░       ░░█████████   ███████████  ███████████  █████ ░░███  ░░█████  ░░███ ░░███████████ ░██████░████████  
      ░░░          ░░░░░░░░░   ░░░░░░░░░░░  ░░░░░░░░░░░  ░░░░░   ░░░   ░░░░░    ░░░   ░░░░░░░░░░░  ░░░░░░  ░░░░░░░░   

                                               S O L K N O W   I N D U S T R I A L
      __________________________________________________________________________________________________________________________
      
      >>> TARGET: INTEGRATED LEARNING SYSTEM (MATH & CS)
      >>> FOCUS: MATH ANALYSIS (TEXTBOOK STYLE)
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

if (-not (Test-Path $LOG_FILE)) { Add-Content -Path $LOG_FILE -Value "# SolKnow Automation Vital Logs`n" }

Write-Log "SolKnow Industrial Core V3.3 Initialized." "SUCCESS"

while($true) {
    try {
        Show-Logo
        Write-Log "Syncing with GitHub..." "INFO"
        git pull origin main --rebase

        $content = Get-Content $TASKS_FILE -Raw
        
        # 1. ANALYZE & PLAN PHASE
        # Check if "## 待办子任务" section has any uncompleted tasks
        if ($content -notmatch "(?m)^## 待办子任务\s*(\r?\n- \[ \] .*)+") {
            Write-Log "NO ACTIVE SUB-TASKS. ANALYZING GLOBAL GOALS..." "PLAN"
            
            $planPrompt = @"
Target: $TASKS_FILE
Objective: Read the content under '## 总任务'. Based on that, plan 3-5 granular sub-tasks.
Criteria: 
- Each sub-task must involve writing detailed Math Analysis content (textbook style).
- Each sub-task must include: 1. Knowledge points, 2. 1-2 Examples, 3. Multiple Exercises in the exercise pool.
Format: Append as '- [ ] Task Description (YYYY-MM-DD)' under '## 待办子任务'.
Constraint: Do NOT change the '## 总任务' or '## 已完成任务' headers. Run 'gcp' after modification.
"@
            & gemini -y -p $planPrompt
            Write-Log "STRATEGIC PLANNING COMPLETE. SUB-TASKS INJECTED." "SUCCESS"
            $content = Get-Content $TASKS_FILE -Raw 
        }

        # 2. EXECUTION PHASE
        # Find the first `- [ ]` task under "## 待办子任务"
        if ($content -match "(?m)^## 待办子任务[\s\S]*?^- \[ \] (.*)") {
            $taskDesc = $matches[1].Trim()
            Write-Log "TARGET LOCKED: $taskDesc" "EXEC"

            # Mark as processing
            $processingContent = $content -replace "(?m)^- \[ \] $([regex]::Escape($taskDesc))", "- [/] $taskDesc (Processing...)"
            Set-Content $TASKS_FILE $processingContent
            git add $TASKS_FILE
            git commit -m "chore: pulse - processing $taskDesc"
            git push origin main

            Write-Log "ACTIVATING EXECUTOR..." "EXEC"
            $execPrompt = @"
Task: $taskDesc
Objective: Fulfill the '## 总任务' requirements: textbook quality, 1-2 examples per point, multiple exercises in the corresponding exercises/ directory.
Action: 
1. Perform the task (create/edit docs and exercises).
2. Move the task from '## 待办子任务' to '## 已完成任务' and mark as [x].
3. Finalize with 'gcp'.
4. Check 'gh run list'.
"@
            & gemini -y -p $execPrompt

            # Post-check: If still in processing, something went wrong
            $postCheck = Get-Content $TASKS_FILE -Raw
            if ($postCheck -match "(?m)^- \[\/\] $([regex]::Escape($taskDesc))") {
                Write-Log "EXECUTOR INTERRUPTED. REVERTING TASK STATUS." "ERROR"
                $revertContent = $postCheck -replace "(?m)^- \[\/\] $([regex]::Escape($taskDesc)) \(Processing...\)", "- [ ] $taskDesc"
                Set-Content $TASKS_FILE $revertContent
            } else {
                Write-Log "MISSION ACCOMPLISHED: $taskDesc" "SUCCESS"
            }
        }
        
        Write-Log "Deployment review..." "INFO"
        gh run list --limit 1
        
    } catch {
        Write-Log "CORE ERROR: $($_.Exception.Message)" "ERROR"
    }
    
    Show-Resting
    Start-Sleep -Seconds $CHECK_INTERVAL
}
