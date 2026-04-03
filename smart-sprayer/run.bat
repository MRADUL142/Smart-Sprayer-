@echo off
REM Smart Sprayer Application Launcher for Windows
REM This script handles port cleanup and starts the application

echo ============================================================
echo Smart Sprayer - Plant Disease Detection System
echo ============================================================

REM Check if virtual environment is activated
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python not found. Please activate the virtual environment first.
    echo.
    echo Run: .venv\Scripts\activate.bat
    exit /b 1
)

REM Start the application launcher
python start_app.py

if errorlevel 1 (
    echo [ERROR] Failed to start application
    exit /b 1
)

exit /b 0
