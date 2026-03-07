# SolKnow 自动任务处理器
# 用法: powershell -ExecutionPolicy Bypass -File auto_processor.ps1

while($true) {
    cls
    Write-Host "======================================" -ForegroundColor Cyan
    Write-Host "   SolKnow Gemini 任务监控中...       " -ForegroundColor Cyan
    Write-Host "   时间: $(Get-Date)                  " -ForegroundColor Gray
    Write-Host "======================================" -ForegroundColor Cyan

    # 1. 同步远程任务
    Write-Host "[1/3] 同步远程任务表..." -ForegroundColor Yellow
    git pull origin main

    # 2. 解析任务
    $tasks = Get-Content "TASKS.md"
    $taskFound = $false

    foreach ($line in $tasks) {
        if ($line -match "- \[ \] (.*)") {
            $taskDescription = $matches[1]
            Write-Host "[2/3] 发现新任务: $taskDescription" -ForegroundColor Green
            
            # 3. 呼叫 Gemini 执行
            Write-Host ">>> 正在启动 Gemini CLI..." -ForegroundColor Magenta
            gemini -p "执行 TASKS.md 中的任务：$taskDescription。完成后，请务必修改 TASKS.md 将该项标记为 [x]，并利用你的 gcp 记忆完成推送和日志自检。"
            
            $taskFound = $true
            break # 串行处理，一次一个，确保稳定
        }
    }

    if (-not $taskFound) {
        Write-Host "[2/3] 暂无待办任务。" -ForegroundColor Gray
    }

    Write-Host "[3/3] 进入休眠，10分钟后再次巡检..." -ForegroundColor Gray
    Start-Sleep -Seconds 600
}
