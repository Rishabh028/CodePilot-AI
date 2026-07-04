import { GoogleGenerativeAI } from '@google/generative-ai';
import { Anthropic } from '@anthropic-ai/sdk';
import { callMockAI } from './mockAIService.js';
import { env } from '../config/env.js';
import { logInfo, logError } from '../utils/logger.js';

// Initialize clients
const googleAI = env.gemini?.apiKey ? new GoogleGenerativeAI(env.gemini.apiKey) : null;
const anthropicClient = env.anthropic?.apiKey ? new Anthropic({ apiKey: env.anthropic.apiKey }) : null;

// Determine which provider to use
const PRIMARY_PROVIDER = env.gemini?.apiKey ? 'gemini' : env.anthropic?.apiKey ? 'claude' : null;

if (!PRIMARY_PROVIDER) {
  logError('No AI provider configured. Please set GEMINI_API_KEY or ANTHROPIC_API_KEY');
}

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

Format everything clearly with headers, code blocks for technical content.

CRITICAL INSTRUCTION: You MUST format your ENTIRE response as a SINGLE valid JSON object enclosed in a \`\`\`json block. The JSON object must match this schema:
{
  "summary": "Executive summary...",
  "requirements": "Detailed markdown of all generated requirements"
}`,

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

Use TypeScript/JavaScript, modern patterns, proper error handling. Provide actual code, not placeholders.

CRITICAL INSTRUCTION: You MUST format your ENTIRE response as a SINGLE valid JSON object enclosed in a \`\`\`json block. The JSON object must match this schema:
{
  "summary": "Detailed explanation of the code generated...",
  "files": [
    { "name": "filename.js", "path": "src/filename.js", "language": "javascript", "content": "actual code..." }
  ]
}`,

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

CRITICAL INSTRUCTION: You MUST format your ENTIRE response as a SINGLE valid JSON object enclosed in a \`\`\`json block. The JSON object must match this schema:
{
  "summary": "Detailed overall review summary...",
  "issues": [
    { "severity": "High", "file": "path", "description": "issue description", "fix": "code fix" }
  ]
}`,

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

CRITICAL INSTRUCTION: You MUST format your ENTIRE response as a SINGLE valid JSON object enclosed in a \`\`\`json block. The JSON object must match this schema:
{
  "summary": "Detailed security audit summary...",
  "vulnerabilities": [
    { "severity": "CRITICAL", "type": "SQL Injection", "description": "...", "remediation": "..." }
  ]
}`,

  testing: (p) => `You are a Testing Expert AI. Generate comprehensive test suites.

Code/Feature: ${p}

Generate:
1. **Unit Tests** — All functions, edge cases, error paths
2. **Integration Tests** — API endpoints, database operations
3. **E2E Tests** — User workflows (Playwright/Cypress)
4. **Mock/Stub Setup** — External dependencies
5. **Test Data Factories** — Fixtures and seeders
6. **Coverage Configuration** — vitest/jest config for 90%+

CRITICAL INSTRUCTION: You MUST format your ENTIRE response as a SINGLE valid JSON object enclosed in a \`\`\`json block. The JSON object must match this schema:
{
  "summary": "Explanation of the testing strategy...",
  "files": [
    { "name": "test_file.spec.js", "path": "tests/test_file.spec.js", "language": "javascript", "content": "actual test code..." }
  ]
}`,

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

CRITICAL INSTRUCTION: You MUST format your ENTIRE response as a SINGLE valid JSON object enclosed in a \`\`\`json block. The JSON object must match this schema:
{
  "summary": "Summary of generated documentation...",
  "files": [
    { "name": "README.md", "path": "README.md", "language": "markdown", "content": "..." }
  ]
}`,

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

CRITICAL INSTRUCTION: You MUST format your ENTIRE response as a SINGLE valid JSON object enclosed in a \`\`\`json block. The JSON object must match this schema:
{
  "summary": "Deployment strategy summary...",
  "files": [
    { "name": "Dockerfile", "path": "Dockerfile", "language": "dockerfile", "content": "..." }
  ]
}`,

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

CRITICAL INSTRUCTION: You MUST format your ENTIRE response as a SINGLE valid JSON object enclosed in a \`\`\`json block. The JSON object must match this schema:
{
  "summary": "Performance audit summary...",
  "optimizations": [
    { "category": "Database", "issue": "N+1 query", "recommendation": "Use eager loading", "code": "..." }
  ]
}`,
};

/**
 * Call Google Gemini API
 */
async function callGemini(prompt) {
  try {
    if (!googleAI) {
      throw new Error('Google Gemini not configured. Set GEMINI_API_KEY in .env');
    }

    // Use the latest available Gemini models
    // Note: Free tier has rate limits; paid tiers are recommended for production
    const modelNames = [
      'gemini-1.5-flash',
      'gemini-1.5-flash-latest',
      'gemini-1.5-pro',
      'gemini-1.5-pro-latest',
      'gemini-pro',
      'gemini-1.0-pro'
    ];
    
    let result;
    let lastError;
    
    for (const modelName of modelNames) {
      try {
        const model = googleAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        
        logInfo(`Gemini API success with model: ${modelName}`);
        return {
          output: text,
          tokens_used: 0,
          provider: 'gemini',
        };
      } catch (err) {
        lastError = err;
        logInfo(`Model ${modelName} not available, trying next...`, { error: err.message });
      }
    }
    
    // If all models fail
    throw lastError || new Error('No Gemini models available');
  } catch (error) {
    logError('Gemini API error', error);
    throw error;
  }
}

/**
 * Call Claude API (Anthropic)
 */
async function callClaude(prompt) {
  try {
    if (!anthropicClient) {
      throw new Error('Claude not configured. Set ANTHROPIC_API_KEY in .env');
    }

    const message = await anthropicClient.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const output = message.content[0].type === 'text' ? message.content[0].text : '';

    return {
      output,
      tokens_used: message.usage?.output_tokens || 0,
      provider: 'claude',
    };
  } catch (error) {
    logError('Claude API error', error);
    throw error;
  }
}

/**
 * Invoke an agent with the configured AI provider
 */
export async function invokeAgent(agentType, input) {
  try {
    logInfo(`Invoking agent: ${agentType} with provider: ${PRIMARY_PROVIDER}`);

    const promptFn = AGENT_PROMPTS[agentType];
    if (!promptFn) {
      throw new Error(`Unknown agent type: ${agentType}`);
    }

    const fullPrompt = promptFn(input);

    let result;
    let lastError;

    // Try primary provider first
    if (PRIMARY_PROVIDER === 'gemini') {
      try {
        result = await callGemini(fullPrompt);
      } catch (error) {
        lastError = error;
        logError('Gemini failed', error);
        if (anthropicClient) {
          try {
            result = await callClaude(fullPrompt);
          } catch (claudeError) {
            lastError = claudeError;
            logError('Claude failed', claudeError);
            throw claudeError;
          }
        } else {
          throw error;
        }
      }
    } else if (PRIMARY_PROVIDER === 'claude') {
      try {
        result = await callClaude(fullPrompt);
      } catch (error) {
        lastError = error;
        logError('Claude failed', error);
        if (googleAI) {
          try {
            result = await callGemini(fullPrompt);
          } catch (geminiError) {
            lastError = geminiError;
            logError('Gemini failed', geminiError);
            throw geminiError;
          }
        } else {
          throw error;
        }
      }
    } else {
      // No provider configured, use mock
      logInfo('No real AI provider configured, using mock AI');
      result = await callMockAI(agentType, input);
    }

    logInfo(`Agent ${agentType} completed successfully with ${result.provider}`);

    return {
      success: true,
      ...result,
    };
  } catch (error) {
    logError(`Agent invocation failed: ${agentType}`, error);
    throw error;
  }
}

/**
 * Generic LLM invocation
 */
export async function callGenericLLM(prompt) {
  try {
    let result;
    if (PRIMARY_PROVIDER === 'gemini') {
      result = await callGemini(prompt);
    } else if (PRIMARY_PROVIDER === 'claude') {
      result = await callClaude(prompt);
    } else {
      result = await callMockAI('generic', prompt);
    }
    return result;
  } catch (error) {
    logError('Generic LLM invocation failed', error);
    throw error;
  }
}

/**
 * Get AI provider status
 */
export function getAIProviderStatus() {
  return {
    primaryProvider: PRIMARY_PROVIDER || 'mock-demo',
    geminiConfigured: !!googleAI,
    claudeConfigured: !!anthropicClient,
    mockAvailable: true,
    note: PRIMARY_PROVIDER ? 'Using real API' : 'Using mock AI for testing. Add GEMINI_API_KEY or ANTHROPIC_API_KEY to use real APIs.',
  };
}
