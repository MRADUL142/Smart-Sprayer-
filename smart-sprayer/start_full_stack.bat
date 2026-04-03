@echo off
REM Smart Sprayer 3D - Start Both Backend and Frontend

echo ========================================
echo Smart Sprayer 3D - Full Stack Startup
echo ========================================
echo.

REM Check if backend is already running
netstat -ano | findstr :8000 >nul
if errorlevel 1 (
    echo Starting FastAPI Backend...
    start "Smart Sprayer Backend" cmd /k python main.py
    timeout /t 3
) else (
    echo Backend already running on port 8000
)

REM Check if Node is installed
where node >nul
if errorlevel 1 (
    echo ERROR: Node.js not found. Please install Node.js first.
    echo Download from: https://nodejs.org/
    exit /b 1
)

REM Navigate to frontend folder
if exist frontend\ (
    cd frontend
    
    REM Check if node_modules exists
    if not exist node_modules\ (
        echo Installing npm dependencies...
        call npm install
    )
    
    echo.
    echo Starting React Frontend...
    echo Opening http://localhost:3000 in 5 seconds...
    timeout /t 5
    
    call npm start
) else (
    echo ERROR: frontend directory not found!
    exit /b 1
)

pause
