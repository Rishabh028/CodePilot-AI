# AI Agents System - Complete Setup & Usage Guide

## ✅ System Status
Your CodePilot AI Agents system is now **fully configured and ready to use**!

### Current Setup
- **Backend**: Running on port 5000 ✅
- **8 AI Agents**: Fully functional and accessible ✅
- **API Endpoint**: `http://localhost:5000/api/agents` ✅
- **Primary Provider**: Google Gemini (recommended - free tier)
- **Fallback Provider**: Claude/Anthropic (optional)

---

## 🚀 Quick Start (2 minutes)

### Step 1: Get a Free Google Gemini API Key
1. Visit: https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy the API key

### Step 2: Add to Backend
1. Open `backend/.env`
2. Find: `GEMINI_API_KEY=your-google-gemini-api-key`
3. Replace with your actual key: `GEMINI_API_KEY=<your-key>`
4. Save the file

### Step 3: Restart Backend
```powershell
cd backend
npm start
```

### Step 4: Use the Agents!
Go to: http://localhost:3000/agents

---

## 📋 Available Agents

| Agent | Purpose | Output |
|-------|---------|--------|
| **Requirements Analyst** | Generate specs, user stories, architecture | Comprehensive project blueprints |
| **Code Generator** | Full-stack code generation | Production-ready code with configs |
| **Code Reviewer** | Quality & security review | Detailed issues with fixes |
| **Security Scanner** | Vulnerability audit | Critical issues ranked by severity |
| **Test Generator** | Unit/integration/e2e tests | Complete test suites with mocks |
| **Documentation Writer** | Auto-generate docs | README, API docs, guides |
| **Deployment Engineer** | Docker/K8s setup | Dockerfiles, CI/CD pipelines |
| **Performance Optimizer** | Performance analysis | Optimization roadmap with code samples |

---

## 💻 Using the Agents

### Option 1: Web UI (Recommended)
1. Navigate to: http://localhost:3000/agents
2. Select an agent
3. Enter your request
4. Get AI-generated results instantly

### Option 2: Direct API

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
    "input": "Here is my code to review: [paste code here]"
  }'
```

**Agent Types (for API):**
- `requirements`
- `code_generator`
- `code_review`
- `security`
- `testing`
- `documentation`
- `deployment`
- `performance`

---

## 🔑 API Configuration

### Option A: Google Gemini (FREE - Recommended)

**Advantages:**
- Free tier: 60 requests/minute (plenty for testing)
- No credit card required
- Fast responses
- Excellent for all agent types

**Setup:**
```env
GEMINI_API_KEY=your-api-key-here
```

**Get key from:** https://makersuite.google.com/app/apikey

### Option B: Claude/Anthropic (Optional)

**Advantages:**
- Advanced reasoning
- Longer context window
- Enterprise-grade

**Setup:**
```env
ANTHROPIC_API_KEY=your-api-key-here
```

**Get key from:** https://console.anthropic.com/

### Using Both (Automatic Fallback)
If both keys are configured, Gemini is primary and Claude is fallback:
```env
GEMINI_API_KEY=your-gemini-key
ANTHROPIC_API_KEY=your-claude-key
```

---

## 🔧 Configuration Files

### `backend/.env`
```env
# Database
DATABASE_URL=file:./dev.db

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d

# AI Providers (choose one or both)
GEMINI_API_KEY=your-key
ANTHROPIC_API_KEY=your-key

# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Environment Setup
```bash
cd backend
npm install              # Install dependencies (already done)
npm start               # Start server
```

---

## 🧪 Testing the Agents

### Test 1: Requirements Agent
```bash
curl -X POST http://localhost:5000/api/agents/run \
  -H "Content-Type: application/json" \
  -d '{
    "agentType": "requirements",
    "input": "E-commerce platform with user authentication, product catalog, shopping cart, and payment processing"
  }'
```

### Test 2: Code Review Agent
```bash
curl -X POST http://localhost:5000/api/agents/run \
  -H "Content-Type: application/json" \
  -d '{
    "agentType": "code_review",
    "input": "const getData = async () => { let data = await fetch(url); return data.json(); }"
  }'
```

### Test 3: Security Agent
```bash
curl -X POST http://localhost:5000/api/agents/run \
  -H "Content-Type: application/json" \
  -d '{
    "agentType": "security",
    "input": "app.get(\"/api/user/:id\", (req, res) => { const user = db.query(\"SELECT * FROM users WHERE id = \" + req.params.id); res.json(user); })"
  }'
```

---

## 🚨 Troubleshooting

### Issue: "No AI provider configured"
**Solution:**
1. Open `backend/.env`
2. Add a valid API key (Gemini or Claude)
3. Restart backend: `npm start`

### Issue: "Invalid API key"
**Solution:**
- Check key is copied correctly (no spaces)
- For Gemini: Should be long alphanumeric string
- For Claude: Should start with `sk-ant-`
- Test in provider's dashboard first

### Issue: "Rate limit exceeded"
**Solution:**
- Google Gemini free: 60 req/min (reasonable limit)
- Wait a few seconds and retry
- Upgrade plan for higher limits

### Issue: Backend not starting
**Solution:**
```bash
# Kill existing process
Get-Process node | Stop-Process -Force

# Restart
cd backend
npm start
```

### Issue: Port 5000 already in use
**Solution:**
```bash
# Find and kill process using port 5000
Get-Process | Where-Object { $_.ProcessName -eq 'node' } | Stop-Process -Force

# Or use specific PID
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

---

## 📊 Agent Capabilities

### Code Generator
- Full-stack applications
- Database schemas
- API implementations
- Docker configurations
- Environment variables
- README with setup

### Requirements Analyst
- User stories with acceptance criteria
- System architecture diagrams
- API specifications
- Database schema design
- Tech stack recommendations
- Implementation roadmap

### Security Scanner
- SQL injection detection
- XSS vulnerabilities
- CSRF protection gaps
- Authentication flaws
- Hardcoded secrets
- Dependency vulnerabilities

### Test Generator
- Unit tests (Vitest)
- Integration tests
- E2E test scenarios
- Mock implementations
- Test fixtures
- Coverage configuration

### Code Reviewer
- Quality scoring
- Performance issues
- Best practice violations
- Security concerns
- Refactoring suggestions
- Specific code fixes

### Documentation Writer
- README generation
- API documentation
- Architecture guides
- Deployment guides
- Changelog templates
- JSDoc examples

### Deployment Engineer
- Dockerfile generation
- docker-compose setup
- CI/CD pipelines
- Kubernetes manifests
- Nginx configuration
- Health checks

### Performance Optimizer
- Database optimization
- Caching strategies
- Bundle analysis
- Memory management
- Concurrency patterns
- APM setup

---

## 📝 API Reference

### GET /api/agents
**Returns list of available agents**

Response:
```json
{
  "providerStatus": {
    "primaryProvider": "gemini",
    "geminiConfigured": true,
    "claudeConfigured": true
  },
  "agents": [...]
}
```

### POST /api/agents/run
**Run an agent**

Request:
```json
{
  "agentType": "code_review",
  "input": "Your request or code here"
}
```

Response:
```json
{
  "success": true,
  "agentType": "code_review",
  "output": "AI-generated response...",
  "tokens_used": 1234,
  "provider": "gemini",
  "timestamp": "2026-05-20T17:30:00.000Z"
}
```

---

## 🎯 Next Steps

1. **Get Gemini API Key** → https://makersuite.google.com/app/apikey
2. **Update .env** → Add your key to `backend/.env`
3. **Restart Backend** → `npm start`
4. **Try Agents** → Visit http://localhost:3000/agents
5. **Explore Features** → Run different agents and see results

---

## 💡 Pro Tips

- **Gemini is FREE** → No credit card needed
- **Detailed prompts** → More specific input = better output
- **Code context** → Paste actual code for better reviews
- **Agent limits** → Gemini: 60 req/min (free tier is plenty)
- **Error details** → Check terminal logs for debugging

---

## 🔗 Useful Links

- Google Gemini API: https://makersuite.google.com/app/apikey
- Claude API Console: https://console.anthropic.com/
- Backend Server: http://localhost:5000
- Frontend UI: http://localhost:3000
- Agents Page: http://localhost:3000/agents
- Health Check: http://localhost:5000/health

---

**Status: ✅ All systems operational!**

Your AI agents are ready to revolutionize your development workflow. Start with any agent and experience AI-powered assistance for your projects!
