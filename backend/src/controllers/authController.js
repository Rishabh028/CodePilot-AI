import { OAuth2Client } from 'google-auth-library';
import { getPrismaClient } from '../config/database.js';
import { passwordUtils, createAuthTokens } from '../config/auth.js';

const prisma = getPrismaClient();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const passwordHash = await passwordUtils.hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        firstName,
        lastName,
      },
    });

    const tokens = createAuthTokens(user.id, user.email);
    res.status(201).json({ ...tokens, user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName } });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await passwordUtils.comparePassword(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const tokens = createAuthTokens(user.id, user.email);
    res.json({ ...tokens, user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { credential } = req.body;
    if (!credential) {
      return res.status(400).json({ error: 'Google credential is required' });
    }

    const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${credential}` }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch user info from Google');
    }
    
    const payload = await response.json();
    const { email, given_name, family_name, picture } = payload;

    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          passwordHash: 'google-oauth', // Placeholder for OAuth users
          firstName: given_name,
          lastName: family_name,
          avatar: picture,
        },
      });
    } else {
      // Optionally update profile picture or names
      await prisma.user.update({
        where: { id: user.id },
        data: { avatar: picture },
      });
    }

    const tokens = createAuthTokens(user.id, user.email);
    res.json({ ...tokens, user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, avatar: user.avatar } });
  } catch (error) {
    console.error('Google Auth error:', error);
    res.status(401).json({ error: 'Invalid Google credential' });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        avatar: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ error: 'Server error getting profile' });
  }
};

export const logout = (req, res) => {
  // In a stateless JWT setup, logout is handled client-side by deleting the token.
  res.json({ message: 'Logged out successfully' });
};

export const forgotPassword = async (req, res) => {
  // Stub for now. Would send email with reset link.
  res.json({ message: 'If an account exists, a reset link has been sent' });
};

export const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, password } = req.body;
    const userId = req.user.userId;

    const updateData = {};
    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    
    if (password) {
      updateData.passwordHash = await passwordUtils.hashPassword(password);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        avatar: true,
      }
    });

    res.json(updatedUser);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Server error updating profile' });
  }
};
