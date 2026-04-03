# Installation & Setup Guide - Smart Sprayer 3D

This guide will walk you through setting up and running the complete Smart Sprayer 3D application.

## Prerequisites

Before you start, ensure you have the following installed:

- **Python 3.8+** - [Download](https://www.python.org/downloads/)
- **Node.js 16+** - [Download](https://nodejs.org/)
- **Git** (optional) - [Download](https://git-scm.com/)

### Verify Installation

**Windows:**
```bash
python --version
node --version
npm --version
```

**macOS/Linux:**
```bash
python3 --version
node --version
npm --version
```

## Installation Steps

### 1. Clone or Extract Project

```bash
# If using git
git clone <repository>
cd smart-sprayer

# Or extract the ZIP file
cd smart-sprayer
```

### 2. Setup Backend (FastAPI)

```bash
# Navigate to project root
cd smart-sprayer

# Create virtual environment
python -m venv .venv

# Activate virtual environment
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Seed database with sample data
python seed.py

# Verify backend setup
python -m start_app &
# Check http://localhost:8000/docs in browser
```

### 3. Setup Frontend (React)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Verify frontend setup
npm start
# Should open http://localhost:3000 automatically
```

## Running the Application

### Option 1: Full Stack (Recommended)

Run everything with a single command:

**Windows:**
```bash
start_full_stack.bat
```

**macOS/Linux:**
```bash
bash start_full_stack.sh
```

This will:
1. ✅ Start the FastAPI backend (if not running)
2. ✅ Install frontend dependencies (if needed)
3. ✅ Start the React development server
4. ✅ Open the application in your browser

### Option 2: Run Backend and Frontend Separately

**Terminal 1 - Backend:**
```bash
python start_app.py
# Backend runs at http://localhost:8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
# Frontend runs at http://localhost:3000
```

## First Time Usage

1. **Navigate to** http://localhost:3000
2. **You'll see:**
   - 3D plant visualization on the left
   - Upload panel on the right
   - Control panel with spray button
   - Recommendations panel

3. **Upload a plant image:**
   - Click "Select Image" or drag-drop a file
   - Wait for disease detection
   - View results and recommendations

4. **Test the 3D features:**
   - Drag the plant to rotate it
   - Scroll to zoom in/out
   - Click "Start Spraying" to see the spray simulation

## Configuration

### API Connection
If running backend on a different URL, edit `frontend/.env`:

```env
REACT_APP_API_URL=http://your-backend-url:8000/api
```

### Backend Port
To use a different port, edit `main.py`:

```python
if __name__ == "__main__":
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=3001,  # Change this
    )
```

## Common Issues & Solutions

### Port Already in Use
```bash
# Find process using port
# Windows:
netstat -ano | findstr :8000

# macOS/Linux:
lsof -i :8000

# Kill the process (get PID from above)
# Windows:
taskkill /PID <PID> /F

# macOS/Linux:
kill -9 <PID>
```

### Python Virtual Environment Issues

**On Windows:**
```bash
# Deactivate current env
deactivate

# Remove venv
rmdir /s /q .venv

# Create new one
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

**On macOS/Linux:**
```bash
# Deactivate current env
deactivate

# Remove venv
rm -rf .venv

# Create new one
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### NPM Dependencies Issues

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -rf frontend/node_modules
rm frontend/package-lock.json

# Reinstall
cd frontend
npm install
```

### CORS Errors in Browser Console

The backend includes CORS headers, but if you see errors:

1. Check backend is running: http://localhost:8000/docs
2. Check frontend .env has correct API URL
3. Restart both servers
4. Clear browser cache (Ctrl+Shift+Delete)

### 3D Scene Not Rendering

- Check browser DevTools Console for errors
- Ensure WebGL is supported: http://get.webgl.org/
- Try a different browser
- Check GPU has enough VRAM

## Database Reset

To reset the database and start fresh:

```bash
# Delete the database
rm smart_sprayer.db

# Seed new data
python seed.py
```

## Production Deployment

### Build Frontend Production Bundle

```bash
cd frontend
npm run build
# Creates optimized build in frontend/build/
```

### Deploy Backend

```bash
# Install production server
pip install gunicorn

# Run with gunicorn
gunicorn -w 4 -b 0.0.0.0:8000 "main:app"
```

### Use Environment Variables

Create `.env` file in project root:

```env
DATABASE_URL=sqlite:///./smart_sprayer.db
CORS_ORIGINS=https://yourdomain.com
DEBUG=False
```

## Next Steps

1. ✅ Explore the UI and 3D visualization
2. ✅ Upload test plant images
3. ✅ Check API documentation: http://localhost:8000/docs
4. ✅ Review the code and customize as needed
5. ✅ Read [frontend/README.md](frontend/README.md) for frontend-specific documentation

## Need Help?

- 📖 Check [README.md](README.md) for overview
- 🔍 Check [frontend/README.md](frontend/README.md) for frontend docs
- 🐛 Check browser console for error messages
- 📚 Review FastAPI docs: http://localhost:8000/docs

## File Ownership & Permissions

If you encounter permission issues on macOS/Linux:

```bash
# Make scripts executable
chmod +x start_full_stack.sh
chmod +x start_app.py
chmod +x seed.py
```

---

**Happy spraying! 🌱🌧️**
