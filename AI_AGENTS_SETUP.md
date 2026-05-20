# AI Agents Setup Guide

## Overview
Your CodePilot application now supports **two AI providers** for running intelligent agents:

1. **Google Gemini** (Recommended) - FREE tier available
2. **Claude API** (Optional) - Anthropic's advanced model

## Getting Started

### Option 1: Google Gemini (FREE - Recommended)

**Step 1: Get your API Key**
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the API key

**Step 2: Update .env file**
Open `backend/.env` and replace:
```env
GEMINI_API_KEY=paste-your-api-key-here
```

**Step 3: Restart Backend**
```powershell
cd backend
npm start
```

### Option 2: Claude API (Anthropic)

**Step 1: Get your API Key**
1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Sign up or login
3. Navigate to API keys and create a new one
4. Copy the API key

**Step 2: Update .env file**
Open `backend/.env` and replace:
```env
ANTHROPIC_API_KEY=paste-your-api-key-here
```

**Step 3: Restart Backend**
```powershell
cd backend
npm start
```

## Using the Agents

### Available Agents
1. **Requirements Analyst** - Generate specs, user stories, architecture
2. **Code Generator** - Generate full-stack code and configs
3. **Code Reviewer** - Review code quality and best practices
4. **Security Scanner** - Find vulnerabilities and security issues
5. **Test Generator** - Create unit, integration, and e2e tests
6. **Documentation Writer** - Generate README, API docs
7. **Deployment Engineer** - Create Docker, K8s, CI/CD configs
8. **Performance Optimizer** - Analyze and optimize performance

### API Endpoint

**List all agents:**
```bash
curl http://localhost:5000/api/agents
```

**Run an agent:**
```bash
curl -X POST http://localhost:5000/api/agents/run \
  -H "Content-Type: application/json" \
  -d '{
    "agentType": "code_review",
    "input": "Your code or request here"
  }'
```

## Troubleshooting

### "No AI provider configured" error
- Make sure you've set either `GEMINI_API_KEY` or `ANTHROPIC_API_KEY` in your `.env` file
- Restart the backend after updating `.env`
- Check that the API key is correct (no extra spaces)

### API Key Invalid error
- Double-check the API key is copied correctly
- Make sure there are no spaces or special characters
- For Gemini: API key should start with `AI...` or similar
- For Claude: API key should start with `sk-ant-`

### Rate Limiting
- Google Gemini Free tier: 60 requests per minute
- Claude API: Check Anthropic's rate limits based on your plan

## Features

Each agent is designed with specific prompts to deliver:
- **Structured Output** - Clear sections and formatting
- **Production Quality** - Real code, not placeholders
- **Best Practices** - Following industry standards
- **Comprehensive Coverage** - All aspects of the task

## Support

If agents aren't working:
1. Check the console logs for specific errors
2. Verify API key is set correctly
3. Try the other provider if one fails
4. Check API usage and rate limits on your provider dashboard

---

**Next Steps:**
1. Get an API key (Gemini or Claude)
2. Update your `.env` file
3. Restart the backend
4. Try running an agent from the UI or API
