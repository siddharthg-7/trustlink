import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '')
    const user = await getCurrentUser(token || null)

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const [totalPosts, flaggedPosts, totalReports, totalUsers] = await Promise.all([
      prisma.post.count(),
      prisma.post.count({ where: { status: 'FLAGGED' } }),
      prisma.report.count(),
      prisma.user.count(),
    ])

    return NextResponse.json({
      totalPosts,
      flaggedPosts,
      totalReports,
      totalUsers,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

