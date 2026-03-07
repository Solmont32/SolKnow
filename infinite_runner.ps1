# SolKnow 工业级任务执行器 (24/7 版)
# 启动方式: powershell -ExecutionPolicy Bypass -File infinite_runner.ps1

$CHECK_INTERVAL = 300 # 每 5 分钟拉取一次任务
$LOG_FILE = "AUTOMATION_LOG.md"

function Write-Log($message) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logEntry = "[$timestamp] $message"
    Write-Host $logEntry -ForegroundColor Cyan
    Add-Content -Path $LOG_FILE -Value $logEntry
}

if (-not (Test-Path $LOG_FILE)) {
    New-Item -Path $LOG_FILE -ItemType File
    Add-Content -Path $LOG_FILE -Value "# SolKnow 自动化执行日志`n"
}

Write-Log "自动化引擎启动，进入 24/7 监听模式..."

while($true) {
    try {
        # 1. 同步远程指令
        Write-Log "正在同步 GitHub 任务表..."
        git pull origin main --rebase

        # 2. 读取任务表
        $content = Get-Content "TASKS.md" -Raw
        
        # 匹配第一个待办任务 - [ ]
        if ($content -match "- \[ \] (.*)") {
            $taskDescription = $matches[1].Trim()
            Write-Log "【执行模式】: 发现待办任务 -> $taskDescription"

            # 标记为进行中 [/] 防止重复领题
            $newContent = $content -replace "- \[ \] $taskDescription", "- [/] $taskDescription (正在执行...)"
            Set-Content "TASKS.md" $newContent
            git add TASKS.md; git commit -m "status: 开始执行任务 - $taskDescription"; git push origin main

            # 3. 唤醒 Gemini 执行核心逻辑
            Write-Log ">>> Gemini 前线执行官正在处理任务..."
            $geminiCmd = "gemini -p ""任务内容：$taskDescription 。完成后请按以下步骤操作：1. 严谨修改代码或文档。2. 将 TASKS.md 中的该项标记为 [x]。3. 执行 gcp 完成提交推送。4. 如果遇到无法解决的错误，请将该项标记为 [!] 并简述原因。"""
            Invoke-Expression $geminiCmd

            Write-Log "【任务闭环】: $taskDescription 处理完毕。"
        } else {
            Write-Log "【规划模式】: 当前无待办任务，唤醒 Gemini 架构师进行自我规划..."
            
            # 自我派发任务逻辑
            $planningCmd = "gemini -p ""当前 TASKS.md 中已无待办任务。作为 SolKnow 的数字合伙人，请审视目前知识库（数学、竞赛、AI、安全）与练习库的建设进度。请自主规划 1 个接下来最迫切需要进行的『深度内容扩充』或『练习库建设』任务。要求任务必须非常具体（例如：'深度重构高等代数中的矩阵特征值章节，增加万字解析和 3 道例题'）。将该任务以 '- [ ] 新任务描述' 的格式追加到 TASKS.md 的 '## 待办任务' 标题下，最后执行 gcp 完成推送。"""
            Invoke-Expression $planningCmd
            
            Write-Log "【规划完成】: 新任务已生成，将在下一次心跳周期中执行。"
        }
    } catch {
        Write-Log "【警告】循环过程中出现异常: $($_.Exception.Message)"
    }

    Write-Host "休眠中，等待下一次巡检..." -ForegroundColor Gray
    Start-Sleep -Seconds $CHECK_INTERVAL
}
