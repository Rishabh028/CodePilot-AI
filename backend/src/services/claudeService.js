import { Anthropic } from '@anthropic-ai/sdk';
import { env } from '../config/env.js';
import { logError } from '../utils/logger.js';

// Initialize Claude client if API key is available
const client = env.anthropic?.apiKey ? new Anthropic({ apiKey: env.anthropic.apiKey }) : null;

/**
 * Call Claude API directly
 * @param {string} prompt - The prompt to send to Claude
 * @returns {Promise<object>} Response with output and tokens used
 */
export async function callClaudeAPI(prompt) {
  try {
    if (!client) {
      throw new Error('Claude not configured. Please set ANTHROPIC_API_KEY in .env');
    }

    const message = await client.messages.create({
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
      model: 'claude-3-5-sonnet-20241022',
    };
  } catch (error) {
    logError('Claude API error', error);
    throw error;
  }
}

/**
 * Check if Claude is configured
 */
export function isClaudeConfigured() {
  return !!client;
}
