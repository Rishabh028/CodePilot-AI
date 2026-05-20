import express from 'express';
import cors from 'cors';
import { Server as SocketIOServer } from 'socket.io';
import { createServer } from 'http';
import { env } from './config/env.js';
import { errorHandler, asyncHandler } from './middleware/errorHandler.js';
import { authMiddleware } from './middleware/auth.js';
import { logInfo, logError } from './utils/logger.js';
import { getPrismaClient, disconnectPrisma } from './config/database.js';

// Import routes
import agentRoutes from './routes/agents.js';
// import authRoutes from './routes/auth.js';
// import projectRoutes from './routes/projects.js';

const app = express();
const httpServer = createServer(app);

// Socket.io setup
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: env.server.frontendUrl,
    credentials: true,
  },
});

// Middleware
app.use(cors({
  origin: env.server.frontendUrl,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  logInfo(`${req.method} ${req.path}`, {
    query: req.query,
    body: req.body,
  });
  next();
});

// Health check endpoint
app.get('/health', asyncHandler(async (req, res) => {
  const prisma = getPrismaClient();
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      database: 'connected',
    });
  } catch (error) {
    res.status(503).json({
      status: 'error',
      message: 'Database connection failed',
    });
  }
}));

// API Routes
app.use('/api', (req, res) => {
  res.json({ message: 'CodePilot AI API v1.0.0' });
});

// Agent routes
app.use('/api/agents', agentRoutes);

// Routes to be implemented
// app.use('/api/auth', authRoutes);
// app.use('/api/projects', authMiddleware, projectRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.path,
  });
});

// Error handling middleware
app.use(errorHandler);

// Socket.io connection handling
io.on('connection', (socket) => {
  logInfo('New WebSocket connection', { socketId: socket.id });

  socket.on('disconnect', () => {
    logInfo('WebSocket disconnected', { socketId: socket.id });
  });

  socket.on('agent:subscribe', (data) => {
    const { agentRunId } = data;
    socket.join(`agent-run-${agentRunId}`);
    logInfo('Socket subscribed to agent run', { socketId: socket.id, agentRunId });
  });

  socket.on('agent:unsubscribe', (data) => {
    const { agentRunId } = data;
    socket.leave(`agent-run-${agentRunId}`);
    logInfo('Socket unsubscribed from agent run', { socketId: socket.id, agentRunId });
  });
});

// Make io accessible to routes
app.set('io', io);

// Start server
const PORT = env.server.port;
httpServer.listen(PORT, () => {
  logInfo(`Server running on port ${PORT}`);
  logInfo(`Environment: ${env.server.nodeEnv}`);
  logInfo(`Frontend URL: ${env.server.frontendUrl}`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  logInfo('SIGTERM received, shutting down gracefully');
  httpServer.close(() => {
    logInfo('HTTP server closed');
  });
  await disconnectPrisma();
  process.exit(0);
});

process.on('SIGINT', async () => {
  logInfo('SIGINT received, shutting down gracefully');
  httpServer.close(() => {
    logInfo('HTTP server closed');
  });
  await disconnectPrisma();
  process.exit(0);
});

export { app, io, httpServer };
