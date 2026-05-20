import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from './env.js';

const SALT_ROUNDS = 10;

export const passwordUtils = {
  hashPassword: async (password) => {
    return bcrypt.hash(password, SALT_ROUNDS);
  },

  comparePassword: async (password, hash) => {
    return bcrypt.compare(password, hash);
  },
};

export const jwtUtils = {
  generateToken: (payload) => {
    return jwt.sign(payload, env.jwt.secret, {
      expiresIn: env.jwt.expire,
    });
  },

  verifyToken: (token) => {
    try {
      return jwt.verify(token, env.jwt.secret);
    } catch (error) {
      return null;
    }
  },

  decodeToken: (token) => {
    return jwt.decode(token);
  },

  generateRefreshToken: (payload) => {
    return jwt.sign(payload, env.jwt.secret, {
      expiresIn: '30d',
    });
  },
};

export const createAuthTokens = (userId, email) => {
  const payload = { userId, email };
  const accessToken = jwtUtils.generateToken(payload);
  const refreshToken = jwtUtils.generateRefreshToken(payload);

  return { accessToken, refreshToken };
};
