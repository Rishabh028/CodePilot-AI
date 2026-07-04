import { callGenericLLM } from '../services/aiService.js';

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
