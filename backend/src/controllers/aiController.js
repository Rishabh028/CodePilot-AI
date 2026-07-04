import { callGenericLLM, getAIProviderStatus } from '../services/aiService.js';

export const invokeLLM = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

    const result = await callGenericLLM(prompt);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to invoke LLM' });
  }
};

export const getStatus = async (req, res) => {
  const status = getAIProviderStatus();
  try {
    if (status.geminiConfigured) {
      const result = await callGenericLLM('Reply with the word "OK" only.');
      status.testResult = 'Success';
      status.testOutput = result.output;
    }
  } catch (e) {
    status.testResult = 'Failed';
    status.testError = e.message;
    status.testErrorStack = e.stack;
  }
  res.json(status);
};
