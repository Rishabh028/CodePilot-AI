export const SECTIONS = [
  {
    id: 'overview',
    title: '1. Overview & Goals',
    content: `## What You're Building

You are rebuilding CodePilot AI as a fully independent, self-hosted application with:

- Your own GitHub repository
- Your own PostgreSQL database  
- Your own authentication (Clerk)
- Your own AI API keys (OpenAI / Gemini)
- Your own file storage (AWS S3 / Cloudflare R2)
- Your own Stripe billing
- Your own hosting (Vercel + Railway)
- Your own custom domain
- Zero Base44 dependency

## Estimated Timeline

| Phase | Time |
|-------|------|
| Environment Setup | 2-4 hours |
| Database + Auth | 4-8 hours |
| Backend API | 1-2 days |
| Frontend Migration | 1-2 days |
| AI Agents | 2-3 days |
| Billing + Storage | 1 day |
| Deployment | 4-8 hours |
| Total | ~1-2 weeks |`
  },
  {
    id: 'architecture',
    title: '2. System Architecture',
    content: `## Architecture Overview

\`\`\`
┌──────────────────────────────────────────────────────┐
│                    CLIENT LAYER                       │
│  Next.js 15 + React 19 + TypeScript + Tailwind CSS   │
│  Deployed on: Vercel                                  │
└───────────────────────┬──────────────────────────────┘
                        │ HTTPS / SSE (Streaming)
┌───────────────────────▼──────────────────────────────┐
│                    API LAYER                          │
│  NestJS + TypeScript REST API                         │
│  Deployed on: Railway / Render                        │
└──────┬────────────────┬──────────────────┬───────────┘
       │                │                  │
┌──────▼──────┐  ┌──────▼──────┐  ┌───────▼──────┐
│ PostgreSQL  │  │    Redis     │  │   AI APIs    │
│ + pgvector  │  │  (BullMQ)   │  │ OpenAI/Gemini│
│ Neon/Supa   │  │  Upstash    │  │              │
└─────────────┘  └─────────────┘  └──────────────┘
\`\`\`

## AI Agent Data Flow

\`\`\`
User clicks "Run Agent"
    │
    ▼
Next.js → POST /agents/run (with Clerk JWT)
    │
    ▼
NestJS Auth Guard (validates Clerk token)
    │
    ▼
Agent Service → builds prompt from AGENT_PROMPTS
    │
    ▼
OpenAI GPT-4o streaming API
    │
    ▼
Server-Sent Events (SSE) → browser
    │
    ▼
Output saved to PostgreSQL + S3
    │
    ▼
TanStack Query invalidates cache → UI updates
\`\`\``
  },
  {
    id: 'structure',
    title: '3. Monorepo Folder Structure',
    content: `## Full Project Structure

\`\`\`
codepilot-ai/
├── apps/
│   ├── web/                    # Next.js 15 frontend
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── sign-in/[[...sign-in]]/page.tsx
│   │   │   │   └── sign-up/[[...sign-up]]/page.tsx
│   │   │   ├── (dashboard)/    # Protected routes
│   │   │   │   ├── dashboard/page.tsx
│   │   │   │   ├── projects/
│   │   │   │   ├── agents/
│   │   │   │   ├── code-studio/
│   │   │   │   ├── security/
│   │   │   │   ├── testing/
│   │   │   │   ├── docs/
│   │   │   │   ├── deployments/
│   │   │   │   ├── billing/
│   │   │   │   └── settings/
│   │   │   ├── (marketing)/    # Public pages
│   │   │   │   ├── page.tsx    # Landing / Hero
│   │   │   │   ├── features/
│   │   │   │   └── about/
│   │   │   └── layout.tsx
│   │   ├── components/
│   │   │   ├── ui/             # Shadcn components
│   │   │   ├── landing/        # Hero, Navbar, Footer
│   │   │   ├── agents/         # Agent UI
│   │   │   ├── code-studio/    # Monaco editor
│   │   │   ├── layout/         # Sidebar, TopBar
│   │   │   └── shared/         # GlassCard, StatCard
│   │   ├── hooks/
│   │   ├── lib/
│   │   │   ├── api-client.ts   # Axios wrapper (replaces base44 SDK)
│   │   │   └── utils.ts
│   │   ├── store/              # Zustand stores
│   │   └── types/
│   │
│   └── api/                    # NestJS backend
│       └── src/
│           ├── agents/         # 8 AI agents + prompts
│           ├── auth/           # Clerk guard
│           ├── projects/
│           ├── billing/        # Stripe
│           ├── storage/        # S3/R2
│           ├── rag/            # Vector search
│           ├── queue/          # BullMQ jobs
│           └── prisma/
│
├── packages/
│   ├── prompts/                # All 8 agent prompt templates
│   ├── types/                  # Shared TypeScript interfaces
│   └── ui/                     # Shared component library
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
├── docker/
│   ├── Dockerfile.api
│   └── Dockerfile.web
│
├── .github/workflows/
│   ├── ci.yml
│   ├── deploy-web.yml
│   └── deploy-api.yml
│
├── docker-compose.yml
├── pnpm-workspace.yaml
└── .env.example
\`\`\``
  },
  {
    id: 'localsetup',
    title: '4. Local Development Setup',
    content: `## Step-by-Step Environment Setup

### Install Node.js (via nvm)
\`\`\`bash
# macOS/Linux
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install 20 && nvm use 20

# Windows: download from nodejs.org (LTS)
node --version   # should be v20.x.x
\`\`\`

### Install pnpm
\`\`\`bash
npm install -g pnpm@9
pnpm --version   # 9.x.x
\`\`\`

### Install Docker Desktop
Download from: https://docker.com/products/docker-desktop

### VS Code Extensions to Install
\`\`\`
ESLint                    dbaeumer.vscode-eslint
Prettier                  esbenp.prettier-vscode
Prisma                    Prisma.prisma
Tailwind IntelliSense     bradlc.vscode-tailwindcss
GitLens                   eamodio.gitlens
Thunder Client            rangav.vscode-thunder-client
Docker                    ms-azuretools.vscode-docker
Error Lens                usernamehaks.errorlens
\`\`\`

### Create Monorepo
\`\`\`bash
mkdir codepilot-ai && cd codepilot-ai
git init
git remote add origin https://github.com/YOUR_USERNAME/codepilot-ai.git

cat > pnpm-workspace.yaml << 'EOF'
packages:
  - 'apps/*'
  - 'packages/*'
  - 'workers'
EOF

mkdir -p apps/web apps/api workers packages/prompts packages/types
mkdir -p prisma .github/workflows docker
\`\`\`

### Bootstrap Next.js
\`\`\`bash
cd apps
npx create-next-app@latest web --typescript --tailwind --eslint --app
cd web

pnpm add framer-motion @tanstack/react-query zustand react-hook-form zod
pnpm add react-markdown rehype-highlight @monaco-editor/react lucide-react
pnpm add class-variance-authority clsx tailwind-merge sonner date-fns
pnpm add @clerk/nextjs

# Shadcn UI
npx shadcn@latest init
npx shadcn@latest add button input textarea select badge card tabs dialog
npx shadcn@latest add dropdown-menu sheet separator avatar progress table
\`\`\`

### Bootstrap NestJS
\`\`\`bash
cd ../api
npx @nestjs/cli new . --package-manager pnpm --skip-git

pnpm add @nestjs/config @nestjs/jwt @nestjs/passport passport passport-jwt
pnpm add @prisma/client openai stripe @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
pnpm add bullmq ioredis resend @sentry/node @clerk/clerk-sdk-node
pnpm add -D prisma @types/passport-jwt
\`\`\`

### Start Local Services (Docker)
\`\`\`bash
# docker-compose.dev.yml
cat > ../../docker-compose.dev.yml << 'EOF'
version: '3.9'
services:
  postgres:
    image: pgvector/pgvector:pg16
    ports: ["5432:5432"]
    environment:
      POSTGRES_USER: codepilot
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: codepilot_dev
  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]
EOF

docker compose -f docker-compose.dev.yml up -d
\`\`\``
  },
  {
    id: 'database',
    title: '5. Database Schema (Prisma)',
    content: `## Complete Prisma Schema

\`\`\`prisma
// prisma/schema.prisma
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["postgresqlExtensions"]
}

datasource db {
  provider   = "postgresql"
  url        = env("DATABASE_URL")
  extensions = [pgvector(map: "vector")]
}

model User {
  id            String    @id @default(cuid())
  clerkId       String    @unique
  email         String    @unique
  name          String?
  plan          Plan      @default(FREE)
  tokensUsed    Int       @default(0)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  projects      Project[]
  agentRuns     AgentRun[]
  subscription  Subscription?
}

model Project {
  id             String        @id @default(cuid())
  userId         String
  name           String
  description    String?
  techStack      String[]
  framework      String        @default("other")
  repositoryUrl  String?
  status         String        @default("planning")
  requirements   String?
  user           User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  agentRuns      AgentRun[]
  artifacts      Artifact[]
  securityIssues SecurityIssue[]
  testSuites     TestSuite[]
  deployments    Deployment[]
  embeddings     Embedding[]
  createdAt      DateTime      @default(now())
  updatedAt      DateTime      @updatedAt
}

model AgentRun {
  id          String     @id @default(cuid())
  projectId   String?
  userId      String
  agentType   String
  status      String     @default("queued")
  input       String
  output      String?
  tokensUsed  Int        @default(0)
  durationMs  Int?
  error       String?
  project     Project?   @relation(fields: [projectId], references: [id])
  user        User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  artifacts   Artifact[]
  createdAt   DateTime   @default(now())
}

model Artifact {
  id          String    @id @default(cuid())
  projectId   String?
  agentRunId  String?
  name        String
  filePath    String
  content     String?
  storageUrl  String?
  language    String?
  project     Project?  @relation(fields: [projectId], references: [id])
  agentRun    AgentRun? @relation(fields: [agentRunId], references: [id])
  createdAt   DateTime  @default(now())
}

model SecurityIssue {
  id             String   @id @default(cuid())
  projectId      String
  title          String
  severity       String   @default("medium")
  category       String   @default("other")
  filePath       String?
  lineNumber     Int?
  description    String
  recommendation String?
  autoFix        String?
  status         String   @default("open")
  project        Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
  createdAt      DateTime @default(now())
}

model TestSuite {
  id              String   @id @default(cuid())
  projectId       String
  name            String
  testType        String   @default("unit")
  framework       String   @default("vitest")
  code            String
  status          String   @default("generated")
  coveragePercent Float?
  testsPassed     Int      @default(0)
  testsFailed     Int      @default(0)
  project         Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
  createdAt       DateTime @default(now())
}

model Deployment {
  id          String   @id @default(cuid())
  projectId   String
  target      String   @default("vercel")
  status      String   @default("pending")
  url         String?
  environment String   @default("production")
  buildLog    String?
  project     Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
  createdAt   DateTime @default(now())
}

model Embedding {
  id         String   @id @default(cuid())
  projectId  String
  content    String
  filePath   String?
  chunkIndex Int      @default(0)
  project    Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
  createdAt  DateTime @default(now())
}

model Subscription {
  id               String   @id @default(cuid())
  userId           String   @unique
  stripeCustomerId String   @unique
  stripePriceId    String
  stripeSubId      String   @unique
  plan             Plan
  status           String
  currentPeriodEnd DateTime
  user             User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

enum Plan { FREE PRO ENTERPRISE }
\`\`\`

### Run Migrations
\`\`\`bash
# Create .env with DATABASE_URL first
npx prisma migrate dev --name init
npx prisma generate
npx prisma studio   # Visual DB browser at localhost:5555
\`\`\``
  },
  {
    id: 'auth',
    title: '6. Authentication (Clerk + Google OAuth)',
    content: `## Clerk Setup

### 1. Create Account
- Go to clerk.com → Create application
- Enable: Email/Password + Google
- Copy keys from API Keys tab

### 2. Install & Configure
\`\`\`bash
pnpm add @clerk/nextjs
\`\`\`

\`\`\`tsx
// apps/web/app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en"><body>{children}</body></html>
    </ClerkProvider>
  )
}
\`\`\`

### 3. Route Protection Middleware
\`\`\`ts
// apps/web/middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublic = createRouteMatcher(['/', '/features', '/about', '/sign-in(.*)', '/sign-up(.*)'])

export default clerkMiddleware((auth, req) => {
  if (!isPublic(req)) auth().protect()
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
\`\`\`

### 4. Auth Pages
\`\`\`tsx
// app/(auth)/sign-in/[[...sign-in]]/page.tsx
import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#05010D]">
      <SignIn afterSignInUrl="/dashboard" />
    </div>
  )
}
\`\`\`

### 5. NestJS Backend Guard
\`\`\`ts
// src/auth/clerk.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { clerkClient } from '@clerk/clerk-sdk-node'

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token) throw new UnauthorizedException()
    try {
      const payload = await clerkClient.verifyToken(token)
      req['userId'] = payload.sub
      return true
    } catch {
      throw new UnauthorizedException()
    }
  }
}
\`\`\`

### 6. Frontend API Client with Auth
\`\`\`ts
// apps/web/lib/api-client.ts
import axios from 'axios'

export const createAuthClient = (getToken: () => Promise<string | null>) => {
  const client = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL })
  client.interceptors.request.use(async (config) => {
    const token = await getToken()
    if (token) config.headers.Authorization = \`Bearer \${token}\`
    return config
  })
  return client
}

// Usage in component:
// const { getToken } = useAuth()
// const api = createAuthClient(getToken)
// const res = await api.get('/projects')
\`\`\``
  },
  {
    id: 'agents',
    title: '7. All 8 AI Agents (Prompts + API)',
    content: `## Agent Prompt Templates

\`\`\`ts
// packages/prompts/src/index.ts
export const AGENT_PROMPTS = {

  REQUIREMENTS: (input: string) => ({
    system: \`You are a Senior Product Manager and Requirements Analyst.
Generate comprehensive Software Requirements Documents (SRD).
Always include: Executive Summary, Functional Requirements, Non-Functional Requirements,
User Stories (Given/When/Then), API Contracts, Data Models, Acceptance Criteria.\`,
    user: \`Project Description: \${input}\\nGenerate a complete SRD.\`
  }),

  CODE_GENERATOR: (input: string) => ({
    system: \`You are a Senior Full-Stack Engineer. Generate production-quality TypeScript code.
Include: error handling, input validation, TypeScript interfaces, JSDoc, SOLID principles.
Always output complete, runnable code with file paths.\`,
    user: input
  }),

  CODE_REVIEW: (input: string) => ({
    system: \`You are a Staff Engineer conducting thorough code reviews.
Analyze for: bugs, performance issues, security vulnerabilities, code smells,
best practices, maintainability. Provide specific line-referenced feedback.\`,
    user: \`Review this code:\\n\${input}\`
  }),

  SECURITY: (input: string) => ({
    system: \`You are a Security Engineer and penetration tester.
Identify ALL vulnerabilities: SQL injection, XSS, CSRF, auth flaws, secrets exposure,
OWASP Top 10. Rate by CVSS severity. Provide remediation code.
Output as JSON: { issues: [{ title, severity, category, filePath, lineNumber, description, recommendation, autoFix }] }\`,
    user: input
  }),

  TESTING: (input: string) => ({
    system: \`You are a QA Engineer. Generate comprehensive test suites using Vitest.
Include: happy path, edge cases, error conditions, boundary values, mocks.
Target >90% code coverage. Output complete runnable test files.\`,
    user: \`Generate tests for:\\n\${input}\`
  }),

  DOCUMENTATION: (input: string) => ({
    system: \`You are a Technical Writer. Generate developer-friendly Markdown documentation.
Include: README, API docs, architecture diagrams (Mermaid), setup guide, usage examples.\`,
    user: input
  }),

  DEPLOYMENT: (input: string) => ({
    system: \`You are a DevOps Engineer and Cloud Architect.
Generate production-ready configs: multi-stage Dockerfiles, docker-compose,
nginx config, GitHub Actions CI/CD, health checks, env variable handling.\`,
    user: input
  }),

  PERFORMANCE: (input: string) => ({
    system: \`You are a Performance Engineer.
Analyze for: algorithmic complexity, N+1 queries, missing indexes, cache opportunities,
bundle size, render performance, memory leaks. Provide before/after comparisons.\`,
    user: input
  }),
}
\`\`\`

## Agent API Controller (NestJS)
\`\`\`ts
// src/agents/agents.controller.ts
import { Controller, Post, Body, Res, UseGuards, Req } from '@nestjs/common'
import { Response, Request } from 'express'
import { ClerkAuthGuard } from '../auth/clerk.guard'
import OpenAI from 'openai'
import { AGENT_PROMPTS } from '@codepilot/prompts'

@Controller('agents')
@UseGuards(ClerkAuthGuard)
export class AgentsController {
  private openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

  @Post('run')
  async runAgent(
    @Body() body: { agentType: string; input: string; projectId?: string },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    // Setup SSE
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    const promptFn = AGENT_PROMPTS[body.agentType]
    if (!promptFn) { res.write('data: [ERROR]\\n\\n'); return res.end() }

    const { system, user } = promptFn(body.input)

    const stream = await this.openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'system', content: system }, { role: 'user', content: user }],
      stream: true,
    })

    let fullOutput = ''
    for await (const chunk of stream) {
      const token = chunk.choices[0]?.delta?.content ?? ''
      if (token) {
        fullOutput += token
        res.write(\`data: \${JSON.stringify({ token })}\\n\\n\`)
      }
    }

    res.write('data: [DONE]\\n\\n')
    res.end()
    // TODO: save fullOutput to database
  }
}
\`\`\`

## Frontend Streaming Hook
\`\`\`ts
// apps/web/hooks/useAgentStream.ts
import { useState, useCallback } from 'react'
import { useAuth } from '@clerk/nextjs'

export function useAgentStream() {
  const [output, setOutput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const { getToken } = useAuth()

  const run = useCallback(async (agentType: string, input: string) => {
    setOutput('')
    setIsStreaming(true)
    const token = await getToken()

    const res = await fetch(\`\${process.env.NEXT_PUBLIC_API_URL}/agents/run\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: \`Bearer \${token}\` },
      body: JSON.stringify({ agentType, input }),
    })

    const reader = res.body!.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      const lines = decoder.decode(value).split('\\n')
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue
        const data = line.slice(6)
        if (data === '[DONE]') { setIsStreaming(false); return }
        try { setOutput(p => p + JSON.parse(data).token) } catch {}
      }
    }
    setIsStreaming(false)
  }, [getToken])

  return { output, isStreaming, run }
}
\`\`\``
  },
  {
    id: 'storage',
    title: '8. File Storage (S3 / Cloudflare R2)',
    content: `## AWS S3 Setup

### 1. Create Bucket
- AWS Console → S3 → Create bucket
- Name: codepilot-ai-artifacts
- Block ALL public access (use signed URLs)
- Enable versioning (optional but recommended)

### 2. Create IAM User
- IAM → Users → Create → codepilot-s3
- Attach policy: AmazonS3FullAccess
- Create access key → save credentials

### 3. Storage Service
\`\`\`ts
// src/storage/storage.service.ts
import { Injectable } from '@nestjs/common'
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

@Injectable()
export class StorageService {
  private s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  })
  private bucket = process.env.AWS_S3_BUCKET!

  async upload(key: string, body: Buffer, contentType: string): Promise<string> {
    await this.s3.send(new PutObjectCommand({ Bucket: this.bucket, Key: key, Body: body, ContentType: contentType }))
    return \`s3://\${this.bucket}/\${key}\`
  }

  async getSignedUrl(key: string, expiresIn = 3600): Promise<string> {
    return getSignedUrl(this.s3, new GetObjectCommand({ Bucket: this.bucket, Key: key }), { expiresIn })
  }

  artifactKey(userId: string, projectId: string, filename: string): string {
    return \`artifacts/\${userId}/\${projectId}/\${Date.now()}-\${filename}\`
  }
}
\`\`\`

## Cloudflare R2 (No egress fees — cheaper!)
\`\`\`ts
// Same AWS SDK, just different endpoint:
private s3 = new S3Client({
  region: 'auto',
  endpoint: \`https://\${process.env.CF_ACCOUNT_ID}.r2.cloudflarestorage.com\`,
  credentials: {
    accessKeyId: process.env.CF_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CF_R2_SECRET_ACCESS_KEY!,
  },
})
\`\`\``
  },
  {
    id: 'billing',
    title: '9. Stripe Billing',
    content: `## Stripe Setup

### 1. Create Products (Stripe Dashboard)
- Products → Create → "Pro Plan" → $49/month → copy price_xxx
- Products → Create → "Enterprise" → $199/month → copy price_yyy

### 2. Billing Service
\`\`\`ts
// src/billing/billing.service.ts
import Stripe from 'stripe'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class BillingService {
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

  constructor(private prisma: PrismaService) {}

  async createCheckout(userId: string, priceId: string, email: string) {
    const session = await this.stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: email,
      success_url: \`\${process.env.FRONTEND_URL}/billing?success=true\`,
      cancel_url: \`\${process.env.FRONTEND_URL}/billing\`,
      metadata: { userId },
    })
    return session.url
  }

  async handleWebhook(payload: Buffer, sig: string) {
    const event = this.stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET!)

    if (event.type === 'checkout.session.completed') {
      const s = event.data.object as any
      const sub = await this.stripe.subscriptions.retrieve(s.subscription)
      const priceId = sub.items.data[0].price.id
      const plan = priceId === process.env.STRIPE_PRO_PRICE_ID ? 'PRO' : 'ENTERPRISE'

      await this.prisma.subscription.upsert({
        where: { userId: s.metadata.userId },
        create: {
          userId: s.metadata.userId,
          stripeCustomerId: s.customer,
          stripePriceId: priceId,
          stripeSubId: sub.id,
          plan: plan as any,
          status: sub.status,
          currentPeriodEnd: new Date(sub.current_period_end * 1000),
        },
        update: { plan: plan as any, status: sub.status },
      })
    }
  }
}
\`\`\`

### 3. Test Webhooks Locally
\`\`\`bash
brew install stripe/stripe-cli/stripe
stripe login
stripe listen --forward-to localhost:3001/billing/webhook
\`\`\``
  },
  {
    id: 'docker',
    title: '10. Docker + CI/CD + Deployment',
    content: `## Dockerfile (API)
\`\`\`dockerfile
# docker/Dockerfile.api
FROM node:20-alpine AS base
RUN npm install -g pnpm

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm --filter api build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY prisma ./prisma
EXPOSE 3001
CMD ["node", "dist/main.js"]
\`\`\`

## CI/CD: GitHub Actions
\`\`\`yaml
# .github/workflows/deploy-web.yml
name: Deploy Web
on:
  push:
    branches: [main]
    paths: ['apps/web/**']
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'pnpm' }
      - run: pnpm install --frozen-lockfile
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: \${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
\`\`\`

## Deploy Frontend → Vercel
\`\`\`bash
npm install -g vercel
cd apps/web
vercel --prod
vercel env add NEXT_PUBLIC_API_URL
vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
\`\`\`

## Deploy Backend → Railway
\`\`\`bash
npm install -g @railway/cli
railway login
railway init
railway add postgres
railway add redis
railway variables set OPENAI_API_KEY=sk-...
railway up
\`\`\`

## DNS Setup (Custom Domain)
\`\`\`
Namecheap / Cloudflare → your domain

For Vercel (frontend):
  A     @    76.76.21.21
  CNAME www  cname.vercel-dns.com

For Railway (backend API):
  CNAME api  yourapp.railway.app

SSL: Both Vercel and Railway auto-provision via Let's Encrypt
\`\`\``
  },
  {
    id: 'envvars',
    title: '11. All Environment Variables',
    content: `## Complete .env.example

\`\`\`bash
# ── DATABASE ────────────────────────────────────────
DATABASE_URL="postgresql://USER:PASS@HOST:5432/DB?sslmode=require"

# ── REDIS ───────────────────────────────────────────
REDIS_URL="rediss://USER:PASS@HOST:PORT"

# ── CLERK AUTH ──────────────────────────────────────
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_live_..."
CLERK_SECRET_KEY="sk_live_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/dashboard"

# ── AI ──────────────────────────────────────────────
OPENAI_API_KEY="sk-proj-..."
GEMINI_API_KEY="AI..."

# ── STRIPE ──────────────────────────────────────────
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PRO_PRICE_ID="price_..."
STRIPE_ENTERPRISE_PRICE_ID="price_..."

# ── AWS S3 ──────────────────────────────────────────
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="AKIA..."
AWS_SECRET_ACCESS_KEY="..."
AWS_S3_BUCKET="codepilot-ai-artifacts"

# ── CLOUDFLARE R2 (alternative to S3) ───────────────
CF_ACCOUNT_ID="..."
CF_R2_ACCESS_KEY_ID="..."
CF_R2_SECRET_ACCESS_KEY="..."
CF_R2_BUCKET_NAME="codepilot-artifacts"

# ── EMAIL ───────────────────────────────────────────
RESEND_API_KEY="re_..."
FROM_EMAIL="noreply@yourdomain.com"

# ── APP URLS ────────────────────────────────────────
FRONTEND_URL="https://yourdomain.com"
NEXT_PUBLIC_API_URL="https://api.yourdomain.com"

# ── MONITORING ──────────────────────────────────────
SENTRY_DSN="https://...@sentry.io/..."
NEXT_PUBLIC_SENTRY_DSN="https://...@sentry.io/..."

# ── GITHUB (repo integration) ────────────────────────
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."
\`\`\``
  },
  {
    id: 'export',
    title: '12. Exporting from Base44 + Migration Map',
    content: `## How to Export Your Base44 Code

### Method 1: GitHub Sync (Best)
1. Base44 Editor → Dashboard (top-left icon)
2. Settings → GitHub Sync
3. Connect GitHub → Create repo: codepilot-ai-export
4. Click Sync → all files pushed
5. Clone: git clone https://github.com/YOU/codepilot-ai-export

### What You Get from Export
\`\`\`
✅ All React pages (pages/*.jsx)
✅ All components (components/**/*.jsx)
✅ App.jsx router
✅ index.css design tokens
✅ tailwind.config.js
✅ Entity JSON schemas
\`\`\`

### Base44 SDK → Your Own API (Migration Map)
\`\`\`ts
// ─── BEFORE (Base44 SDK) ────────────────────────────
import { base44 } from '@/api/base44Client'

// List entities
const projects = await base44.entities.Project.list()

// Create entity
await base44.entities.Project.create({ name: 'My App' })

// Update entity  
await base44.entities.Project.update(id, { status: 'deployed' })

// Delete entity
await base44.entities.Project.delete(id)

// Auth
const user = await base44.auth.me()
base44.auth.loginWithProvider('google', '/dashboard')
base44.auth.logout()

// AI
const res = await base44.integrations.Core.InvokeLLM({ prompt: '...' })

// File upload
const { file_url } = await base44.integrations.Core.UploadFile({ file })


// ─── AFTER (Your Stack) ─────────────────────────────
import { useAuth } from '@clerk/nextjs'
import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'

// List
const { data: projects } = useQuery({
  queryKey: ['projects'],
  queryFn: () => api.get('/projects').then(r => r.data)
})

// Create
const create = useMutation({
  mutationFn: (data) => api.post('/projects', data),
  onSuccess: () => queryClient.invalidateQueries(['projects'])
})

// Auth
const { user, isLoaded } = useUser()     // Clerk hook
// Google login → configured automatically in Clerk dashboard

// AI (streaming)
const { run, output, isStreaming } = useAgentStream()
await run('CODE_GENERATOR', userInput)

// File upload → your own endpoint
const formData = new FormData()
formData.append('file', file)
const { data } = await api.post('/storage/upload', formData)
\`\`\``
  },
  {
    id: 'checklist',
    title: '13. Full Ownership Checklist',
    content: `## Verify 100% Independence

### Code & Repository
- [ ] All code in YOUR GitHub repo
- [ ] No Base44 imports remain in any file
- [ ] base44Client.js file deleted
- [ ] All base44.entities.X calls replaced with fetch/axios
- [ ] All base44.auth calls replaced with Clerk hooks

### Database
- [ ] PostgreSQL hosted on Neon / Supabase / your server
- [ ] All Prisma migrations have run
- [ ] npx prisma studio connects to YOUR database
- [ ] Data migrated from Base44 if needed

### Authentication
- [ ] Clerk account is yours (clerk.com)
- [ ] Google OAuth app in YOUR Google Cloud Console
- [ ] JWT tokens come from Clerk, not Base44

### AI
- [ ] OpenAI API key from YOUR account (platform.openai.com)
- [ ] Billing alerts set on YOUR OpenAI account
- [ ] Usage limits configured

### Payments
- [ ] Stripe account is yours
- [ ] Products/prices created in YOUR Stripe dashboard
- [ ] Webhook URL points to YOUR API
- [ ] Test mode → Live mode switched when ready

### Storage
- [ ] S3 bucket in YOUR AWS account
- [ ] IAM credentials are YOUR own
- [ ] No public bucket policy (signed URLs only)

### Hosting
- [ ] Frontend on YOUR Vercel account
- [ ] Backend on YOUR Railway/Render account
- [ ] Environment variables set in hosting dashboards

### Domain & SSL
- [ ] Domain registered in YOUR name
- [ ] DNS points to your servers
- [ ] SSL auto-provisioned by Vercel/Railway
- [ ] No base44.app subdomain used anywhere

### Branding
- [ ] "Base44" text removed from all UI
- [ ] Logo is yours
- [ ] Favicon is yours
- [ ] OG/meta tags use your domain

### Monitoring
- [ ] Sentry project is yours
- [ ] Error alerts go to YOUR email

---

✅ All boxes checked = You own 100% of CodePilot AI.`
  },
];