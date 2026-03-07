# SolKnow Industrial Pulse Runner (V2.3 - ASCII SAFE)
# Usage: powershell -ExecutionPolicy Bypass -File infinite_runner.ps1

$CHECK_INTERVAL = 300 
$LOG_FILE = "AUTOMATION_LOG.md"
$TASKS_FILE = "TASKS.md"

function Show-Heartbeat {
    $colors = @("Cyan", "Green", "White")
    $randomColor = $colors[(Get-Random -Maximum $colors.Count)]
    cls
    Write-Host @"

      [ MONITORING SYSTEM ACTIVE ]
      ________________________________________________________
                                                              
              _  _            _  _            _  _            
        ____/ \/ \__________/ \/ \__________/ \/ \__________  
              |  |            |  |            |  |            
      ________|  |____________|  |____________|  |__________  
                                                              
      ________________________________________________________
      
      >>> SYSTEM STATUS: VITAL SIGNS STABLE
      >>> CYCLE: 24/7 AUTONOMOUS MODE
      >>> TIME: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
      ________________________________________________________

"@ -ForegroundColor $randomColor
}

function Write-Log($message, $type="INFO") {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $color = "Cyan"
    $tag = "[VITAL]"
    if ($type -eq "SUCCESS") { $color = "Green"; $tag = "[STABLE]" }
    if ($type -eq "ERROR") { $color = "Red"; $tag = "[CRITICAL]" }
    if ($type -eq "WARN") { $color = "Yellow"; $tag = "[SCAN]" }
    $logEntry = "[$timestamp] $tag $message"
    Write-Host $logEntry -ForegroundColor $color
    Add-Content -Path $LOG_FILE -Value $logEntry
}

if (-not (Test-Path $LOG_FILE)) {
    New-Item -Path $LOG_FILE -ItemType File
    Add-Content -Path $LOG_FILE -Value "# SolKnow Automation Vital Logs`n"
}

Write-Log "Vital Signs Monitor Started." "SUCCESS"

while($true) {
    try {
        Show-Heartbeat
        Write-Log "Syncing with GitHub..."
        git pull origin main --rebase

        $content = Get-Content $TASKS_FILE -Raw
        
        if ($content -match "(?m)^- \[ \] (.*)") {
            $taskDesc = $matches[1].Trim()
            Write-Log "TASK DETECTED: $taskDesc" "SUCCESS"

            $newContent = $content -replace "(?m)^- \[ \] $taskDesc", "- [/] $taskDesc (Processing...)"
            Set-Content $TASKS_FILE $newContent
            git add $TASKS_FILE; git commit -m "status: vital mission start - $taskDesc"; git push origin main

            Write-Log "Activating Autonomous Agent (YOLO Mode)..."
            
            # ENGLISH PROMPT (Safe for PS1 encoding)
            $geminiCmd = "gemini --approval-mode=yolo -p ""Task: $taskDesc. 1. Execute task. 2. Mark [x] in TASKS.md. 3. Append markdown table row to $LOG_FILE. 4. Run 'gcp' to push. 5. Check 'gh run list'."""
            Invoke-Expression $geminiCmd

            Write-Log "MISSION ACCOMPLISHED" "SUCCESS"
        } else {
            Write-Log "PLANNING MODE..." "WARN"
            # ENGLISH PROMPT (Safe for PS1 encoding)
            $planCmd = "gemini --approval-mode=yolo -p ""No tasks. Review project and plan 1 high-quality technical task for SolKnow. Append '- [ ] Task Description' to TASKS.md and run 'gcp'."""
            Invoke-Expression $planCmd
            Write-Log "PLANNING COMPLETE." "SUCCESS"
        }
        gh run list --limit 1
    } catch {
        Write-Log "VITAL ERROR: $($_.Exception.Message)" "CRITICAL"
    }
    Write-Host "Resting for 5 minutes..." -ForegroundColor DarkGray
    Start-Sleep -Seconds $CHECK_INTERVAL
}
