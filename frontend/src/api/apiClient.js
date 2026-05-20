const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class APIClient {
  async request(endpoint, options = {}) {
    const url = `${API_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `API error: ${response.status}`);
    }

    return response.json();
  }

  agents = {
    list: () => this.request('/agents'),
    run: (agentType, input) =>
      this.request('/agents/run', {
        method: 'POST',
        body: JSON.stringify({ agentType, input }),
      }),
  };
}

export const apiClient = new APIClient();
