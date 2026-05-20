import { logInfo, logError } from '../utils/logger.js';

/**
 * Mock AI Service - Generates intelligent responses without external APIs
 * Perfect for demo/testing. Can be replaced with real APIs later.
 */

const MOCK_RESPONSES = {
  requirements: (input) => `# Requirements Analysis

## Executive Summary
For your request: "${input.slice(0, 50)}..."

This project requires comprehensive planning with multiple layers of consideration.

## User Stories
1. **As a user**, I want clear functionality, so that I can achieve my goals effectively
2. **As a developer**, I need maintainable code, so that future changes are easy
3. **As a stakeholder**, I need ROI tracking, so that I can measure success

## System Architecture
- **Frontend**: React/Vue for responsive UI
- **Backend**: Node.js/Express for API services
- **Database**: PostgreSQL for reliable data storage
- **Cache**: Redis for performance optimization
- **Queue**: Bull/RabbitMQ for async operations

## Database Schema
\`\`\`sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE projects (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  title VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

## API Endpoints
- \`GET /api/users\` - List all users
- \`POST /api/projects\` - Create new project
- \`GET /api/projects/:id\` - Get project details

## Tech Stack Recommendation
- Framework: Next.js / Express.js
- Database: PostgreSQL
- Cache: Redis
- Deployment: Docker + Kubernetes

## Implementation Phases
**Phase 1**: Core setup and database design (Week 1-2)
**Phase 2**: API development (Week 3-4)
**Phase 3**: Frontend implementation (Week 5-6)
**Phase 4**: Testing and deployment (Week 7)

## Risk Assessment
- **Technical Risk**: Medium - requires experienced team
- **Timeline Risk**: Low - realistic 2-month delivery
- **Resource Risk**: Medium - needs 3-4 developers

## Success Metrics
- 99.9% uptime
- < 200ms response time
- 95% test coverage`,

  code_generator: (input) => `# Generated Code Structure

## Project Overview
Generated for: "${input.slice(0, 60)}..."

## File Structure
\`\`\`
project/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   └── styles/
├── public/
├── tests/
├── .env.example
├── package.json
├── tsconfig.json
├── webpack.config.js
└── README.md
\`\`\`

## Key Components

### User Authentication (auth.js)
\`\`\`javascript
export async function authenticateUser(email, password) {
  const user = await db.users.findOne({ email });
  if (!user) throw new Error('User not found');
  
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error('Invalid password');
  
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  return { token, user };
}
\`\`\`

### API Route Handler (routes/api.js)
\`\`\`javascript
router.get('/data', async (req, res) => {
  try {
    const data = await db.collection.find({}).lean();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
\`\`\`

### Docker Configuration
\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

## Environment Variables
\`\`\`.env
DATABASE_URL=postgresql://user:pass@localhost/dbname
JWT_SECRET=your-secret-key
NODE_ENV=production
REDIS_URL=redis://localhost:6379
\`\`\`

## NPM Dependencies
\`\`\`json
{
  "dependencies": {
    "express": "^4.18.0",
    "prisma": "^5.0.0",
    "jsonwebtoken": "^9.0.0",
    "bcryptjs": "^2.4.3",
    "dotenv": "^16.0.0"
  },
  "devDependencies": {
    "jest": "^29.0.0",
    "nodemon": "^3.0.0"
  }
}
\`\`\``,

  code_review: (input) => `# Code Review Report

## Overall Assessment: 8/10 ✅
Good code structure with room for optimization.

## Summary
The code provided shows good fundamental practices with clear logic flow. Minor improvements needed for production readiness.

## Critical Issues: NONE 🎉

## Performance Issues (Medium): 1
- **Issue**: Missing database indexes
  - **Impact**: Queries may be slow on large datasets
  - **Fix**: Add composite index on \`user_id, created_date\`
  - **Code**: \`CREATE INDEX idx_user_created ON orders(user_id, created_date);\`

## Security Issues (Low): 1
- **Issue**: Missing input validation
  - **Severity**: LOW
  - **Fix**: Use Joi or Zod for schema validation
  - **Example**: 
  \`\`\`javascript
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
  });
  \`\`\`

## Code Quality: 9/10
- ✅ Clear variable names
- ✅ Proper error handling
- ✅ Good function decomposition
- ⚠️ Missing JSDoc comments

## Best Practices: 8/10
- ✅ Using async/await
- ✅ Error boundaries
- ⚠️ Could use dependency injection

## Recommended Fixes
1. Add input validation middleware
2. Implement database connection pooling
3. Add comprehensive error logging
4. Write unit tests for critical functions

## Overall Recommendation
**Ready for staging** - Address high severity issues before production.`,

  security: (input) => `# Security Audit Report

## Risk Summary
- **Critical**: 0 issues
- **High**: 1 issue  
- **Medium**: 2 issues
- **Low**: 3 issues

## Critical Vulnerabilities: NONE ✅

## High Severity: 1

### 1. SQL Injection Risk
- **Location**: User input handling
- **Severity**: HIGH
- **Example Exploit**: 
  \`\`\`
  username: admin' OR '1'='1
  \`\`\`
- **Fix**: Use parameterized queries
  \`\`\`javascript
  db.query('SELECT * FROM users WHERE id = ?', [userId])
  \`\`\`

## Medium Severity: 2

### 2. Missing CORS Configuration
- **Fix**: Implement strict CORS
  \`\`\`javascript
  app.use(cors({ origin: process.env.ALLOWED_ORIGINS }));
  \`\`\`

### 3. No Rate Limiting
- **Fix**: Add rate limiter middleware
  \`\`\`javascript
  const rateLimit = require('express-rate-limit');
  app.use(rateLimit({ windowMs: 15*60*1000, max: 100 }));
  \`\`\`

## Low Severity: 3
- Missing security headers (add Helmet.js)
- No input sanitization (add sanitizer middleware)
- Weak password policy (enforce strong passwords)

## Compliance Checklist
- ✅ HTTPS enabled
- ✅ API authentication implemented
- ⚠️ GDPR compliance needed
- ⚠️ Data encryption at rest needed

## Action Items
1. **Immediate**: Fix SQL injection (Day 1)
2. **This week**: Add CORS and rate limiting
3. **This month**: Implement full security headers

**Overall Risk Level**: MEDIUM 🟡`,

  testing: (input) => `# Test Suite Generation

## Test Coverage Plan: 92%

## Unit Tests

### Example: User Authentication Tests
\`\`\`javascript
describe('User Authentication', () => {
  test('should authenticate valid user', async () => {
    const user = await auth.login('test@example.com', 'password123');
    expect(user).toHaveProperty('token');
    expect(user.token).toBeDefined();
  });

  test('should reject invalid password', async () => {
    await expect(
      auth.login('test@example.com', 'wrongpassword')
    ).rejects.toThrow('Invalid password');
  });

  test('should hash passwords securely', async () => {
    const hash = await auth.hashPassword('mypassword');
    expect(hash).not.toBe('mypassword');
    expect(hash.length).toBeGreaterThan(20);
  });
});
\`\`\`

## Integration Tests
\`\`\`javascript
describe('User API', () => {
  test('GET /api/users returns all users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /api/users creates new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ email: 'new@example.com', name: 'John' });
    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
  });
});
\`\`\`

## E2E Tests
\`\`\`javascript
describe('User Flow', () => {
  test('complete user registration and login', async () => {
    // 1. Register user
    await page.goto('http://localhost:3000/register');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'SecurePass123!');
    await page.click('button:has-text("Register")');
    
    // 2. Login
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'SecurePass123!');
    await page.click('button:has-text("Login")');
    
    // 3. Verify dashboard loads
    await expect(page).toHaveURL('http://localhost:3000/dashboard');
  });
});
\`\`\`

## Coverage Configuration (jest.config.js)
\`\`\`javascript
module.exports = {
  collectCoverageFrom: ['src/**/*.js'],
  coverageThreshold: {
    global: { lines: 90, functions: 90, branches: 85, statements: 90 }
  },
  testEnvironment: 'node'
};
\`\`\`

## Run Tests
\`\`\`bash
npm test                    # Run all tests
npm test -- --coverage     # Generate coverage report
npm test -- --watch        # Watch mode
\`\`\``,

  documentation: (input) => `# Project Documentation

## README.md

# ${input.slice(0, 40)} Application

[![Node.js CI](https://img.shields.io/badge/Node.js-v18-green)](https://nodejs.org)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

## Overview
A comprehensive application for ${input.slice(0, 50)}...

## Features
- 🚀 High-performance API
- 🔐 Secure authentication
- 💾 Database persistence
- 📊 Real-time analytics
- 🎨 Modern UI/UX

## Installation

\`\`\`bash
# Clone repository
git clone https://github.com/yourusername/project.git
cd project

# Install dependencies
npm install

# Setup environment
cp .env.example .env
\`\`\`

## Quick Start

\`\`\`bash
npm run dev
# Server running at http://localhost:3000
\`\`\`

## API Documentation

### GET /api/users
Returns list of all users.

**Response:**
\`\`\`json
{
  "success": true,
  "data": [
    { "id": "1", "email": "user@example.com", "name": "John" }
  ]
}
\`\`\`

### POST /api/auth/login
Authenticate user.

**Request:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "password123"
}
\`\`\`

## Architecture

\`\`\`
┌─────────────┐
│  Frontend   │ (React)
└──────┬──────┘
       │
┌──────▼──────────────┐
│  API Server         │ (Express)
└──────┬──────────────┘
       │
┌──────▼──────────────┐
│  Database           │ (PostgreSQL)
└─────────────────────┘
\`\`\`

## Development

\`\`\`bash
npm run dev       # Start dev server
npm test          # Run tests
npm run build     # Build for production
npm run lint      # Check code style
\`\`\`

## Contributing
1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License
MIT License - see LICENSE file for details`,

  deployment: (input) => `# Deployment Guide

## Dockerfile

\`\`\`dockerfile
# Multi-stage build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
USER nodejs

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

CMD ["npm", "start"]
\`\`\`

## Docker Compose

\`\`\`yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://postgres:password@db:5432/myapp
    depends_on:
      - db
      - redis
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
\`\`\`

## GitHub Actions CI/CD

\`\`\`.github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - run: npm ci
      - run: npm run test
      - run: npm run build
      
      - name: Deploy to production
        run: npm run deploy
\`\`\`

## Kubernetes Deployment

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: app
        image: myregistry.azurecr.io/myapp:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        resources:
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 10
          periodSeconds: 10
\`\`\`

## Deployment Steps

1. **Build Docker image**
   \`\`\`bash
   docker build -t myapp:v1.0.0 .
   \`\`\`

2. **Push to registry**
   \`\`\`bash
   docker tag myapp:v1.0.0 myregistry.azurecr.io/myapp:v1.0.0
   docker push myregistry.azurecr.io/myapp:v1.0.0
   \`\`\`

3. **Deploy to Kubernetes**
   \`\`\`bash
   kubectl apply -f deployment.yaml
   \`\`\`

4. **Verify deployment**
   \`\`\`bash
   kubectl get pods
   kubectl logs deployment/app-deployment
   \`\`\``,

  performance: (input) => `# Performance Optimization Report

## Current Bottlenecks

### 1. Database Queries (35% improvement possible)
**Problem**: N+1 query pattern detected

**Current (BAD)**:
\`\`\`javascript
const users = await db.users.find();
for (const user of users) {
  user.projects = await db.projects.find({ userId: user.id }); // Query per user!
}
\`\`\`

**Optimized (GOOD)**:
\`\`\`javascript
const users = await db.users.find().populate('projects');
\`\`\`

### 2. Missing Indexes (40% faster queries)
\`\`\`sql
-- Add these indexes
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_project_user_id ON projects(user_id);
CREATE INDEX idx_created_date ON orders(created_date DESC);
\`\`\`

### 3. Caching Strategy (50% reduction in DB load)
\`\`\`javascript
const redis = require('redis');
const client = redis.createClient();

async function getUsersWithCache() {
  const cached = await client.get('users:all');
  if (cached) return JSON.parse(cached);
  
  const users = await db.users.find();
  await client.setex('users:all', 3600, JSON.stringify(users)); // 1 hour TTL
  return users;
}
\`\`\`

### 4. API Response Pagination
\`\`\`javascript
// Limit response size
app.get('/api/users', async (req, res) => {
  const page = req.query.page || 1;
  const limit = 20;
  const skip = (page - 1) * limit;
  
  const users = await db.users.find().skip(skip).limit(limit);
  res.json({ users, page, hasMore: users.length === limit });
});
\`\`\`

### 5. Frontend Bundle Optimization
\`\`\`javascript
// Code splitting
const Dashboard = React.lazy(() => import('./Dashboard'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Dashboard />
    </Suspense>
  );
}
\`\`\`

## Performance Improvements Summary
- **Database**: +35% faster (with indexes)
- **Caching**: 50% reduction in DB queries
- **API**: +40% faster responses (pagination)
- **Frontend**: 30% smaller bundle (code splitting)

**Expected Overall**: **2-3x faster application**

## Monitoring Setup
\`\`\`javascript
// Add APM (Application Performance Monitoring)
const newrelic = require('newrelic');

// Response time metrics
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(\`\${req.method} \${req.path} - \${duration}ms\`);
  });
  next();
});
\`\`\`

## Benchmarks
- Current: 500ms avg response time
- Target: 150ms avg response time
- Goal: <100ms for cached requests`,
};

/**
 * Generate mock AI response
 */
export async function callMockAI(agentType, input) {
  try {
    logInfo(`Mock AI: Generating response for ${agentType}`);

    // Get response for agent type
    const responseFn = MOCK_RESPONSES[agentType];
    if (!responseFn) {
      throw new Error(`Unknown agent type: ${agentType}`);
    }

    // Generate response
    const output = responseFn(input);

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

    logInfo(`Mock AI: ${agentType} response generated`);

    return {
      output,
      tokens_used: Math.floor((input.length + output.length) / 4),
      provider: 'mock-demo',
    };
  } catch (error) {
    logError('Mock AI error', error);
    throw error;
  }
}

/**
 * Check if mock AI should be used (when real APIs fail)
 */
export function shouldUseMockAI(hasGemini, hasClaude) {
  return !hasGemini && !hasClaude;
}
