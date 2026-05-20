import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { env } from './env.js';

let prisma;

export const getPrismaClient = () => {
  if (!prisma) {
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: env.database.url,
        },
      },
    });

    if (env.server.nodeEnv === 'development') {
      prisma.$on('query', (e) => {
        console.log('Query: ' + e.query);
        console.log('Params: ' + JSON.stringify(e.params));
        console.log('Duration: ' + e.duration + 'ms');
      });
    }
  }

  return prisma;
};

export const disconnectPrisma = async () => {
  if (prisma) {
    await prisma.$disconnect();
  }
};
