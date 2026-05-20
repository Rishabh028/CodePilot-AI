import { env } from '../config/env.js';

const isDevelopment = env.server.nodeEnv === 'development';

export const logInfo = (message, data = {}) => {
  console.log(`[INFO] ${new Date().toISOString()} - ${message}`, data);
};

export const logError = (message, error = null) => {
  console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, error);
};

export const logDebug = (message, data = {}) => {
  if (isDevelopment) {
    console.log(`[DEBUG] ${new Date().toISOString()} - ${message}`, data);
  }
};

export const logWarn = (message, data = {}) => {
  console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, data);
};
