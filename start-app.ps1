# Start both Backend (FastAPI on port 8085) and Frontend (Vite on port 5173)
Write-Host "Starting AutiCompanion AI Backend on http://localhost:8085 ..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; python -m uvicorn main:app --host 127.0.0.1 --port 8085 --reload"

Write-Host "Starting AutiCompanion AI Frontend on http://localhost:5173 ..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; npm run dev"

Write-Host "Opening http://localhost:5173 in your browser..." -ForegroundColor Yellow
Start-Sleep -Seconds 2
Start-Process "http://localhost:5173"
