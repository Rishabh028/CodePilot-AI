import { jwtUtils } from '../config/auth.js';

export const authMiddleware = (req, res, next) => {
  try {
    console.log(`authMiddleware checking headers for ${req.method} ${req.path}`);
    const authHeader = req.headers.authorization;
    console.log('authHeader:', authHeader ? 'present' : 'missing');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('authMiddleware: No auth header or invalid format');
      return res.status(401).json({ error: 'No authorization token provided' });
    }

    const token = authHeader.substring(7);
    const decoded = jwtUtils.verifyToken(token);

    if (!decoded) {
      console.log('authMiddleware: Invalid or expired token', token);
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    const userId = decoded.userId || decoded.id || decoded.sub || decoded.user_id;
    req.user = {
      ...decoded,
      userId,
      id: userId
    };
    next();
  } catch (error) {
    console.error('authMiddleware error:', error);
    res.status(401).json({ error: 'Authentication failed' });
  }
};

export const optionalAuthMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const decoded = jwtUtils.verifyToken(token);

      if (decoded) {
        const userId = decoded.userId || decoded.id || decoded.sub || decoded.user_id;
        req.user = {
          ...decoded,
          userId,
          id: userId
        };
      }
    }

    next();
  } catch (error) {
    next();
  }
};
