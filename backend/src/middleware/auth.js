import { jwtUtils } from '../config/auth.js';
import { getPrismaClient } from '../config/database.js';

const prisma = getPrismaClient();

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No authorization token provided' });
    }

    const token = authHeader.substring(7);
    const decoded = jwtUtils.verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    const targetId = decoded.userId || decoded.id || decoded.sub || decoded.user_id;
    
    // Verify user exists in database or fallback by email
    let user = null;
    if (targetId) {
      user = await prisma.user.findUnique({ where: { id: targetId } });
    }
    if (!user && decoded.email) {
      user = await prisma.user.findUnique({ where: { email: decoded.email } });
    }

    if (!user) {
      console.log('authMiddleware: User not found in database for token:', targetId, decoded.email);
      return res.status(401).json({ error: 'User account no longer exists. Please sign in again.' });
    }

    req.user = {
      ...decoded,
      userId: user.id,
      id: user.id,
      email: user.email
    };
    next();
  } catch (error) {
    console.error('authMiddleware error:', error);
    res.status(401).json({ error: 'Authentication failed' });
  }
};

export const optionalAuthMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const decoded = jwtUtils.verifyToken(token);

      if (decoded) {
        const targetId = decoded.userId || decoded.id || decoded.sub || decoded.user_id;
        let user = null;
        if (targetId) {
          user = await prisma.user.findUnique({ where: { id: targetId } });
        }
        if (!user && decoded.email) {
          user = await prisma.user.findUnique({ where: { email: decoded.email } });
        }

        if (user) {
          req.user = {
            ...decoded,
            userId: user.id,
            id: user.id,
            email: user.email
          };
        }
      }
    }

    next();
  } catch (error) {
    next();
  }
};
