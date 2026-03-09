# SolKnow Autonomous Pulse Runner (V15.2 - HUD-FIX / CONTEXT-LINKED)
# Usage: powershell -ExecutionPolicy Bypass -File infinite_runner.ps1

if ($IsWindows) { 
    chcp 65001 | Out-Null
    [Console]::OutputEncoding = [System.Text.Encoding]::UTF8 
}

# --- 1. CONFIGURATION ---
$global:CFG_LOG = "AUTOMATION_LOG.md"
$global:CFG_TASKS = "TASKS.md"
$global:CFG_INTERVAL = 60

# --- 2. BASE64 PROTECTED LABELS ---
function Get-SafeLabel([string]$b64) {
    return [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($b64))
}
$global:LBL_GOAL = Get-SafeLabel "IyMg5oC75Lu75Yqh"
$global:LBL_TODO = Get-SafeLabel "IyMg5b6F5Yqe5a2Q5Lu75Yqh"
$global:LBL_DONE = Get-SafeLabel "IyMg5bey5a6M5oiQ5Lu75Yqh"
$global:STR_EXEC = Get-SafeLabel "ICjmraPlnKjmiafooYwuLi4p"
$global:UI_GOAL = Get-SafeLabel "WyMg5oC755uu5qCHXQ=="
$global:UI_TODO = Get-SafeLabel "Wysg5b6F5Yqe5Lu75YqhXQ=="
$global:UI_ACTIVE = Get-SafeLabel "Wz4g5q2j5Zyo5omn6KGMXQ=="
$global:UI_HISTORY = Get-SafeLabel "W09LIOW3suWujOaIkF0="

# --- 3. CONTEXT GATHERER ---
function Get-StrategicContext {
    if (-not (Test-Path $global:CFG_TASKS)) { return "No TASKS.md" }
    $c = Get-Content $global:CFG_TASKS -Raw
    $goalPat = [regex]::Escape($global:LBL_GOAL) + '(?s)(.*?)(?=' + [regex]::Escape($global:LBL_TODO) + '|$)'
    $donePat = [regex]::Escape($global:LBL_DONE) + '(?s)(.*)'
    $mainGoal = if ($c -match $goalPat) { $matches[1].Trim() } else { "No goal." }
    $history = if ($c -match $donePat) { $matches[1].Trim() } else { "No history." }
    $docs = (Get-ChildItem -Path "docs" -Directory | ForEach-Object { $_.Name }) -join ", "
    return "CORE GOAL:`n" + $mainGoal + "`n`nRECENT DONE:`n" + (($history -split "`n" | Select-Object -First 10) -join "`n") + "`n`nDOCS STRUCTURE:`n" + $docs
}

# --- 4. DASHBOARD RENDERER ---
function Show-Dashboard($stage="IDLE", $activeTask="") {
    if (-not (Test-Path $global:CFG_TASKS)) { return }
    $content = Get-Content $global:CFG_TASKS -Raw
    $goalPat = [regex]::Escape($global:LBL_GOAL) + '(?s)(.*?)(?=' + [regex]::Escape($global:LBL_TODO) + '|$)'
    $todoPat = [regex]::Escape($global:LBL_TODO) + '(?s)(.*?)(?=' + [regex]::Escape($global:LBL_DONE) + '|$)'
    $donePat = [regex]::Escape($global:LBL_DONE) + '(?s)(.*)'
    $goalText = if ($content -match $goalPat) { $matches[1].Trim() } else { "---" }
    $todoText = if ($content -match $todoPat) { $matches[1].Trim() } else { "Empty" }
    $doneText = if ($content -match $donePat) { $matches[1].Trim() } else { "None" }
    Clear-Host
    Write-Host " ____________________________________________________________________________________" -ForegroundColor Cyan
    Write-Host (" [ SOLKNOW HUD V15.2 ] | STAGE: " + $stage) -ForegroundColor Cyan
    Write-Host " ------------------------------------------------------------------------------------" -ForegroundColor Cyan
    Write-Host (" " + $global:UI_GOAL) -ForegroundColor Yellow
    Write-Host ("   " + $goalText) -ForegroundColor Gray
    Write-Host ""
    Write-Host (" " + $global:UI_TODO + " (Top 3)") -ForegroundColor Magenta
    $todoLines = $todoText -split "`n" | Where-Object { $_ -match '- \[ \]' } | Select-Object -First 3
    foreach ($l in $todoLines) { Write-Host ("   " + $l.Trim()) -ForegroundColor Gray }
    Write-Host ""
    Write-Host (" " + $global:UI_ACTIVE) -ForegroundColor White -BackgroundColor DarkBlue
    if ($activeTask) { Write-Host ("   >> " + $activeTask) -ForegroundColor White -BackgroundColor Blue }
    else { Write-Host "   (Pending Action...)" -ForegroundColor Gray }
    Write-Host ""
    Write-Host (" " + $global:UI_HISTORY) -ForegroundColor Green
    $doneLines = $doneText -split "`n" | Where-Object { $_ -match '- \[x\]' } | Select-Object -First 3
    foreach ($l in $doneLines) { Write-Host ("   " + $l.Trim()) -ForegroundColor Gray }
    Write-Host " ____________________________________________________________________________________" -ForegroundColor Cyan
}

# --- 5. ENGINE CORE ---
function Repair-TaskStructure {
    if (-not (Test-Path $global:CFG_TASKS)) { return }
    $c = Get-Content $global:CFG_TASKS -Raw
    $changed = $false
    # Check Goal Header
    if ($c -notmatch [regex]::Escape($global:LBL_GOAL)) {
        $c = $global:LBL_GOAL + "`n" + $c; $changed = $true
    }
    # Check Todo Header
    if ($c -notmatch [regex]::Escape($global:LBL_TODO)) {
        if ($c -match [regex]::Escape($global:LBL_DONE)) {
            $c = $c -replace ([regex]::Escape($global:LBL_DONE)), ($global:LBL_TODO + "`n`n" + $global:LBL_DONE)
        } else { $c += "`n`n" + $global:LBL_TODO }; $changed = $true
    }
    # Check Done Header
    if ($c -notmatch [regex]::Escape($global:LBL_DONE)) {
        $c += "`n`n" + $global:LBL_DONE; $changed = $true
    }
    if ($changed) {
        Set-Content $global:CFG_TASKS $c.Trim() -Encoding UTF8
        Write-Log "HEALED: Task structure restored."
    }
}

function Organize-Tasks {
    $content = Get-Content $global:CFG_TASKS -Raw
    $pGoal = [regex]::Escape($global:LBL_GOAL)
    $pTodo = [regex]::Escape($global:LBL_TODO)
    $pDone = [regex]::Escape($global:LBL_DONE)
    if ($content -match "(?s)($pGoal.*?$pTodo)(.*?)($pDone.*)") {
        $headerPart = $matches[1]; $todoPart = $matches[2]; $donePart = $matches[3]
        $todoLines = $todoPart -split "`n"
        $newTodo = @(); $justFinished = @()
        foreach ($l in $todoLines) {
            if ($l -match '^\s*- \[x\]') { $justFinished += $l }
            elseif (-not [string]::IsNullOrWhiteSpace($l)) { $newTodo += $l }
        }
        if ($justFinished.Count -gt 0) {
            $doneLines = $donePart -split "`n" | Where-Object { $_ -match '\S' }
            $final = $headerPart.Trim() + "`n" + ($newTodo -join "`n").Trim() + "`n`n" + $global:LBL_DONE + "`n" + ($justFinished -join "`n").Trim() + "`n" + ($doneLines[1..($doneLines.Count-1)] -join "`n").Trim()
            Set-Content $global:CFG_TASKS $final.Trim() -Encoding UTF8
            return $true
        }
    }
    return $false
}

function Write-Log($message) {
    $time = Get-Date -Format 'HH:mm:ss'
    Add-Content -Path $global:CFG_LOG -Value ("[" + $time + "] " + $message) -Encoding UTF8 -ErrorAction SilentlyContinue
}

# --- 6. MAIN LOOP ---
while($true) {
    try {
        Repair-TaskStructure
        Show-Dashboard "SYNCING"
        git pull origin main --rebase --autostash | Out-Null
        while($true) {
            Repair-TaskStructure
            $content = Get-Content $global:CFG_TASKS -Raw
            $todoPattern = [regex]::Escape($global:LBL_TODO) + '(?s)(.*?)(?=' + [regex]::Escape($global:LBL_DONE) + '|$)'
            $todoMatch = if ($content -match $todoPattern) { $matches[1] } else { "" }
            if ($todoMatch -notmatch '- \[ \]') {
                Show-Dashboard "PLANNING"
                $ctx = Get-StrategicContext
                $planPrompt = @"
ROLE: Senior Architect & Math Educator & Algorithm Master
MISSION: Decompose the 'CORE GOAL' into 3-5 sub-tasks.
STRICT FORMAT REQUIREMENTS:
1. Format: '- [ ] Task Description (YYYY-MM-DD)'.
2. Output: Exactly one task per line. No extra lines. No introduction. No headers.
3. Content: Follow 'SolKnow' pedagogical structure (Theory -> Examples -> Exercises).
4. Logic: Ensure continuity with 'RECENT DONE'.
CONTEXT:
$ctx
ACTION: Provide ONLY the task list as requested.
"@
                $newTasksRaw = & gemini -y -p $planPrompt
                # Clean up AI output to ensure only task lines are kept
                $newTasks = ($newTasksRaw -split "`n" | Where-Object { $_ -match '^\s*- \[ \]' }) -join "`n"
                $content = Get-Content $global:CFG_TASKS -Raw
                $insertPoint = [regex]::Escape($global:LBL_TODO)
                Set-Content $global:CFG_TASKS ($content -replace $insertPoint, ($global:LBL_TODO + "`n" + $newTasks.Trim())) -Encoding UTF8
                $content = Get-Content $global:CFG_TASKS -Raw; $todoMatch = if ($content -match $todoPattern) { $matches[1] } else { "" }
            }
            if ($todoMatch -match '(?m)^\s*- \[ \] (.*)') {
                $taskDesc = $matches[1].Trim()
                Show-Dashboard "EXECUTING" $taskDesc
                $lockLine = "- [ ] " + [regex]::Escape($taskDesc)
                $lockRepl = "[/] " + $taskDesc + " " + $global:STR_EXEC
                $content = Get-Content $global:CFG_TASKS -Raw
                Set-Content $global:CFG_TASKS ($content -replace $lockLine, $lockRepl) -Encoding UTF8
                
                $execPrompt = @"
ROLE: Senior Professor & Technical Writer
TASK: $taskDesc
SCOPE: Execute ONLY this specific sub-task.
STANDARDS:
1. Quality: Rigorous definitions and formal proofs.
2. Math: Perfect LaTeX ($...$ or $$...$$).
3. Interaction: Use <details><summary>Check Solution</summary>...</details> for exercises.
4. Aesthetic: lucide-react icons & framer-motion.
ACTION: Implement fully and mark as '- [x]' in TASKS.md.
"@
                & gemini -y -p $execPrompt
                Organize-Tasks | Out-Null
                Write-Log ("Completed: " + $taskDesc)
                git add .
                git commit -m ("feat: " + $taskDesc) -n
                git pull origin main --rebase --autostash
                git push origin main
            } else { break }
        }
    } catch { Start-Sleep -Seconds 10 }
    for ($i = $global:CFG_INTERVAL; $i -gt 0; $i--) {
        Show-Dashboard ("STANDBY " + $i + "s")
        Start-Sleep -Seconds 1
    }
}
