# Smart Sprayer - Complete Setup Guide

## Issue: Site runs but image processing doesn't work

**Root Cause**: The backend API server is NOT accessible to the frontend.

---

## 🔧 Setup Instructions

### **Option 1: Local Development (Desktop)**

#### Step 1: Start Backend Server
```bash
cd smart-sprayer
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

pip install -r requirements.txt

# Seed database with sample data
python seed.py

# Start backend on port 8000
python main.py
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
```

#### Step 2: Start Frontend (in another terminal)
```bash
cd smart-sprayer/frontend

npm install
npm start
```

Frontend runs on `http://localhost:3000`

---

### **Option 2: Deploy to Production**

Your **Netlify frontend** needs to connect to a backend server. Choose one:

#### **2A: Deploy Backend to Railway (Recommended)**

1. Go to https://railway.app
2. Create new project → Deploy from GitHub
3. Select your Smart-Sprayer repository
4. Set environment:
   - **Root directory**: `smart-sprayer`
   - **Build command**: `pip install -r requirements.txt && python seed.py`
   - **Start command**: `python main.py`
5. Get your deployed URL (e.g., `https://smart-sprayer-prod.railway.app`)

#### **2B: Deploy to Heroku**

```bash
cd smart-sprayer

# Create Procfile
echo "web: python main.py" > Procfile

# Git commands
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

#### **2C: Deploy to AWS Lambda (Advanced)**

Use Zappa or AWS SAM for FastAPI deployment

---

### **Step 3: Configure Frontend for Production**

#### On Netlify, set environment variable:

1. Go to **Site settings → Build & deploy → Environment**
2. Add environment variable:
   ```
   REACT_APP_API_URL=https://your-backend-server.com/api
   ```
   
   Example:
   ```
   REACT_APP_API_URL=https://smart-sprayer-prod.railway.app/api
   ```

3. Trigger a redeploy

---

## 🧪 Testing the Connection

After setup, test:

1. **Check backend is running:**
   ```bash
   curl http://localhost:8000/api/pesticides
   # or
   curl https://your-backend-server.com/api/pesticides
   ```

   Should return a JSON list.

2. **Check frontend logs in browser:**
   - Open DevTools (F12)
   - Go to **Console**
   - Upload an image
   - Look for logs showing:
     - `Uploading image to: http://localhost:8000/api/detect-disease`
     - `Disease detection response: {...}`

3. **If you see errors like:**
   - `Backend server not responding...` → Backend is not running
   - `Network Error` → Backend URL is wrong
   - `CORS error` → Backend CORS not configured (should be fixed)

---

## 📊 Current Implementation

- **Disease Detection**: Uses placeholder (returns random disease)
- **Database**: SQLite with sample diseases & pesticides
- **Real ML Model**: Not implemented yet

To add real ML:
```python
# Replace detect_disease() in app/utils/image_processing.py
# with actual model inference (TensorFlow, PyTorch, etc.)
```

---

## 🚀 Quick Command Reference

### Local Development
```bash
# Terminal 1: Backend
cd smart-sprayer && python main.py

# Terminal 2: Frontend
cd smart-sprayer/frontend && npm start
```

### Production
```bash
# Prepare for deployment
git add .
git commit -m "Update Smart Sprayer setup"
git push origin main
```

Netlify auto-deploys frontend. Backend needs separate deployment to Railway/Heroku/AWS.

---

## ✅ Checklist

- [ ] Backend deployed to Railway/Heroku/AWS
- [ ] `REACT_APP_API_URL` set on Netlify
- [ ] Netlify deployed frontend
- [ ] Browser console shows successful API calls
- [ ] Image upload works without errors

