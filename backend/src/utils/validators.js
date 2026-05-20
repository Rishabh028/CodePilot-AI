import { isValidEmail } from './helpers.js';

export const validateEmail = (email) => {
  if (!email || !isValidEmail(email)) {
    return { valid: false, error: 'Invalid email address' };
  }
  return { valid: true };
};

export const validatePassword = (password) => {
  if (!password || password.length < 8) {
    return { valid: false, error: 'Password must be at least 8 characters' };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, error: 'Password must contain at least one uppercase letter' };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, error: 'Password must contain at least one number' };
  }
  return { valid: true };
};

export const validateProjectName = (name) => {
  if (!name || name.trim().length === 0) {
    return { valid: false, error: 'Project name is required' };
  }
  if (name.length > 100) {
    return { valid: false, error: 'Project name cannot exceed 100 characters' };
  }
  return { valid: true };
};

export const validateAgentInput = (input) => {
  if (!input || input.trim().length === 0) {
    return { valid: false, error: 'Input cannot be empty' };
  }
  return { valid: true };
};
