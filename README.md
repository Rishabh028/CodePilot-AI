# 🚀 CodePilot AI - Your Autonomous AI Software Engineering Team

> An advanced AI-powered platform with 8 specialized agents that automate the entire software development lifecycle, from requirements analysis to production deployment.

![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)
![React](https://img.shields.io/badge/React-18%2B-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-blue)

## ✨ Features

### 🤖 8 Specialized AI Agents (Powered by Google Gemini 2.5)

1. **Requirements Analyst** 📋 - Generates comprehensive user stories, API specs, DB schemas, and architecture plans.
2. **Code Generator** 🧠 - Writes full-stack production-ready code in multiple languages directly into your editor environment.
3. **Code Reviewer** 🔍 - Performs comprehensive code quality, performance, and security analysis.
4. **Security Scanner** 🛡️ - Detects SQL injection, XSS, CSRF, and auto-generates security fixes.
5. **Test Generator** 🧪 - Generates unit, integration, and E2E tests with high coverage.
6. **Documentation Writer** 📚 - Generates production-quality READMEs, API docs, and architecture guides.
7. **Deployment Engineer** 🚀 - Generates Dockerfiles, docker-compose, Kubernetes manifests, and CI/CD pipelines.
8. **Performance Optimizer** ⚡ - Identifies bottlenecks and provides optimization strategies.

### 🌟 Additional Platform Features
- **Real-time output streaming** via WebSockets
- **Interactive Chat-based agent interface** (Code Studio)
- **Secure User Authentication** (Email/Password & Google OAuth)
- **Editable User Profiles** & Settings Dashboard
- **Production-ready security** & Scalable cloud architecture
- **Project Management Dashboard** to track AI-generated repositories

---

## 🏗️ Tech Stack

### ⚙️ Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js 5.x
- **Database**: PostgreSQL (Hosted on Neon Serverless) with Prisma ORM
- **AI Integration**: Google Gemini 2.5 Flash SDK
- **Auth**: JWT + bcryptjs + Google OAuth Library

### 💻 Frontend
- **Framework**: React 18 with Vite
- **UI Components**: shadcn/ui & Tailwind CSS
- **State Management**: TanStack React Query
- **Routing**: React Router DOM
- **Animations**: Framer Motion
- **Icons**: Lucide React

---

## 📁 Project Structure

```
CodePilot-AI/
├── frontend/                    # React frontend application
│   ├── src/
│   │   ├── api/               # API client and endpoints
│   │   ├── components/        # Reusable UI components & layouts
│   │   ├── lib/               # Utilities and context (AuthContext)
│   │   ├── pages/             # Page components (Dashboard, CodeStudio, etc.)
│   │   └── App.jsx            # Application Router
│   └── package.json
│
├── backend/                     # Node.js/Express backend API
│   ├── src/
│   │   ├── config/            # Database and Auth Configuration
│   │   ├── controllers/       # Route handlers (AI, Auth, Projects, etc.)
│   │   ├── middleware/        # JWT Authentication middleware
│   │   ├── routes/            # Express routers
│   │   └── index.js           # Server Entry point
│   ├── prisma/                # Prisma Schema & Migrations
│   └── package.json
│
└── README.md                  # Project Documentation
```

---

## 🚀 Live Demo Deployment

The platform is designed to be easily deployed on free-tier cloud providers. 
- **Frontend URL:** [https://code-pilot-ai-drab.vercel.app](https://code-pilot-ai-drab.vercel.app)
- **Backend API:** Hosted on Render (`https://codepilot-ai-h1sq.onrender.com`)
- **Database:** Hosted on Neon Serverless Postgres

---

## 📋 Local Setup & Installation

### Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)
- **PostgreSQL Database** (Local instance or Cloud URL from Neon.tech)
- **Google Gemini API Key** (Free Tier available at Google AI Studio)
- **Google OAuth Client ID** (For Google Sign-In)

### 1. Clone the Repository

```bash
git clone https://github.com/Rishabh028/CodePilot-AI.git
cd CodePilot-AI
```

### 2. Environment Variables

Create `.env` files in both the `backend` and `frontend` directories.

**Backend (`backend/.env`)**
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
DATABASE_URL=postgresql://your-postgres-url...
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

**Frontend (`frontend/.env`)**
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Install Dependencies

```bash
# Install Backend Dependencies
cd backend
npm install

# Install Frontend Dependencies
cd ../frontend
npm install
```

### 4. Database Initialization

Using Prisma, push your database schema directly to your Postgres instance:

```bash
cd backend
npx prisma db push
npx prisma generate
```

### 5. Start the Application

**Run the Backend (Terminal 1)**
```bash
cd backend
npm run dev
# Server running at: http://localhost:5000
```

**Run the Frontend (Terminal 2)**
```bash
cd frontend
npm run dev
# App running at: http://localhost:5173
```

---

## ☁️ Cloud Deployment Guide (Free Tier)

### 1. Database Setup (Neon)
1. Create a free project on [Neon.tech](https://neon.tech) and copy your Postgres connection string.
2. Set this string as your `DATABASE_URL` in your local backend `.env`.
3. Run `npx prisma db push` from your local terminal to create the tables in the cloud.

### 2. Backend Deployment (Render)
1. Create a **Web Service** on [Render.com](https://render.com).
2. Connect your GitHub repository and set the **Root Directory** to `backend`.
3. Set **Build Command** to: `npm install && npx prisma generate`
4. Set **Start Command** to: `npm run dev` (or `node src/index.js`)
5. Add all environment variables from your `.env` file (ensure `NODE_ENV` is set to `production`).
6. Once deployed, Render will give you a live URL (e.g., `https://your-api.onrender.com`).

### 3. Frontend Deployment (Vercel)
1. Import your GitHub repository into [Vercel](https://vercel.com).
2. Set the **Root Directory** to `frontend`. Vercel will automatically detect Vite.
3. Add an Environment Variable: `VITE_API_URL` = `https://your-api.onrender.com/api`
4. Deploy the frontend. Vercel will provide your live URL.
5. **Important:** Go back to Render and update the `FRONTEND_URL` environment variable to match your new Vercel URL (to allow CORS).

---

## 📚 API Documentation

### Authentication Routes
- `POST /api/auth/register` - Create a new account
- `POST /api/auth/login` - Sign in with email/password
- `POST /api/auth/google` - Sign in with Google OAuth
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/me` - Update user profile & password

### Project Routes
- `GET /api/projects` - Get all user projects
- `POST /api/projects` - Create a new project
- `GET /api/projects/:id` - Get specific project details

### AI Agent Routes
- `POST /api/ai/invoke-llm` - Direct integration with Gemini 2.5 Flash for agent generations.

---

## 🔐 Security Standards

- **JWT Authentication** for stateless, secure sessions.
- **bcryptjs** for robust password hashing.
- **CORS Protection** restricts API access to authorized frontend origins.
- **OAuth 2.0 Integration** provides secure third-party login flows without storing passwords.

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Made with ❤️ by CodePilot AI Team**
