# 🚀 CodePilot AI - Your Autonomous AI Software Engineering Team

> An advanced AI-powered platform with 8 specialized agents that automate the entire software development lifecycle, from requirements analysis to production deployment.

![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)
![React](https://img.shields.io/badge/React-18%2B-blue)

## ✨ Features

### 8 Specialized AI Agents

1. **Requirements Analyst** 📋 - Generate comprehensive user stories, API specs, DB schemas, architecture
2. **Code Generator** 🧠 - Generate full-stack production-ready code in multiple languages
3. **Code Reviewer** 🔍 - Perform comprehensive code quality, performance, and security analysis
4. **Security Scanner** 🛡️ - Detect SQL injection, XSS, CSRF, and auto-generate security fixes
5. **Test Generator** 🧪 - Generate unit, integration, E2E tests with 90%+ coverage
6. **Documentation Writer** 📚 - Generate production-quality README, API docs, architecture guides
7. **Deployment Engineer** 🚀 - Generate Dockerfile, docker-compose, Kubernetes manifests, CI/CD
8. **Performance Optimizer** ⚡ - Identify bottlenecks and provide optimization strategies

### Additional Features
- ✅ Real-time output streaming via WebSockets
- ✅ Chat-based agent interface
- ✅ Multi-language code support
- ✅ Production-ready security
- ✅ Scalable architecture

## 🏗️ Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js 5.x
- **Database**: PostgreSQL with Prisma ORM
- **AI Integration**: Anthropic Claude 3.5 Sonnet
- **Real-time**: Socket.io
- **Auth**: JWT + bcryptjs
- **Logging**: Custom structured logger

### Frontend
- **Framework**: React 18 with Vite
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **State Management**: TanStack React Query
- **Animations**: Framer Motion
- **Icons**: Lucide React

### DevOps
- **Containerization**: Docker & Docker Compose
- **CI/CD**: GitHub Actions ready
- **Build Tool**: Vite

## Project Structure

```
CodePilot/
├── frontend/                    # React frontend application
│   ├── src/
│   │   ├── api/               # API client setup
│   │   ├── components/        # React components
│   │   ├── entities/          # Data models
│   │   ├── hooks/             # Custom React hooks
│   │   ├── lib/               # Utilities and context
│   │   ├── pages/             # Page components
│   │   └── utils/             # Helper functions
│   ├── Dockerfile             # Frontend container
│   ├── nginx.conf             # Nginx configuration
│   └── package.json
│
├── backend/                     # Node.js/Express backend
│   ├── src/
│   │   ├── config/            # Configuration files
│   │   ├── controllers/        # Route handlers
│   │   ├── middleware/         # Express middleware
│   │   ├── routes/            # API routes
│   │   ├── services/          # Business logic
│   │   ├── utils/             # Helper functions
│   │   └── index.js           # Entry point
│   ├── prisma/                # Database schema
│   ├── Dockerfile             # Backend container
│   └── package.json
│
├── docker-compose.yml         # Docker orchestration
├── .env.local                 # Environment variables
├── .gitignore                 # Git ignore rules
└── README.md                  # This file
```

## 📋 Prerequisites

- Node.js 18.0.0 or higher
- npm 9.0.0 or higher  
- PostgreSQL 13+ (for database)
- Docker & Docker Compose (optional)
- Anthropic API Key (for AI features)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Rishabh028/CodePilot-AI.git
cd CodePilot-AI
```

### 2. Environment Setup

Create `.env` files:

**Backend (.env)**
```bash
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
DATABASE_URL=postgresql://user:password@localhost:5432/codepilot
ANTHROPIC_API_KEY=sk-ant-xxxxx
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=7d
```

**Frontend (.env)**
```bash
VITE_BASE44_APP_ID=your_app_id
VITE_BASE44_TOKEN=your_token
VITE_BASE44_APP_BASE_URL=http://localhost:3000
```

### 3. Install Dependencies

```bash
# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

### 4. Database Setup

```bash
cd backend
npx prisma generate
npx prisma db push --accept-data-loss
```

### 5. Start the Application

**Terminal 1 - Backend**
```bash
cd backend && npm start
# Server: http://localhost:5000
```

**Terminal 2 - Frontend**
```bash
cd frontend && npm run dev
# Frontend: http://localhost:5173
```

### 6. Docker Setup (Alternative)

```bash
docker-compose up -d
# Access: http://localhost:3000
```

## 📚 API Documentation

### Core Agent Endpoints

**List Available Agents**
```bash
GET /api/agents
```

**Invoke an Agent**
```bash
POST /api/agents/run
Content-Type: application/json

{
  "agentType": "code_generator",
  "input": "Create a REST API with Express.js for a todo app"
}
```

### Agent Types

- `requirements` - Requirements Analyst
- `code_generator` - Code Generator  
- `code_review` - Code Reviewer
- `security` - Security Scanner
- `testing` - Test Generator
- `documentation` - Documentation Writer
- `deployment` - Deployment Engineer
- `performance` - Performance Optimizer

## 📁 Project Structure

```
CodePilot-AI/
├── backend/
│   ├── src/
│   │   ├── config/           # Configuration
│   │   ├── controllers/      # Controllers
│   │   ├── services/         # Business logic
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Middleware
│   │   ├── utils/            # Utilities
│   │   └── index.js          # Entry point
│   ├── prisma/               # Database schema
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/              # API client
│   │   ├── components/       # Components
│   │   ├── pages/            # Pages
│   │   ├── lib/              # Utilities
│   │   └── App.jsx
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

## 🔧 Configuration

### Environment Variables

See `.env.example` files in backend and frontend directories for all available options.

## 🔐 Security

✅ JWT authentication
✅ Password hashing
✅ CORS protection
✅ Input validation
✅ SQL injection prevention
✅ XSS protection
✅ Secure error handling

## 📊 Database Models

- User
- Project
- Agent
- AgentRun
- SecurityIssue
- TestSuite
- Deployment
- CodeReview

## 🚀 Deployment

### Vercel
```bash
vercel
```

### Railway
```bash
railway up
```

### Docker
```bash
docker-compose up -d
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

## 📝 License

MIT License - see LICENSE file

## 🙋 Support

- **Issues**: GitHub Issues
- **Email**: support@codepilot.ai
- **Docs**: [Full Documentation](./docs)

---

Made with ❤️ by CodePilot AI Team
- **Conversation**: Chat history
- **CodeReview**: PR review results
- **TestSuite**: Test execution results
- **SecurityIssue**: Detected vulnerabilities
- **Deployment**: Deployment records
- **Subscription**: Billing and subscriptions
- **AuditLog**: Activity tracking

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/codepilot
JWT_SECRET=your-secret-key
ANTHROPIC_API_KEY=your-api-key
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
VITE_WS_URL=ws://localhost:5000
```

## Development

### Running Tests
```bash
# Backend tests (to be implemented)
cd backend && npm test

# Frontend tests (to be implemented)
cd frontend && npm test
```

### Database Migrations
```bash
# Create migration
npx prisma migrate dev --name migration_name

# Reset database
npx prisma migrate reset

# View database GUI
npx prisma studio
```

### Code Quality
```bash
# Lint
npm run lint

# Format
npm run format
```

## Deployment

### Docker Deployment
```bash
docker-compose -f docker-compose.yml up -d
```

### Environment for Production
Create a `.env.production` file with production values:
```
NODE_ENV=production
DATABASE_URL=<production-db-url>
JWT_SECRET=<strong-secret-key>
ANTHROPIC_API_KEY=<api-key>
FRONTEND_URL=<production-frontend-url>
```

## Troubleshooting

### Database Connection Issues
```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# View logs
docker logs codepilot-postgres
```

### Backend Won't Start
```bash
# Check logs
docker logs codepilot-backend

# Verify environment variables
docker exec codepilot-backend env | grep DATABASE_URL
```

### Frontend Can't Connect to API
- Ensure backend is running: `curl http://localhost:5000/health`
- Check VITE_API_URL in frontend .env
- Check CORS settings in backend

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues, questions, or feature requests, please create an issue in the repository.

## Roadmap

- [ ] GitHub integration
- [ ] GitLab integration
- [ ] Bitbucket integration
- [ ] Advanced analytics dashboard
- [ ] Team collaboration features
- [ ] Custom agent builder
- [ ] API webhooks
- [ ] Mobile app
- [ ] Self-hosted version

---

**CodePilot AI** - Empowering developers with AI-powered software engineering assistance.
