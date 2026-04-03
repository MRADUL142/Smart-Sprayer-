# Smart Sprayer - Backend Deployment Guide

## Quick Deploy Options

### Option 1: Railway (Recommended - Easiest) ⭐

1. Go to https://railway.app
2. Click **"New Project"** → **"Deploy from GitHub"**
3. Select `Smart-Sprayer-` repository
4. Railway auto-detects Python and deploys automatically
5. Your backend URL will appear in the dashboard

**Why Railway?**
- ✅ Auto-detects Python/requirements.txt
- ✅ Automatic deployments on git push
- ✅ Free tier available
- ✅ Simple configuration

---

### Option 2: Render.com (Manual Setup Required)

If Render isn't working automatically, follow these **exact steps**:

#### Step 1: Delete Old Failed Deployment
- Go to https://app.render.com
- Find your old "smart-sprayer-api" service
- Click **Settings** → **Delete Web Service**

#### Step 2: Create New Web Service
1. Click **New +** → **Web Service**
2. Connect your GitHub: `Smart-Sprayer-` repository
3. Configure:
   - **Name**: `smart-sprayer-api`
   - **Environment**: `Python`
   - **Region**: `Oregon` (or closest)
   - **Build Command**: `pip install -r requirements.txt && python seed.py`
   - **Start Command**: `python main.py`
   - **Root Directory**: `smart-sprayer`
4. Click **Create Web Service**

#### Step 3: Set Environment Variables
- In your service dashboard, go to **Environment**
- No additional variables needed for basic setup

#### Step 4: Wait for Deployment
- Click **Logs** tab
- Watch for:
  ```
  INFO:     Uvicorn running on http://0.0.0.0:8000
  ```

---

### Option 3: Heroku (Requires Payment Now)

```bash
git push heroku main
```

---

## Test Your Backend

Once deployed, test the backend URL (from your deployment dashboard):

```bash
# Replace with your actual backend URL
curl https://your-backend-name.railway.app/api/pesticides
curl https://your-backend-name.railway.app/health
```

Should return:
```json
[{"id":1,"name":"Copper Fungicide",...}]
{"status":"ok","message":"Smart Sprayer API is running"}
```

---

## Connect Frontend to Backend

### Set Netlify Environment Variable

1. Go to https://app.netlify.com → Your Site
2. **Site settings** → **Build & deploy** → **Environment**
3. Add environment variable:
   ```
   REACT_APP_API_URL=https://your-backend-name.railway.app/api
   ```
4. **Save** → Netlify auto-redeploys

### Verify Connection

1. Open your Netlify site
2. Press **F12** for Developer Tools
3. Go to **Console** tab
4. Upload an image
5. Look for success logs:
   - ✅ `Uploading image to: https://your-backend-name.railway.app/api/detect-disease`
   - ✅ `Disease detection response: {...}`

---

## Local Development

### Start Backend Locally

```bash
cd smart-sprayer

# Install dependencies
pip install -r requirements.txt

# Seed database
python seed.py

# Start backend
python main.py
```

### Start Frontend Locally

In another terminal:
```bash
cd smart-sprayer/frontend
npm install
npm start
```

Access at: http://localhost:3000

---

## Deployment Checklist

- [ ] Backend deployed (Railway/Render/Heroku)
- [ ] Get backend public URL from dashboard
- [ ] Set `REACT_APP_API_URL` on Netlify
- [ ] Netlify frontend redeployed
- [ ] Test image upload works
- [ ] Check browser console for success logs

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **Backend not responding** | Check if it's actually running in your dashboard logs |
| **CORS errors** | CORS is enabled in backend - no changes needed |
| **DB connection failed** | Backend must have write access - check logs |
| **Render still runs Node.js** | Delete service & create new one with Python env |
| **Image upload hangs** | Check `REACT_APP_API_URL` is set correctly on Netlify |

---

## Important

- ⚠️ **Don't close the local backend terminal** - it needs to stay running
- ⚠️ **Disease detection is placeholder** - returns random diseases (not ML-powered yet)
- ⚠️ **Free tier may sleep** - Railway/Render free services may go idle if unused

