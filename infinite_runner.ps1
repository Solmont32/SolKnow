# SolKnow 工业级任务执行器 (V2.0 - Gemini 心跳版)
# 启动方式: powershell -ExecutionPolicy Bypass -File infinite_runner.ps1

$CHECK_INTERVAL = 300 # 每 5 分钟 (300秒) 心跳一次
$LOG_FILE = "AUTOMATION_LOG.md"
$TASKS_FILE = "TASKS.md"

# --- 视觉配置 ---
function Show-Heartbeat {
    $colors = @("Cyan", "Magenta", "Yellow", "White")
    $randomColor = $colors[(Get-Random -Maximum $colors.Count)]
    
    cls
    Write-Host @"
    
     ██████╗  ██████╗ ██╗     ██╗  ██╗███╗   ██╗ ██████╗ ██╗    ██╗
    ██╔════╝ ██╔═══██╗██║     ██║ ██╔╝████╗  ██║██╔═══██╗██║    ██║
    ██║  ███╗██║   ██║██║     █████╔╝ ██╔██╗ ██║██║   ██║██║ █╗ ██║
    ██║   ██║██║   ██║██║     ██╔═██╗ ██║╚██╗██║██║   ██║██║███╗██║
    ╚██████╔╝╚██████╔╝███████╗██║  ██╗██║ ╚████║╚██████╔╝╚███╔███╔╝
     ╚═════╝  ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝  ╚══╝╚══╝ 
                      [ SolKnow Gemini CLI Heartbeat ]
"@ -ForegroundColor $randomColor

    $now = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Write-Host "    >>> 心跳正常 | 模式: 24/7 监听 | 当前时间: $now <<<" -ForegroundColor Gray
    Write-Host "    --------------------------------------------------------" -ForegroundColor DarkGray
}

function Write-Log($message, $type="INFO") {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $color = "Cyan"
    if ($type -eq "SUCCESS") { $color = "Green" }
    if ($type -eq "ERROR") { $color = "Red" }
    if ($type -eq "WARN") { $color = "Yellow" }
    
    $logEntry = "[$timestamp] [$type] $message"
    Write-Host $logEntry -ForegroundColor $color
    Add-Content -Path $LOG_FILE -Value $logEntry
}

# --- 初始化 ---
if (-not (Test-Path $LOG_FILE)) {
    New-Item -Path $LOG_FILE -ItemType File
    Add-Content -Path $LOG_FILE -Value "# SolKnow 自动化执行日志`n"
}

Write-Log "自动化引擎 V2.0 启动，进入沉浸式监听模式..." "SUCCESS"

while($true) {
    try {
        Show-Heartbeat

        # 1. 权限确认与远程同步
        Write-Log "正在执行 git pull 同步远程指令..."
        git pull origin main --rebase

        # 2. 读取任务表并判断模式
        $content = Get-Content $TASKS_FILE -Raw
        
        # 匹配第一个待办任务 - [ ] (仅匹配行首)
        if ($content -match "(?m)^- \[ \] (.*)") {
            $taskDescription = $matches[1].Trim()
            Write-Log "【执行模式】: 发现待办任务 -> $taskDescription" "SUCCESS"

            # 标记为进行中 [/] (仅替换匹配行)
            $newContent = $content -replace "(?m)^- \[ \] $taskDescription", "- [/] $taskDescription (正在执行...)"
            Set-Content $TASKS_FILE $newContent
            git add $TASKS_FILE; git commit -m "status: 开始执行任务 - $taskDescription"; git push origin main

            # 3. 唤醒 Gemini 执行核心逻辑 (开启 YOLO 模式，赋予完全执行权限)
            Write-Log ">>> Gemini 前线执行官正在处理任务 (YOLO Mode)..."
            
            # 增强指令：闭环执行任务，跳过确认
            $geminiCmd = "gemini -y --approval-mode=yolo -p ""任务指令：$taskDescription 。作为拥有完全执行权限的代理，请完成以下流程：1. 深度实施任务内容。2. 在 TASKS.md 中将该项标记为 [x]。3. 在 $LOG_FILE 追加一条表格记录（| 时间 | 任务 | 状态 | 成果 |）。4. 执行 gcp 完成提交。5. 使用 'gh run list --limit 1' 检查部署状态并确保成功。"""
            
            Invoke-Expression $geminiCmd

            Write-Log "【任务闭环】: $taskDescription 处理完毕。" "SUCCESS"

        } else {
            Write-Log "【规划模式】: 当前无待办任务，唤醒 Gemini 架构师进行自我规划..." "WARN"
            
            # 自我派发任务逻辑 (开启 YOLO 模式)
            $planningCmd = "gemini -y --approval-mode=yolo -p ""当前待办任务为空。作为 SolKnow 的数字合伙人，请审视项目现状并规划 1 个具有深度且实用的新任务。将该任务以 '- [ ] 新任务描述' 格式写入 TASKS.md 的待办任务区，并执行 gcp 推送。"""
            Invoke-Expression $planningCmd
            
            Write-Log "【规划完成】: 新任务已生成。" "SUCCESS"
        }

        # 4. 状态检查
        gh run list --limit 1

    } catch {
        Write-Log "【错误】: $($_.Exception.Message)" "ERROR"
    }

    Write-Host "休眠中，等待 5 分钟后的下一次心跳..." -ForegroundColor DarkGray
    Start-Sleep -Seconds $CHECK_INTERVAL
}
