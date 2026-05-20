import dotenv from 'dotenv';

dotenv.config();

// Check if at least one AI provider is configured
const hasGemini = !!process.env.GEMINI_API_KEY;
const hasClaude = !!process.env.ANTHROPIC_API_KEY;

if (!hasGemini && !hasClaude) {
  console.warn(
    'WARNING: No AI provider configured. Please set either GEMINI_API_KEY or ANTHROPIC_API_KEY in your .env file'
  );
}

const requiredVars = [
  'DATABASE_URL',
  'JWT_SECRET',
];

requiredVars.forEach((varName) => {
  if (!process.env[varName]) {
    throw new Error(`Environment variable ${varName} is not set`);
  }
});

export const env = {
  database: {
    url: process.env.DATABASE_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expire: process.env.JWT_EXPIRE || '7d',
  },
  gemini: {
    apiKey: process.env.GEMINI_API_KEY,
  },
  anthropic: {
    apiKey: process.env.ANTHROPIC_API_KEY,
  },
  server: {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucketName: process.env.AWS_BUCKET_NAME,
    region: process.env.AWS_REGION || 'us-east-1',
  },
  email: {
    smtpHost: process.env.SMTP_HOST,
    smtpPort: process.env.SMTP_PORT,
    smtpUser: process.env.SMTP_USER,
    smtpPassword: process.env.SMTP_PASSWORD,
    senderEmail: process.env.SENDER_EMAIL,
  },
  github: {
    token: process.env.GITHUB_TOKEN,
    apiUrl: process.env.GITHUB_API_URL || 'https://api.github.com',
  },
};
