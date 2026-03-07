# SolKnow Autonomous Pulse Runner (V5.1 - OMNI-FLOW / SAFE-SENSE)
# Usage: powershell -ExecutionPolicy Bypass -File infinite_runner.ps1

if ($IsWindows) { chcp 65001 | Out-Null }
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

# --- 核心参数配置 ---
$CHECK_INTERVAL = 60 
$SYNC_COOLDOWN = 10 
$LOG_FILE = "AUTOMATION_LOG.md"
$TASKS_FILE = "TASKS.md"
$global:LAST_CHECKED_RUN_ID = ""

# 模型偏好配置
$MODEL_PRO = "gemini-3.1-pro-preview"
$MODEL_FLASH = "gemini-2.0-flash"

# --- 修复版日志功能 (兼容 PowerShell 5.1) ---
function Write-Log($message, $type="INFO", $toFile=$true) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $tag = "[INFO]"
    $color = "Gray"

    if ($type -eq "SUCCESS") { $tag = "[ OK ]"; $color = "Green" }
    elseif ($type -eq "ERROR") { $tag = "[ERR ]"; $color = "Red" }
    elseif ($type -eq "PLAN") { $tag = "[PLAN]"; $color = "Cyan" }
    elseif ($type -eq "EXEC") { $tag = "[EXE ]"; $color = "Yellow" }

    $logEntry = "[$timestamp] $tag $message"
    Write-Host $logEntry -ForegroundColor $color
    if ($toFile) { Add-Content -Path $LOG_FILE -Value $logEntry -Encoding UTF8 }
}

# --- 智能模型切换功能 (应对 429 和 14小时封禁) ---
function Invoke-GeminiSmart($prompt, $forceFlash=$false) {
    $models = @($MODEL_PRO, $MODEL_FLASH)
    if ($forceFlash) { $models = @($MODEL_FLASH) }

    foreach ($model in $models) {
        try {
            Write-Log "Attempting pulse with [$model]..." "INFO"
            # 开启免确认模式，并赋予当前目录读写权限供 MCP 使用
            & gemini -y --model $model --include-directories "." -p $prompt
            return $true
        } catch {
            $err = $_.Exception.Message
            if ($err -match "429" -or $err -match "RESOURCE_EXHAUSTED") {
                Write-Log "Model [$model] Quota Exhausted (429). Switching..." "ERROR"
                continue # 尝试降级到下一个模型
            } else {
                throw $_
            }
        }
    }
    # 如果两个模型都挂了，强制进入深度休眠保护 IP
    Write-Log "CRITICAL: All models exhausted (14H cooling). Deep Sleep for 30 mins..." "ERROR"
    Start-Sleep -Seconds 1800
    return $false
}

function Check-CloudStatus {
    try {
        $lastRunJson = gh run list --workflow "Deploy to GitHub Pages" --limit 1 --json databaseId,status,conclusion,displayTitle
        $lastRun = $lastRunJson | ConvertFrom-Json
        if ($lastRun -and $lastRun[0].databaseId -ne $global:LAST_CHECKED_RUN_ID) {
            $status = $lastRun[0].status
            $conclusion = $lastRun[0].conclusion
            if ($status -eq "completed") {
                if ($conclusion -eq "success") {
                    Write-Log "Cloud Deployment VERIFIED: $($lastRun[0].displayTitle)" "SUCCESS"
                } else {
                    Write-Log "Cloud Deployment ALERT: $($lastRun[0].displayTitle) FAILED!" "ERROR"
                }
                $global:LAST_CHECKED_RUN_ID = $lastRun[0].databaseId
            }
        }
    } catch {}
}

function Invoke-Sync($message) {
    $status = git status --porcelain
    if ($status) {
        # 自动清理 MCP 僵尸进程释放内存
        Get-Process node -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowTitle -eq "" } | Stop-Process -Force
        
        Write-Log "Pre-flight: Running local type-check..." "INFO"
        npm run typecheck > $null 2>&1
        if ($LASTEXITCODE -ne 0) {
            Write-Log "Pre-flight FAILED: Type errors. Sync aborted." "ERROR"
            return $false
        }

        Write-Log ">>> [SYNC] Aligning changes with cloud..." "EXEC"
        git add .
        git commit -m $message
        git pull origin main --rebase
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
      [ SOLKNOW OMNI-FLOW V5.1 - SAFE SENSE ]
      ________________________________________________________________________________________________________
      S T R A T E G I C   A U T O N O M Y (AUTO-FALLBACK: ON)
      ________________________________________________________________________________________________________
"@ -ForegroundColor $randomColor
}

function Startup-Heal {
    if (Test-Path $TASKS_FILE) {
        $content = Get-Content $TASKS_FILE -Raw
        if ($content -match '\[\/\] (.*) \(正在执行...\)') {
            Write-Log "Startup: Detected stuck task. Reverting..." "ERROR"
            $healed = $content -replace '\[\/\] (.*) \(正在执行...\)', '[ ] $1'
            Set-Content $TASKS_FILE $healed -Encoding UTF8
            Invoke-Sync "chore: startup self-heal"
        }
    }
}

if (-not (Test-Path $LOG_FILE)) { Add-Content -Path $LOG_FILE -Value "# SolKnow Audit Logs`n" -Encoding UTF8 }

Write-Log "Omni-Flow Engine V5.1 Initialized." "SUCCESS"
Startup-Heal

while($true) {
    try {
        Show-Logo
        Check-CloudStatus
        Write-Host ">>> Initializing pulse sync..." -ForegroundColor Gray
        git pull origin main --rebase

        # 1. STRATEGIC AUDIT & PLANNING
        $content = Get-Content $TASKS_FILE -Raw
        if ($content -notmatch '- \[ \]') {
            Write-Log "No pending tasks. Running deep audit..." "PLAN"
            $planPrompt = @"
[STRATEGIC PLANNER]
Current Date: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
Goal: Plan 3-5 sub-tasks for '## 总任务' based on 'docs/academic-math/analysis/' status.
Mandatory Action:
1. Audit existing files and 'sidebars.ts' via MCP.
2. Ensure textbook-quality chapters.
3. Append tasks to $TASKS_FILE as '- [ ] Task (YYYY-MM-DD)'.
Requirement: NO Git. Be precise.
"@
            # 规划阶段优先尝试用 Pro 模型推导
            Invoke-GeminiSmart -prompt $planPrompt -forceFlash $false
            Invoke-Sync "plan: strategic expansion"
        }

        # 2. SEQUENTIAL EXECUTION
        while ($true) {
            $content = Get-Content $TASKS_FILE -Raw
            if ($content -match '(?m)^\s*- \[ \] (.*)') {
                $taskDesc = $matches[1].Trim()
                Write-Log "Target Locked: $taskDesc" "EXEC"

                $lockedContent = $content -replace "- \[ \] $([regex]::Escape($taskDesc))", "[/] $taskDesc (正在执行...)"
                Set-Content $TASKS_FILE $lockedContent -Encoding UTF8
                Invoke-Sync "lock: $taskDesc"

                $execPrompt = @"
[EXECUTOR]
Task: $taskDesc
Context: Math Analysis Zero-Foundation System.
Instruction: 
1. Research docs/ to maintain continuity.
2. Implement content with LaTeX.
3. Move task to '## 已完成任务' and mark as '- [x]'.
"@
                # 执行阶段直接使用 Flash 节省 Pro 配额
                Invoke-GeminiSmart -prompt $execPrompt -forceFlash $true 

                git pull origin main --rebase
                $postCheck = Get-Content $TASKS_FILE -Raw
                if ($postCheck -match '\[\/\]') {
                    Write-Log "Integrity FAILED for: $taskDesc. Reverting." "ERROR"
                    $revert = $postCheck -replace '\[\/\] .* \(正在执行...\)', "[ ] $taskDesc"
                    Set-Content $TASKS_FILE $revert -Encoding UTF8
                    Invoke-Sync "revert: failure"
                    break
                } else {
                    Write-Log "Mission Accomplished: $taskDesc" "SUCCESS"
                    Invoke-Sync "feat: completed $taskDesc"
                }
            } else { 
                Write-Log "Batch queue cleared." "SUCCESS"
                break 
            }
        }
    } catch {
        Write-Log "Critical Fault: $($_.Exception.Message)" "ERROR"
        Start-Sleep -Seconds 60
    }
    
    for ($i = $CHECK_INTERVAL; $i -gt 0; $i--) {
        Clear-Host
        Write-Host ">>> OMNI-FLOW STANDBY | HEARTBEAT: $i s | MODELS: PRO -> FLASH" -ForegroundColor DarkGray
        Start-Sleep -Seconds 1
    }
}