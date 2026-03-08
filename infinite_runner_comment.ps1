# SolKnow Autonomous Pulse Runner (V5.1 - OMNI-FLOW / SAFE-SENSE)
# Usage: powershell -ExecutionPolicy Bypass -File infinite_runner.ps1

# 设置编码为 UTF-8，以支持 Unicode 字符
if ($IsWindows) { chcp 65001 | Out-Null }
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

# --- 核心参数配置 ---
# 设置检查间隔时间为 60 秒
$CHECK_INTERVAL = 60 
# 设置同步冷却时间为 10 秒
$SYNC_COOLDOWN = 10 
# 设置日志文件路径
$LOG_FILE = "AUTOMATION_LOG.md"
# 设置任务文件路径
$TASKS_FILE = "TASKS.md"
# 设置全局变量，用于存储上次检查的 GitHub 运行 ID
$global:LAST_CHECKED_RUN_ID = ""

# --- 修复版日志功能 (兼容 PowerShell 5.1) ---
# 定义写入日志的函数，根据不同类型（信息、成功、错误等）打印不同的日志
function Write-Log($message, $type="INFO", $toFile=$true) {
    # 获取当前时间戳
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    # 设置日志标签和颜色
    $tag = "[INFO]"
    $color = "Gray"

    # 根据不同的日志类型设置标签和颜色
    if ($type -eq "SUCCESS") { $tag = "[ OK ]"; $color = "Green" }
    elseif ($type -eq "ERROR") { $tag = "[ERR ]"; $color = "Red" }
    elseif ($type -eq "PLAN") { $tag = "[PLAN]"; $color = "Cyan" }
    elseif ($type -eq "EXEC") { $tag = "[EXE ]"; $color = "Yellow" }

    # 构建日志内容
    $logEntry = "[$timestamp] $tag $message"
    # 输出到控制台
    Write-Host $logEntry -ForegroundColor $color
    # 如果需要，将日志写入文件
    if ($toFile) { Add-Content -Path $LOG_FILE -Value $logEntry -Encoding UTF8 }
}

# --- 简化版模型调用功能 ---
# 定义调用 GeminiSmart 模型的函数，执行相关任务
function Invoke-GeminiSmart($prompt) {
    try {
        # 输出日志，表示尝试执行模型调用
        Write-Log "Attempting pulse with default model..." "INFO"
        # 开启免确认模式，直接使用默认模型进行调用
        & gemini -y -p $prompt
        return $true
    } catch {
        # 如果出现异常，记录错误日志并返回失败
        Write-Log "Critical Fault: $($_.Exception.Message)" "ERROR"
        return $false
    }
}

# --- 检查云状态 ---
# 定义检查 GitHub Cloud 状态的函数
function Check-CloudStatus {
    try {
        # 获取 GitHub Actions 运行的最新状态
        $lastRunJson = gh run list --workflow "Deploy to GitHub Pages" --limit 1 --json databaseId,status,conclusion,displayTitle
        $lastRun = $lastRunJson | ConvertFrom-Json
        # 检查是否有新的运行记录
        if ($lastRun -and $lastRun[0].databaseId -ne $global:LAST_CHECKED_RUN_ID) {
            # 获取运行状态和结论
            $status = $lastRun[0].status
            $conclusion = $lastRun[0].conclusion
            # 如果运行完成，记录结果
            if ($status -eq "completed") {
                if ($conclusion -eq "success") {
                    Write-Log "Cloud Deployment VERIFIED: $($lastRun[0].displayTitle)" "SUCCESS"
                } else {
                    Write-Log "Cloud Deployment ALERT: $($lastRun[0].displayTitle) FAILED!" "ERROR"
                }
                # 更新上次运行的 ID
                $global:LAST_CHECKED_RUN_ID = $lastRun[0].databaseId
            }
        }
    } catch {}
}

# --- 同步功能 ---
# 定义同步功能的函数，将本地更改同步到远程 Git 仓库
function Invoke-Sync($message) {
    # 获取当前 Git 状态
    $status = git status --porcelain
    if ($status) {
        # 如果有变更，清理僵尸进程释放内存
        Get-Process node -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowTitle -eq "" } | Stop-Process -Force
        
        # 运行本地类型检查
        Write-Log "Pre-flight: Running local type-check..." "INFO"
        npm run typecheck > $null 2>&1
        if ($LASTEXITCODE -ne 0) {
            Write-Log "Pre-flight FAILED: Type errors. Sync aborted." "ERROR"
            return $false
        }

        # 开始同步操作
        Write-Log ">>> [SYNC] Aligning changes with cloud..." "EXEC"
        git add .
        git commit -m $message
        git pull origin main --rebase
        git push origin main
        # 等待冷却时间
        Start-Sleep -Seconds $SYNC_COOLDOWN
        return $true
    }
    return $false
}

# --- 显示 Logo ---
# 定义显示 Logo 的函数
function Show-Logo {
    # 随机选择颜色显示 Logo
    $colors = @("Cyan", "Blue", "White")
    $randomColor = $colors[(Get-Random -Maximum $colors.Count)]
    Clear-Host
    Write-Host @"
      [ SOLKNOW OMNI-FLOW V5.1 - SAFE SENSE ]
      ________________________________________________________________________________________________________
      S T R A T E G I C   A U T O N O M Y
      ________________________________________________________________________________________________________
"@ -ForegroundColor $randomColor
}

# --- 启动修复任务 ---
# 定义启动修复的函数，如果发现正在执行的任务卡住，则恢复任务状态
function Startup-Heal {
    # 如果任务文件存在
    if (Test-Path $TASKS_FILE) {
        # 读取任务文件内容
        $content = Get-Content $TASKS_FILE -Raw
        # 如果发现卡住的任务，进行修复
        if ($content -match '\[\/\] (.*) \(正在执行...\)') {
            Write-Log "Startup: Detected stuck task. Reverting..." "ERROR"
            # 替换任务状态为未执行状态
            $healed = $content -replace '\[\/\] (.*) \(正在执行...\)', '[ ] $1'
            Set-Content $TASKS_FILE $healed -Encoding UTF8
            # 进行同步
            Invoke-Sync "chore: startup self-heal"
        }
    }
}

# 如果日志文件不存在，创建日志文件并写入初始内容
if (-not (Test-Path $LOG_FILE)) { Add-Content -Path $LOG_FILE -Value "# SolKnow Audit Logs`n" -Encoding UTF8 }

# 输出初始化日志
Write-Log "Omni-Flow Engine V5.1 Initialized." "SUCCESS"
# 执行启动修复任务
Startup-Heal

# 主循环，持续运行任务
while($true) {
    try {
        Show-Logo
        # 检查云状态
        Check-CloudStatus
        Write-Host ">>> Initializing pulse sync..." -ForegroundColor Gray
        git pull origin main --rebase

        # 1. STRATEGIC AUDIT & PLANNING
        $content = Get-Content $TASKS_FILE -Raw
        if ($content -notmatch '- \[ \]') {
            Write-Log "No pending tasks. Running deep audit..." "PLAN"
            # 执行规划阶段
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
            # 规划阶段使用默认模型
            Invoke-GeminiSmart -prompt $planPrompt
            Invoke-Sync "plan: strategic expansion"
        }

        # 2. SEQUENTIAL EXECUTION
        while ($true) {
            # 执行任务处理
            $content = Get-Content $TASKS_FILE -Raw
            if ($content -match '(?m)^\s*- \[ \] (.*)') {
                $taskDesc = $matches[1].Trim()
                Write-Log "Target Locked: $taskDesc" "EXEC"
                # 锁定任务为正在执行状态
                $lockedContent = $content -replace "- \[ \] $([regex]::Escape($taskDesc))", "[/] $taskDesc (正在执行...)"
                Set-Content $TASKS_FILE $lockedContent -Encoding UTF8
                Invoke-Sync "lock: $taskDesc"

                # 执行任务的具体操作
                $execPrompt = @"
[EXECUTOR]
Task: $taskDesc
Context: Math Analysis Zero-Foundation System.
Instruction: 
1. Research docs/ to maintain continuity.
2. Implement content with LaTeX.
3. Move task to '## 已完成任务' and mark as '- [x]'.
"@
                # 执行阶段使用默认模型
                Invoke-GeminiSmart -prompt $execPrompt

                git pull origin main --rebase
                $postCheck = Get-Content $TASKS_FILE -Raw
                if ($postCheck -match '\[\/\]') {
                    Write-Log "Integrity FAILED for: $taskDesc. Reverting." "ERROR"
                    # 如果任务执行失败，进行回滚
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
    
    # 循环等待
    for ($i = $CHECK_INTERVAL; $i -gt 0; $i--) {
        Clear-Host
        Write-Host ">>> OMNI-FLOW STANDBY | HEARTBEAT: $i s | MODEL: DEFAULT" -ForegroundColor DarkGray
        Start-Sleep -Seconds 1
    }
}
