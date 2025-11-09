import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import { z } from 'zod'

const reportSchema = z.object({
  reason: z.string().min(1),
  description: z.string().optional(),
})

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '')
    const user = await getCurrentUser(token || null)

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { reason, description } = reportSchema.parse(body)

    const post = await prisma.post.findUnique({
      where: { id: params.id },
    })

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    const report = await prisma.report.create({
      data: {
        userId: user.id,
        postId: params.id,
        reason,
        description,
      },
    })

    // Update post status if multiple reports
    const reportCount = await prisma.report.count({
      where: { postId: params.id, status: 'PENDING' },
    })

    if (reportCount >= 3) {
      await prisma.post.update({
        where: { id: params.id },
        data: { status: 'FLAGGED' },
      })
    }

    return NextResponse.json({ report }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

