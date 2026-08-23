FROM node:26.7.0-alpine

WORKDIR /app

# Copy package files
COPY backend/package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY backend/src ./src
COPY backend/prisma ./prisma

# Generate Prisma client
RUN npx prisma generate

# Expose port
EXPOSE 5000

# Start server
CMD ["npm", "start"]
