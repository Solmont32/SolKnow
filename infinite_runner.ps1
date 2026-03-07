# SolKnow Industrial Pulse Runner (V2.6 - AESTHETIC EDITION)
# Usage (Mac/Linux): pwsh -File infinite_runner.ps1
# Usage (Windows): pwsh -ExecutionPolicy Bypass -File infinite_runner.ps1

$CHECK_INTERVAL = 300 
$LOG_FILE = "AUTOMATION_LOG.md"
$TASKS_FILE = "TASKS.md"

function Show-Logo {
    $colors = @("Cyan", "Blue", "White")
    $randomColor = $colors[(Get-Random -Maximum $colors.Count)]
    Clear-Host
    Write-Host @"

      [ SYSTEM ACTIVE ]
      _______________________________________________________________________________________________________________________

      ███           █████████   ███████████  █████        █████  █████  ██████   █████  ███████████  █████        █████ 
      ░░░███       ███░░░░░███ ░░███░░░░░███░░███        ░░███  ░░███  ░░██████ ░░███ ░░███░░░░░███░░███        ░░███  
        ░░░███    ░███    ░░░   ░███    ░███ ░███         ░███   ░███   ░███░███ ░███  ░███    ░███ ░███         ░███  
          ░░░███  ░░█████████   ░███    ░███ ░███         ░███████     ░███░░███░███  ░███    ░███ ░███    █    ░███  
           ███░    ░░░░░░░░███  ░███    ░███ ░███         ░███░░███    ░███ ░░██████  ░███    ░███ ░███   ███   ░███  
         ███░      ███    ░███  ░███    ░███ ░███      █  ░███ ░░███   ░███  ░░█████  ░███    ░███ ░███  █████  ░███  
       ███░       ░░█████████   ███████████  ███████████  █████ ░░███  ░█████  ░░███ ░░███████████ ░██████░████████  
      ░░░          ░░░░░░░░░   ░░░░░░░░░░░  ░░░░░░░░░░░  ░░░░░   ░░░   ░░░░░    ░░░   ░░░░░░░░░░░  ░░░░░░  ░░░░░░░░   

                                              S O L K N O W   I N D U S T R I A L
      _______________________________________________________________________________________________________________________
      
      >>> SYSTEM STATUS: ONLINE & SYNCED
      >>> CYCLE: 24/7 AUTONOMOUS MODE
      >>> TIME: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
      _______________________________________________________________________________________________________________________

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
      
      >>> STANDBY FOR $($CHECK_INTERVAL) SECONDS...
"@ -ForegroundColor DarkGray
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

# 初始化日志和任务文件
if (-not (Test-Path $LOG_FILE)) {
    New-Item -Path $LOG_FILE -ItemType File | Out-Null
    Add-Content -Path $LOG_FILE -Value "# SolKnow Automation Vital Logs`n"
}

if (-not (Test-Path $TASKS_FILE)) {
    New-Item -Path $TASKS_FILE -ItemType File | Out-Null
}

Write-Log "SolKnow Core Initialized." "SUCCESS"

while($true) {
    try {
        Show-Logo
        Write-Log "Syncing with GitHub..."
        git pull origin main --rebase

        $content = Get-Content $TASKS_FILE -Raw
        
        if ($content -match "(?m)^- \[ \] (.*)") {
            $taskDesc = $matches[1].Trim()
            Write-Log "TASK DETECTED: $taskDesc" "SUCCESS"

            # 标记并提交
            $newContent = $content -replace "(?m)^- \[ \] $([regex]::Escape($taskDesc))", "- [/] $taskDesc (Processing...)"
            Set-Content $TASKS_FILE $newContent
            git add $TASKS_FILE
            git commit -m "status: core processing - $taskDesc"
            git push origin main

            Write-Log "Activating Autonomous Agent..."
            
            $prompt = "Task: $taskDesc. 1. Execute task. 2. Mark [x] in TASKS.md. 3. Append markdown table row to $LOG_FILE. 4. Run 'gcp' to push. 5. Check 'gh run list'."
            & gemini -y -p $prompt

            # 回滚机制检查
            $postCheck = Get-Content $TASKS_FILE -Raw
            if ($postCheck -match "(?m)^- \[\/\] $([regex]::Escape($taskDesc))") {
                Write-Log "Agent failed to complete or mark task. Reverting state." "WARN"
                $revertContent = $postCheck -replace "(?m)^- \[\/\] $([regex]::Escape($taskDesc)) \(Processing...\)", "- [ ] $taskDesc"
                Set-Content $TASKS_FILE $revertContent
            } else {
                Write-Log "MISSION ACCOMPLISHED" "SUCCESS"
            }
            
        } else {
            Write-Log "PLANNING MODE..." "WARN"
            $planPrompt = "No tasks. Review project and plan 1 high-quality technical task for SolKnow. Append '- [ ] Task Description' to TASKS.md and run 'gcp'."
            & gemini -y -p $planPrompt
            Write-Log "PLANNING COMPLETE." "SUCCESS"
        }
        
        gh run list --limit 1
        
    } catch {
        Write-Log "CORE ERROR: $($_.Exception.Message)" "CRITICAL"
    }
    
    # 渲染休眠图案并等待
    Show-Resting
    Start-Sleep -Seconds $CHECK_INTERVAL
}