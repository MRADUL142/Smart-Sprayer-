#!/usr/bin/env pwsh
# Smart Sprayer Application Launcher for PowerShell
# This script handles port cleanup and starts the application

Write-Host "============================================================"
Write-Host "Smart Sprayer - Plant Disease Detection System"
Write-Host "============================================================"
Write-Host ""

# Check if Python is available
try {
    python --version | Out-Null
} catch {
    Write-Host "[ERROR] Python not found. Please activate the virtual environment first." -ForegroundColor Red
    Write-Host ""
    Write-Host "Run: .\.venv\Scripts\Activate.ps1"
    exit 1
}

# Start the application launcher
python start_app.py

if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Failed to start application" -ForegroundColor Red
    exit 1
}

exit 0
