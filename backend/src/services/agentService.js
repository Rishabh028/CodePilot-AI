import { invokeAgent as invokeAIAgent, getAIProviderStatus } from './aiService.js';
import { logInfo, logError } from '../utils/logger.js';

/**
 * Wrapper around the AI service to invoke agents
 */
export async function invokeAgent(agentType, input) {
  try {
    logInfo(`Agent service: Invoking ${agentType}`);
    const result = await invokeAIAgent(agentType, input);
    return {
      success: true,
      output: result.output,
      tokens_used: result.tokens_used || 0,
      provider: result.provider,
    };
  } catch (error) {
    logError(`Agent invocation failed: ${agentType}`, error);
    throw error;
  }
}

/**
 * Get the current AI provider status
 */
export function getProviderStatus() {
  return getAIProviderStatus();
}
