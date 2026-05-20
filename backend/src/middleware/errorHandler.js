import { logError } from '../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
  logError(err);

  if (err.name === 'PrismaClientValidationError') {
    return res.status(400).json({
      error: 'Invalid request data',
      details: err.message,
    });
  }

  if (err.name === 'PrismaClientKnownRequestError') {
    if (err.code === 'P2002') {
      return res.status(409).json({
        error: 'Unique constraint violation',
      });
    }
    if (err.code === 'P2025') {
      return res.status(404).json({
        error: 'Record not found',
      });
    }
  }

  if (err.statusCode) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  res.status(500).json({
    error: 'Internal server error',
  });
};

export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
