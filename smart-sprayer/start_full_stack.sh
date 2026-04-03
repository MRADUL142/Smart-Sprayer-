#!/bin/bash

# Smart Sprayer 3D - Start Both Backend and Frontend

echo "========================================"
echo "Smart Sprayer 3D - Full Stack Startup"
echo "========================================"
echo ""

# Check if backend is already running
if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null ; then
    echo "Backend already running on port 8000"
else
    echo "Starting FastAPI Backend..."
    python main.py &
    sleep 3
fi

# Check if Node is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js not found. Please install Node.js first."
    echo "Download from: https://nodejs.org/"
    exit 1
fi

# Navigate to frontend folder
if [ -d "frontend" ]; then
    cd frontend
    
    # Check if node_modules exists
    if [ ! -d "node_modules" ]; then
        echo "Installing npm dependencies..."
        npm install
    fi
    
    echo ""
    echo "Starting React Frontend..."
    echo "Opening http://localhost:3000 in 5 seconds..."
    sleep 5
    
    npm start
else
    echo "ERROR: frontend directory not found!"
    exit 1
fi
