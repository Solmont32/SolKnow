# SolKnow Autonomous Pulse Runner (V5.2 - CLAUDE CODE EDITION)
# Usage: powershell -ExecutionPolicy Bypass -File infinite_runner_claude.ps1

if ($IsWindows) { chcp 65001 | Out-Null }
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

# --- 环境变量检查：避免嵌套 Claude Code 会话 ---
if ($env:CLAUDECODE) {
    Write-Host "警告: 检测到 CLAUDECODE 环境变量，这可能导致嵌套会话问题。" -ForegroundColor Yellow
    Write-Host "建议: 在外部 PowerShell 会话中运行此脚本，而不是在 Claude Code 内部。" -ForegroundColor Yellow
    Write-Host "临时解决方案: 取消设置 CLAUDECODE 环境变量..." -ForegroundColor Yellow
    Remove-Item Env:\CLAUDECODE -ErrorAction SilentlyContinue
}

# --- 核心参数配置 ---
$CHECK_INTERVAL = 60
$SYNC_COOLDOWN = 10
$LOG_FILE = "AUTOMATION_LOG.md"
$TASKS_FILE = "TASKS.md"
$global:LAST_CHECKED_RUN_ID = ""

# 模型偏好配置 - Claude Code 模型
$MODEL_PRIMARY = "claude-opus-4-6"  # 主模型：Opus 4.6
$MODEL_SECONDARY = "claude-sonnet-4-6"  # 备用模型：Sonnet 4.6
$MODEL_FALLBACK = "claude-haiku-4-5-20251001"  # 降级模型：Haiku 4.5

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

# --- Claude Code 智能调用功能 ---
function Invoke-ClaudeSmart($prompt, $forceFallback=$false) {
    # 模型调用顺序
    $models = @($MODEL_PRIMARY, $MODEL_SECONDARY, $MODEL_FALLBACK)
    if ($forceFallback) { $models = @($MODEL_FALLBACK) }

    foreach ($model in $models) {
        try {
            Write-Log "Attempting pulse with Claude [$model]..." "INFO"

            # Claude Code 调用参数：
            # --model: 指定模型
            # --add-dir ".": 允许访问当前目录（使用 MCP 服务器）
            # -p: 提示词参数
            # --permission-mode acceptEdits: 自动接受编辑权限
            # --no-session-persistence: 不保存会话（减少资源占用）
            # 注意：不使用 --print，因为需要允许工具执行
            $claudeArgs = @(
                "--model", $model,
                "--add-dir", ".",
                "--permission-mode", "acceptEdits",
                "--no-session-persistence",
                "-p", $prompt
            )

            $process = Start-Process -FilePath "claude" -ArgumentList $claudeArgs -NoNewWindow -PassThru -Wait
            $exitCode = $process.ExitCode

            if ($exitCode -eq 0) {
                Write-Log "Claude execution completed successfully with model [$model]" "SUCCESS"
                return $true
            } else {
                Write-Log "Claude call failed with exit code $exitCode" "ERROR"

                # 检查常见的错误类型
                if ($exitCode -eq 1) {
                    # 一般性错误，可能是嵌套会话或权限问题
                    Write-Log "General Claude error (exit code 1). This might be due to nested sessions." "ERROR"
                    # 尝试清除环境变量并重试一次
                    if ($env:CLAUDECODE) {
                        Remove-Item Env:\CLAUDECODE -ErrorAction SilentlyContinue
                        Write-Log "Cleared CLAUDECODE env var and retrying..." "INFO"
                        continue
                    }
                }
                continue
            }
        } catch {
            $err = $_.Exception.Message
            Write-Log "Claude API Error with model [$model]: $err" "ERROR"

            # Claude 特定的错误处理
            if ($err -match "rate limit" -or $err -match "quota" -or $err -match "429" -or $err -match "Too Many Requests") {
                Write-Log "Rate limit detected for model [$model]. Switching..." "ERROR"
                continue # 尝试下一个模型
            } elseif ($err -match "model not available" -or $err -match "not found" -or $err -match "invalid model") {
                Write-Log "Model [$model] not available. Switching..." "ERROR"
                continue # 尝试下一个模型
            } elseif ($err -match "nested session" -or $err -match "CLAUDECODE") {
                Write-Log "Nested Claude session detected. This script should be run outside of Claude Code." "ERROR"
                # 尝试清除环境变量
                Remove-Item Env:\CLAUDECODE -ErrorAction SilentlyContinue
                Write-Log "Cleared CLAUDECODE env var. Retrying..." "INFO"
                continue
            } else {
                # 其他错误，继续尝试下一个模型
                Write-Log "Unknown error with model [$model]: $err" "ERROR"
                continue
            }
        }
    }

    # 如果所有模型都失败，进入深度休眠
    Write-Log "CRITICAL: All Claude models failed. Deep Sleep for 30 mins..." "ERROR"
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
        # 自动清理可能的僵尸进程释放内存
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
      [ SOLKNOW OMNI-FLOW V5.2 - CLAUDE CODE EDITION ]
      ________________________________________________________________________________________________________
      S T R A T E G I C   A U T O N O M Y (CLAUDE: OPUS -> SONNET -> HAIKU)
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

Write-Log "Claude Code Engine V5.2 Initialized." "SUCCESS"
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
            # 规划阶段使用主模型 (Opus)
            Invoke-ClaudeSmart -prompt $planPrompt -forceFallback $false
            Invoke-Sync "plan: strategic expansion via Claude"
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
                # 执行阶段可以使用降级模型 (Haiku) 节省配额
                Invoke-ClaudeSmart -prompt $execPrompt -forceFallback $true

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
                    Invoke-Sync "feat: completed $taskDesc via Claude Code"
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
        Write-Host ">>> CLAUDE-FLOW STANDBY | HEARTBEAT: $i s | MODELS: OPUS -> SONNET -> HAIKU" -ForegroundColor DarkGray
        Start-Sleep -Seconds 1
    }
}