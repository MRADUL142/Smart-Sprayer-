# Smart Sprayer - Backend Deployment Guide

## Quick Deploy Options

### Option 1: Railway (Recommended - EASIEST) ⭐⭐⭐

**Best for beginners - works out of the box!**

1. Go to https://railway.app
2. Click **"New Project"** → **"Deploy from GitHub"**
3. Select `Smart-Sprayer-` repository  
4. Railway **auto-detects Python** and deploys automatically
5. Done! Get your URL from the dashboard

**Why Railway?**
- ✅ Auto-detects Python automatically
- ✅ Zero configuration needed
- ✅ Automatic deployments on git push
- ✅ Free tier works great
- ✅ Recommended by community

---

### Option 2: Render.com (Manual Python Setup Required)

⚠️ **IMPORTANT**: Render tries to auto-detect as Node.js. You MUST manually force it to Python.

#### Step 1: **Delete Old Failed Service**
- Go to https://app.render.com/dashboard
- Find **smart-sprayer-api** 
- Click **Settings** (gear icon)
- Scroll to bottom → Click **"Delete Web Service"**
- Confirm deletion

#### Step 2: **Create NEW Web Service - FOLLOW EXACTLY**

1. Click **"New +"** button
2. Select **"Web Service"** (NOT Static Site)
3. Click **"Connect your GitHub account"** (if not already connected)
4. Search for and select **`Smart-Sprayer-`** repository
5. Choose `main` branch

#### Step 3: **Configure Service - CRITICAL SETTINGS**

Fill in EXACTLY as shown:

```
Name:                   smart-sprayer-api
Environment:            Python 3.11          ← MANUALLY SELECT (Override Node.js!)
Region:                 Oregon (or nearest)
Branch:                 main
Root Directory:         smart-sprayer
Build Command:          pip install -r requirements.txt && python seed.py
Start Command:          python main.py
```

**IMPORTANT**: The `Environment` dropdown should say **"Python 3.11"** NOT Node.js!

#### Step 4: Review & Deploy

1. Click **"Create Web Service"**
2. Render starts building
3. Watch **Logs** tab for:
   ```
   pip install -r requirements.txt     ← Installing Python packages
   Database seeded successfully!        ← Database created
   INFO:     Uvicorn running on         ← Server started ✅
   ```

#### Step 5: Get Your Backend URL

- Once deployed, you'll see a URL like:
  ```
  https://smart-sprayer-api.onrender.com
  ```
- This is your backend URL!

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
| **Render shows Node.js instead of Python** | ⚠️ Old service still deploying. Delete service completely, create NEW one, and manually select "Python 3.11" in Environment dropdown (don't let it auto-detect) |
| **Render build command fails** | Make sure Build Command is: `pip install -r requirements.txt && python seed.py` |
| **Image upload hangs** | Check `REACT_APP_API_URL` is set correctly on Netlify |
| **Recommendation** | If Render keeps failing, use Railway instead - it's much simpler! |

---

## Important

- ⚠️ **Don't close the local backend terminal** - it needs to stay running
- ⚠️ **Disease detection is placeholder** - returns random diseases (not ML-powered yet)
- ⚠️ **Free tier may sleep** - Railway/Render free services may go idle if unused

