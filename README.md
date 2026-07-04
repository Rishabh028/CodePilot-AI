# 🚀 CodePilot AI - Your Autonomous AI Software Engineering Team

> An advanced AI-powered platform with 8 specialized agents that automate the entire software development lifecycle, from requirements analysis to production deployment.

![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)
![React](https://img.shields.io/badge/React-18%2B-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-blue)

## ✨ Features

### 8 Specialized AI Agents (Powered by Google Gemini 2.5)

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
- ✅ Secure User Authentication (Email/Password & Google OAuth)
- ✅ Editable User Profiles
- ✅ Cloud-ready architecture

## 🏗️ Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js 5.x
- **Database**: PostgreSQL (Hosted on Neon.tech) with Prisma ORM
- **AI Integration**: Google Gemini 2.5 Flash
- **Auth**: JWT + bcryptjs + Google OAuth

### Frontend
- **Framework**: React 18 with Vite
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **State Management**: TanStack React Query
- **Animations**: Framer Motion

## 🚀 Live Demo Deployment

The platform is designed to be easily deployed on free-tier cloud providers:
- **Frontend:** Vercel (`https://your-app.vercel.app`)
- **Backend:** Render (`https://your-api.onrender.com`)
- **Database:** Neon Serverless Postgres (`postgresql://...`)

## 📋 Local Setup Prerequisites

- Node.js 18.0.0 or higher
- npm 9.0.0 or higher  
- PostgreSQL Database URL (Local or Neon.tech)
- Google Gemini API Key

## 🛠️ Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Rishabh028/CodePilot-AI.git
cd CodePilot-AI
```

### 2. Environment Setup

Create `.env` files in both backend and frontend directories:

**Backend (`backend/.env`)**
```bash
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
DATABASE_URL=postgresql://your-neon-db-url...
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_super_secret_key
JWT_EXPIRE=7d
GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

**Frontend (`frontend/.env`)**
```bash
VITE_API_URL=http://localhost:5000/api
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
npx prisma db push
npx prisma generate
```

### 5. Start the Application

**Terminal 1 - Backend**
```bash
cd backend
npm run dev
# Server running at: http://localhost:5000
```

**Terminal 2 - Frontend**
```bash
cd frontend
npm run dev
# App running at: http://localhost:5173
```

## 🚀 Cloud Deployment Instructions

### 1. Database (Neon)
Create a free project on [Neon.tech](https://neon.tech) and copy your Postgres connection string. Set this as your `DATABASE_URL`. Run `npx prisma db push` from your local machine to create the tables in Neon.

### 2. Backend (Render)
Create a Web Service on Render, connect your GitHub repo, and set the root directory to `backend`. 
- **Build Command:** `npm install && npx prisma generate`
- **Start Command:** `npm run dev`
Add all environment variables from your `.env` file (except set `NODE_ENV=production`).

### 3. Frontend (Vercel)
Import your GitHub repo into Vercel and set the root directory to `frontend`.
Set the `VITE_API_URL` environment variable to your Render backend URL (e.g., `https://your-api.onrender.com/api`).

Update the `FRONTEND_URL` on Render to match your Vercel URL to allow CORS.

## 📝 License
MIT License - see LICENSE file

---
Made with ❤️ by CodePilot AI Team
