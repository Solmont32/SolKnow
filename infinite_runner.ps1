# SolKnow Autonomous Pulse Runner (V4.6 - SELF-HEALING ENGINE)
# Usage: pwsh -ExecutionPolicy Bypass -File infinite_runner.ps1

if ($IsWindows) { chcp 65001 | Out-Null }
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$CHECK_INTERVAL = 60 
$SYNC_COOLDOWN = 10 
$LOG_FILE = "AUTOMATION_LOG.md"
$TASKS_FILE = "TASKS.md"

# 核心同步函数：负责清理本地更改并推送到云端
function Invoke-Sync($message) {
    $status = git status --porcelain
    if ($status) {
        Write-Host ">>> [SELF-HEAL] Dirty workspace detected. Saving state: $message" -ForegroundColor Green
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

      [ STRATEGIC SELF-HEALING V4.6 ]
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
        Write-Host ">>> COOLING DOWN: $i SECONDS..." -ForegroundColor DarkGray
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

Write-Log "Self-Healing Engine V4.6 Initialized." "SUCCESS"

while($true) {
    try {
        Show-Logo
        
        # 修复关键点：先提交本地更改，确保工作区干净
        Write-Host ">>> Cleaning local workspace to prevent pull conflicts..." -ForegroundColor Gray
        Invoke-Sync "chore: self-healing pre-pulse sync"
        
        Write-Log "Synchronizing with cloud intelligence..." "INFO"
        git pull origin main --rebase

        $content = Get-Content $TASKS_FILE -Raw
        
        # 1. ANALYTICAL PLANNING
        if ($content -notlike "*- [ ] *") {
            Write-Log "Analyzing gaps for next planning batch..." "PLAN"
            
            $planPrompt = @"
Objective: Read '## 总任务' in $TASKS_FILE. 
Step 1: Audit the 'docs/' directory and 'sidebars.ts' to see what content already exists.
Step 2: Compare existing content with the 'Textbook Style Math Analysis' goal.
Step 3: Plan a batch of 3-5 high-quality sub-tasks to fill the gaps. 
Criteria: Ensure tasks follow a logical pedagogical order (e.g. Limits -> Continuity -> Derivatives).
Action: Append new tasks under '## 待办子任务' as '- [ ] Task (YYYY-MM-DD)'. 
NO Git commands. Do not modify other sections.
"@
            & gemini -y -p $planPrompt
            Invoke-Sync "plan: analytical roadmap update"
            $content = Get-Content $TASKS_FILE -Raw 
        }

        # 2. BATCH EXECUTION
        $lines = $content -split "`r?`n"
        foreach ($line in $lines) {
            if ($line -match '^- \[ \] (.*)') {
                $taskDesc = $matches[1].Trim()
                Write-Log "Targeting: $taskDesc" "EXEC"

                $newContent = $content -replace "\[ \] $([regex]::Escape($taskDesc))", "[/] $taskDesc (Processing...)"
                Set-Content $TASKS_FILE $newContent
                Invoke-Sync "lock: $taskDesc"

                $execPrompt = @"
Goal: $taskDesc. 
Context: Integrated Math Analysis System. 
Task: 1. Edit docs/exercise files. 2. Move task to '## 已完成任务' and mark as [x].
Rule: If files are updated but $TASKS_FILE is not precisely updated, mission FAILS. 
NO Git commands.
"@
                & gemini -y -p $execPrompt

                git pull origin main --rebase
                $postCheck = Get-Content $TASKS_FILE -Raw
                if ($postCheck -like "*[/] $taskDesc*") {
                    Write-Log "Integrity check failed for: $taskDesc. Reverting." "ERROR"
                    $revertContent = $postCheck -replace "\[\/\] $([regex]::Escape($taskDesc)) \(Processing...\)", "[ ] $taskDesc"
                    Set-Content $TASKS_FILE $revertContent
                    Invoke-Sync "revert: $taskDesc (missing status update)"
                    break
                } else {
                    Write-Log "Mission success: $taskDesc" "SUCCESS"
                    Invoke-Sync "feat: $taskDesc"
                }
            }
        }
    } catch {
        Write-Log "System encountered an error: $($_.Exception.Message)" "ERROR"
    }
    Show-Resting $CHECK_INTERVAL
}
