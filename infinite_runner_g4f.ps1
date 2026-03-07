# SolKnow Autonomous Pulse Runner (V5.2 - DOCKER UNLIMITED + ERROR TRACING)
# Usage: powershell -ExecutionPolicy Bypass -File infinite_runner_g4f.ps1

if ($IsWindows) { chcp 65001 | Out-Null }
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

# --- 核心参数配置 ---
$CHECK_INTERVAL = 60 
$SYNC_COOLDOWN = 10 
$LOG_FILE = "AUTOMATION_LOG.md"
$ERROR_LOG_FILE = "ERROR_LOG.md" 
$TASKS_FILE = "TASKS.md"
$global:LAST_CHECKED_RUN_ID = ""

# --- 修复版日志功能 ---
function Write-Log($message, $type="INFO", $toFile=$true) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $tag = "[INFO]"; $color = "Gray"
    if ($type -eq "SUCCESS") { $tag = "[ OK ]"; $color = "Green" }
    elseif ($type -eq "ERROR") { $tag = "[ERR ]"; $color = "Red" }
    elseif ($type -eq "PLAN") { $tag = "[PLAN]"; $color = "Cyan" }
    elseif ($type -eq "EXEC") { $tag = "[EXE ]"; $color = "Yellow" }

    $logEntry = "[$timestamp] $tag $message"
    Write-Host $logEntry -ForegroundColor $color
    if ($toFile) { Add-Content -Path $LOG_FILE -Value $logEntry -Encoding UTF8 }
}

# --- 核心：Docker g4f 本地接口调用 ---
function Invoke-DockerApi($prompt, $model="default") {
    Write-Log "Attempting pulse via local Docker (Model: $model)..." "INFO"
    $apiUrl = "http://127.0.0.1:1337/v1/chat/completions"
    
    $body = @{
        model = $model
        messages = @( @{ role = "user"; content = $prompt } )
    } | ConvertTo-Json -Depth 10

    try {
        # 设置超时为 120 秒，容忍 g4f 后台寻找免费节点的延迟
        $response = Invoke-RestMethod -Uri $apiUrl -Method Post -Body $body -ContentType "application/json" -TimeoutSec 120
        $resultText = $response.choices[0].message.content
        
        # 剥离可能存在的 markdown 格式符
        $cleanText = $resultText -replace '(?s)^```[a-zA-Z]*\n', '' -replace '(?s)\n```$', ''
        Write-Log "Docker API Response Received." "SUCCESS"
        return $cleanText
    } catch {
        # 深度捕获报错信息
        $baseMsg = $_.Exception.Message
        $detailMsg = "No additional details."
        
        # 尝试从 HTTP Response 中读取真实的报错 JSON 
        if ($_.Exception.Response) {
            try {
                $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
                $detailMsg = $reader.ReadToEnd()
                $reader.Close()
            } catch {}
        }
        
        Write-Log "Docker API Call Failed. Check $ERROR_LOG_FILE for details." "ERROR"
        
        # 写入详细的错误追踪文件
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        $errorDump = @"
[$timestamp] [API_ERROR]
Message: $baseMsg
API Response Details: 
$detailMsg
--------------------------------------------------
"@
        Add-Content -Path $ERROR_LOG_FILE -Value $errorDump -Encoding UTF8
        return $null
    }
}

function Check-CloudStatus {
    try {
        $lastRunJson = gh run list --workflow "Deploy to GitHub Pages" --limit 1 --json databaseId,status,conclusion,displayTitle
        $lastRun = $lastRunJson | ConvertFrom-Json
        if ($lastRun -and $lastRun[0].databaseId -ne $global:LAST_CHECKED_RUN_ID) {
            $status = $lastRun[0].status
            $conclusion = $lastRun[0].conclusion
            if ($status -eq "completed") {
                if ($conclusion -eq "success") { Write-Log "Cloud Deployment VERIFIED: $($lastRun[0].displayTitle)" "SUCCESS" } 
                else { Write-Log "Cloud Deployment ALERT: $($lastRun[0].displayTitle) FAILED!" "ERROR" }
                $global:LAST_CHECKED_RUN_ID = $lastRun[0].databaseId
            }
        }
    } catch {}
}

function Invoke-Sync($message) {
    $status = git status --porcelain
    if ($status) {
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
    
    $logoText = @"
      [ SOLKNOW OMNI-FLOW V5.2 - DOCKER UNLIMITED ]
      ________________________________________________________________________________________________________
      S T R A T E G I C   A U T O N O M Y (ERROR-TRACING: ON)
      ________________________________________________________________________________________________________
"@
    Write-Host $logoText -ForegroundColor $randomColor
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

# 确保必要的目录和文件存在
if (-not (Test-Path "docs")) { New-Item -ItemType Directory -Path "docs" | Out-Null }
if (-not (Test-Path $LOG_FILE)) { Add-Content -Path $LOG_FILE -Value "# SolKnow Audit Logs`n" -Encoding UTF8 }
if (-not (Test-Path $ERROR_LOG_FILE)) { Add-Content -Path $ERROR_LOG_FILE -Value "# SolKnow Error Traces`n" -Encoding UTF8 }

Write-Log "Omni-Flow Engine V5.2 Initialized." "SUCCESS"
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
            Write-Log "No pending tasks. Initiating Docker planning..." "PLAN"
            $planPrompt = @"
[STRATEGIC PLANNER]
Current Goal is to write textbook-quality Math Analysis chapters.
The current task file content is:
$content

Please plan exactly 3 concrete sub-tasks.
OUTPUT FORMAT REQUIREMENT: You must ONLY output the 3 tasks in this exact format, with no other text:
- [ ] Task 1 Description
- [ ] Task 2 Description
- [ ] Task 3 Description
"@
            $newTasks = Invoke-DockerApi -prompt $planPrompt
            if ($newTasks -and $newTasks -match '- \[ \]') {
                Add-Content -Path $TASKS_FILE -Value "`n$newTasks" -Encoding UTF8
                Invoke-Sync "plan: strategic expansion via Docker"
            } else {
                Write-Log "Planning failed or returned invalid format. Skipping..." "ERROR"
            }
        }

        # 2. SEQUENTIAL EXECUTION
        while ($true) {
            $content = Get-Content $TASKS_FILE -Raw
            if ($content -match '(?m)^\s*- \[ \] (.*)') {
                $taskDesc = $matches[1].Trim()
                Write-Log "Target Locked: $taskDesc" "EXEC"

                # 锁定状态
                $lockedContent = $content -replace "- \[ \] $([regex]::Escape($taskDesc))", "[/] $taskDesc (正在执行...)"
                Set-Content $TASKS_FILE $lockedContent -Encoding UTF8
                Invoke-Sync "lock: $taskDesc"

                $execPrompt = @"
[MATH EXECUTOR]
Task: $taskDesc
Context: Math Analysis Zero-Foundation System.
Instruction: 
Please generate a complete, textbook-quality markdown document for this task. 
Include theory, definitions, and examples using LaTeX for math formulas.
DO NOT include file names or markdown code block markers in your output, just the raw markdown content.
"@
                $generatedContent = Invoke-DockerApi -prompt $execPrompt
                
                if ($generatedContent) {
                    $safeFileName = $taskDesc -replace '[\\/:*?"<>|]', '_'
                    $filePath = "docs/$safeFileName.md"
                    Set-Content -Path $filePath -Value $generatedContent -Encoding UTF8
                    Write-Log "Content generated and saved to $filePath" "INFO"

                    $postCheck = Get-Content $TASKS_FILE -Raw
                    $fixedContent = $postCheck -replace '\[\/\] .* \(正在执行...\)', "- [x] $taskDesc (已完成)"
                    Set-Content $TASKS_FILE $fixedContent -Encoding UTF8
                    
                    Write-Log "Mission Accomplished: $taskDesc" "SUCCESS"
                    Invoke-Sync "feat: completed $taskDesc via Docker"
                } else {
                    Write-Log "Execution returned empty content. Reverting task status." "ERROR"
                    $postCheck = Get-Content $TASKS_FILE -Raw
                    $revert = $postCheck -replace '\[\/\] .* \(正在执行...\)', "- [ ] $taskDesc"
                    Set-Content $TASKS_FILE $revert -Encoding UTF8
                    Invoke-Sync "revert: execution failure"
                    break
                }
            } else { 
                Write-Log "Batch queue cleared." "SUCCESS"
                break 
            }
        }
    } catch {
        # 系统级崩溃的深度捕获
        $errMsg = $_.Exception.Message
        $stackTrace = $_.ScriptStackTrace
        Write-Log "Critical Fault: $errMsg. Check $ERROR_LOG_FILE" "ERROR"
        
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        $sysErrorDump = @"
[$timestamp] [SYS_CRITICAL]
Message: $errMsg
StackTrace: 
$stackTrace
--------------------------------------------------
"@
        Add-Content -Path $ERROR_LOG_FILE -Value $sysErrorDump -Encoding UTF8
        Start-Sleep -Seconds 60
    }
    
    for ($i = $CHECK_INTERVAL; $i -gt 0; $i--) {
        Clear-Host
        Write-Host ">>> OMNI-FLOW STANDBY | HEARTBEAT: $i s | LOCAL DOCKER ENGINE" -ForegroundColor DarkGray
        Start-Sleep -Seconds 1
    }
}