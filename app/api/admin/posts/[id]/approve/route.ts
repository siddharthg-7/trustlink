import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '')
    const user = await getCurrentUser(token || null)

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const post = await prisma.post.update({
      where: { id: params.id },
      data: {
        status: 'VERIFIED',
        isVerified: true,
        verifiedBy: user.id,
        verifiedAt: new Date(),
      },
    })

    // Mark all reports as resolved
    await prisma.report.updateMany({
      where: { postId: params.id, status: 'PENDING' },
      data: { status: 'RESOLVED', reviewedAt: new Date() },
    })

    return NextResponse.json({ post })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

