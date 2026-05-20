import { Anthropic } from '@anthropic-ai/sdk';
import { env } from '../config/env.js';
import { logInfo, logError } from '../utils/logger.js';

const client = new Anthropic({
  apiKey: env.anthropic.apiKey,
});

const AGENT_PROMPTS = {
  requirements: (p) => `You are an elite Requirements Analyst AI. Produce comprehensive structured output for this project.

Project/Request: ${p}

Generate:
1. Executive Summary
2. User Stories (with acceptance criteria)
3. System Architecture Overview
4. Database Schema (tables, columns, relationships)
5. API Endpoints specification
6. Tech Stack recommendation with reasoning
7. Project folder structure
8. Implementation phases and milestones
9. Risk assessment
10. Success metrics

Format everything clearly with headers, code blocks for technical content.`,

  code_generator: (p) => `You are an elite Full-Stack Code Generator AI. Generate production-ready code.

Request: ${p}

Generate complete, working code including:
1. Project structure overview
2. Main application files with full implementations
3. Database schema and migrations
4. API routes/controllers
5. Frontend components
6. Configuration files (package.json, tsconfig, etc.)
7. Docker setup
8. Environment variables template (.env.example)
9. README with setup instructions

Use TypeScript, modern patterns, proper error handling. Provide actual code, not placeholders.`,

  code_review: (p) => `You are an expert Code Reviewer AI. Perform a thorough review.

Code/Context: ${p}

Analyze and report:
1. **Summary** — Overall quality assessment (score /10)
2. **Critical Issues** — Bugs, security holes, breaking problems
3. **Performance** — Bottlenecks, inefficient algorithms, N+1 queries
4. **Security** — Vulnerabilities, injection risks, auth issues
5. **Code Quality** — Readability, naming, complexity
6. **Best Practices** — Pattern violations, anti-patterns
7. **Specific Fixes** — Code examples for each issue
8. **Recommendations** — Architecture improvements

For each issue: file path, line number (if applicable), severity, and fix.`,

  security: (p) => `You are a Security Analyst AI. Conduct a thorough security audit.

Code/System: ${p}

Check and report:
1. **Critical Vulnerabilities** (CVSS 9-10)
2. **SQL Injection** risks with exploit examples
3. **XSS** (Stored, Reflected, DOM-based)
4. **CSRF** vulnerabilities
5. **Authentication/Authorization** flaws
6. **Hardcoded Secrets** and sensitive data exposure
7. **Dependency Vulnerabilities** (known CVEs)
8. **Insecure Configurations** (CORS, headers, etc.)
9. **Rate Limiting** and DoS risks
10. **Auto-fix code snippets** for each vulnerability

Format with severity levels: CRITICAL / HIGH / MEDIUM / LOW / INFO`,

  testing: (p) => `You are a Testing Expert AI. Generate comprehensive test suites.

Code/Feature: ${p}

Generate:
1. **Unit Tests** — All functions, edge cases, error paths
2. **Integration Tests** — API endpoints, database operations
3. **E2E Tests** — User workflows (Playwright/Cypress)
4. **Mock/Stub Setup** — External dependencies
5. **Test Data Factories** — Fixtures and seeders
6. **Coverage Configuration** — vitest/jest config for 90%+

Use Vitest syntax. Include:
- Happy path tests
- Error case tests  
- Edge cases (empty, null, overflow)
- Async/await patterns
- Mock implementations`,

  documentation: (p) => `You are a Technical Writer AI. Generate production-quality documentation.

Project/Code: ${p}

Generate:
1. **README.md** — Full project README with badges, installation, usage, API reference
2. **API Documentation** — OpenAPI 3.0 spec with all endpoints, schemas, examples
3. **Architecture Overview** — System design, data flow, component diagram (text-based)
4. **Developer Onboarding Guide** — Local setup, environment, contributing guide
5. **Deployment Guide** — Production deployment steps
6. **Changelog Template** — CHANGELOG.md structure
7. **Code Comments** — JSDoc/TSDoc examples for key functions

Format all docs in proper Markdown.`,

  deployment: (p) => `You are a DevOps Engineer AI. Generate complete deployment infrastructure.

Application: ${p}

Generate all files:
1. **Dockerfile** — Multi-stage, optimized, production-ready
2. **docker-compose.yml** — Full stack with all services
3. **.github/workflows/deploy.yml** — CI/CD pipeline (test, build, deploy)
4. **nginx.conf** — Reverse proxy configuration
5. **kubernetes/** — Deployment, Service, Ingress YAML manifests
6. **scripts/deploy.sh** — Automated deployment script
7. **.env.example** — All environment variables documented
8. **Health check endpoints** — /health, /ready implementations
9. **Monitoring setup** — Prometheus metrics, logging config

Use best practices: non-root user, health checks, secrets management.`,

  performance: (p) => `You are a Performance Engineering AI. Analyze and optimize for maximum performance.

System/Code: ${p}

Analyze and provide:
1. **Performance Audit** — Current bottlenecks identified
2. **Database Optimization** — Slow queries, missing indexes, N+1 fixes
3. **Caching Strategy** — Redis patterns, cache invalidation, CDN
4. **API Optimization** — Response pagination, compression, batch requests
5. **Frontend Performance** — Bundle splitting, lazy loading, Core Web Vitals
6. **Memory Management** — Leak detection, optimization patterns
7. **Concurrency** — Async patterns, worker threads, queue systems
8. **Monitoring** — APM setup, metrics to track
9. **Benchmark Results** — Expected improvements with changes
10. **Implementation Roadmap** — Priority order of optimizations

Provide specific code examples for each optimization.`,
};

export async function invokeAgent(agentType, input) {
  try {
    logInfo(`Invoking agent: ${agentType}`);

    const promptFn = AGENT_PROMPTS[agentType];
    if (!promptFn) {
      throw new Error(`Unknown agent type: ${agentType}`);
    }

    const fullPrompt = promptFn(input);

    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: fullPrompt,
        },
      ],
    });

    const output = message.content[0].type === 'text' ? message.content[0].text : '';

    logInfo(`Agent ${agentType} completed successfully`);

    return {
      success: true,
      output,
      tokens_used: message.usage?.output_tokens || 0,
    };
  } catch (error) {
    logError(`Agent invocation failed: ${agentType}`, error);
    throw error;
  }
}
