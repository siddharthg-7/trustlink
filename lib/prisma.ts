import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Ensure database is initialized
if (process.env.NODE_ENV === 'development') {
  prisma.$connect().catch((error) => {
    console.error('Failed to connect to database:', error)
    console.error('Make sure DATABASE_URL is set and database exists')
  })
}

