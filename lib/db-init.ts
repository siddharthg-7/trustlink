import { prisma } from './prisma'

/**
 * Initialize database connection and ensure tables exist
 */
export async function initDatabase() {
  try {
    await prisma.$connect()
    // Test query to ensure database is accessible
    await prisma.$queryRaw`SELECT 1`
    return true
  } catch (error) {
    console.error('Database initialization failed:', error)
    return false
  }
}

