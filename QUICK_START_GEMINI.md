# Quick Start: Get FREE Gemini API Key in 2 Minutes

## Step 1: Go to Google AI Studio (30 seconds)
Visit: https://makersuite.google.com/app/apikey

## Step 2: Create API Key (1 minute)
- Click the blue "Create API Key" button
- Select "Create new API key in new project" 
- Wait a moment for it to generate
- Click "Copy" to copy your API key

## Step 3: Add to Your Project (30 seconds)

### Option A: Direct Edit
1. Open `backend/.env` in VS Code
2. Find the line: `GEMINI_API_KEY=your-google-gemini-api-key`
3. Replace it with: `GEMINI_API_KEY=<your-copied-key>`
4. Save the file

### Option B: Via Terminal
```powershell
# Windows PowerShell
cd "C:\Users\Rishabh\OneDrive\Desktop\Coding\CodePilot\backend"

# Replace YOUR_KEY_HERE with your actual key
$key = "YOUR_KEY_HERE"
(Get-Content .env) -replace 'GEMINI_API_KEY=.*', "GEMINI_API_KEY=$key" | Set-Content .env
```

## Step 4: Restart Backend
```powershell
cd "C:\Users\Rishabh\OneDrive\Desktop\Coding\CodePilot\backend"
npm start
```

## Step 5: Test It!
Open your browser and go to: http://localhost:3000/agents

Try running an agent!

---

## ✅ You're Done!

Your agents will now work with Google Gemini's powerful AI models.

### Free Tier Limits (More than enough for testing):
- 60 requests per minute
- Unlimited requests per day
- No credit card required

### If You Have Issues:
1. Make sure API key is copied correctly (no spaces)
2. Restart the backend: `npm start`
3. Check that the key is in the right format (starts with a long alphanumeric string)
4. Don't share your API key with anyone!
