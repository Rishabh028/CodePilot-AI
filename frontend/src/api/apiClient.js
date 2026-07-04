const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class APIClient {
  getToken() {
    return localStorage.getItem('codepilot_token');
  }

  setToken(token) {
    if (token) {
      localStorage.setItem('codepilot_token', token);
    } else {
      localStorage.removeItem('codepilot_token');
    }
  }

  async request(endpoint, options = {}) {
    const url = `${API_URL}${endpoint}`;
    const token = this.getToken();
    console.log(`[APIClient] ${options.method || 'GET'} ${endpoint} - Token present:`, !!token);
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    } else {
      headers['Authorization'] = `Bearer dummy_token_because_missing`;
    }
    console.log(`[APIClient] Headers being sent:`, headers);

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `API error: ${response.status}`);
    }

    return response.json();
  }

  auth = {
    login: (email, password) => this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
    register: (email, password, firstName, lastName) => this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, firstName, lastName }),
    }),
    googleAuth: (credential) => this.request('/auth/google', {
      method: 'POST',
      body: JSON.stringify({ credential }),
    }),
    me: () => this.request('/auth/me'),
    updateProfile: (data) => this.request('/auth/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    logout: () => {
      this.setToken(null);
      return this.request('/auth/logout', { method: 'POST' });
    },
    forgotPassword: (email) => this.request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),
  };

  projects = {
    list: () => this.request('/projects'),
    get: (id) => this.request(`/projects/${id}`),
    create: (data) => this.request('/projects', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => this.request(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => this.request(`/projects/${id}`, { method: 'DELETE' }),
  };

  agentRuns = {
    list: (projectId = null) => this.request(projectId ? `/agent-runs?project_id=${projectId}` : '/agent-runs'),
    create: (data) => this.request('/agent-runs', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => this.request(`/agent-runs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  };

  securityIssues = {
    list: () => this.request('/security-issues'),
    create: (data) => this.request('/security-issues', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => this.request(`/security-issues/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  };

  deployments = {
    list: () => this.request('/deployments'),
    create: (data) => this.request('/deployments', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => this.request(`/deployments/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  };

  testSuites = {
    list: () => this.request('/test-suites'),
    create: (data) => this.request('/test-suites', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => this.request(`/test-suites/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  };

  codeReviews = {
    list: () => this.request('/code-reviews'),
    create: (data) => this.request('/code-reviews', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => this.request(`/code-reviews/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  };

  ai = {
    invokeLLM: (prompt) => this.request('/ai/invoke-llm', { method: 'POST', body: JSON.stringify({ prompt }) }),
  };

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
