# SolKnow Autonomous Pulse Runner (V4.4 - ULTRA STABLE)
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

      [ STRATEGIC ENGINE V4.4 - STABLE ]
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
        Write-Host ">>> NEXT HEARTBEAT IN $i SECONDS..." -ForegroundColor DarkGray
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

Write-Log "System V4.4 Initialized." "SUCCESS"

while($true) {
    try {
        Show-Logo
        Write-Host ">>> Syncing..." -ForegroundColor Gray
        git pull origin main --rebase

        $content = Get-Content $TASKS_FILE -Raw
        
        # 1. PLANNING
        if ($content -notlike "*- [ ] *") {
            Write-Log "Queue empty. Planning..." "PLAN"
            $planPrompt = "Read $TASKS_FILE. Plan 3-5 sub-tasks for Math Analysis depth expansion. Append under '## 待办子任务' header as '- [ ] Task (YYYY-MM-DD)'. NO Git commands."
            & gemini -y -p $planPrompt
            Invoke-Sync "plan: new batch"
            $content = Get-Content $TASKS_FILE -Raw 
        }

        # 2. EXECUTION
        $lines = $content -split "`r?`n"
        foreach ($line in $lines) {
            if ($line -match '^- \[ \] (.*)') {
                $taskDesc = $matches[1].Trim()
                Write-Log "Target locked: $taskDesc" "EXEC"

                # Mark processing
                $newContent = $content -replace "\[ \] $([regex]::Escape($taskDesc))", "[/] $taskDesc (Processing...)"
                Set-Content $TASKS_FILE $newContent
                Invoke-Sync "lock: $taskDesc"

                $execPrompt = "Goal: $taskDesc. Context: Math Analysis. Action: 1. Edit docs. 2. Move task to '## 已完成任务' as '- [x]'. NO Git commands. Precision required."
                & gemini -y -p $execPrompt

                git pull origin main --rebase
                $postCheck = Get-Content $TASKS_FILE -Raw
                if ($postCheck -like "*[/] $taskDesc*") {
                    Write-Log "Failed: $taskDesc. Reverting..." "ERROR"
                    $revertContent = $postCheck -replace "\[\/\] $([regex]::Escape($taskDesc)) \(Processing...\)", "[ ] $taskDesc"
                    Set-Content $TASKS_FILE $revertContent
                    Invoke-Sync "revert: $taskDesc"
                    break
                } else {
                    Write-Log "Completed: $taskDesc" "SUCCESS"
                    Invoke-Sync "feat: $taskDesc"
                }
            }
        }
    } catch {
        Write-Log "Critical fault: $($_.Exception.Message)" "ERROR"
    }
    Show-Resting $CHECK_INTERVAL
}
