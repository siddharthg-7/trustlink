import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import { calculateTrustMeter } from '@/lib/utils'
import { z } from 'zod'

const voteSchema = z.object({
  isUpvote: z.boolean(),
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
    const { isUpvote } = voteSchema.parse(body)

    // Check if vote exists
    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId: params.id,
        },
      },
    })

    const post = await prisma.post.findUnique({
      where: { id: params.id },
    })

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    if (existingVote) {
      // Update existing vote
      if (existingVote.isUpvote === isUpvote) {
        // Remove vote if clicking same button
        await prisma.vote.delete({
          where: { id: existingVote.id },
        })

        await prisma.post.update({
          where: { id: params.id },
          data: {
            upvotes: isUpvote ? { decrement: 1 } : undefined,
            downvotes: !isUpvote ? { decrement: 1 } : undefined,
          },
        })
      } else {
        // Change vote
        await prisma.vote.update({
          where: { id: existingVote.id },
          data: { isUpvote },
        })

        await prisma.post.update({
          where: { id: params.id },
          data: {
            upvotes: isUpvote ? { increment: 1 } : { decrement: 1 },
            downvotes: !isUpvote ? { increment: 1 } : { decrement: 1 },
          },
        })
      }
    } else {
      // Create new vote
      await prisma.vote.create({
        data: {
          userId: user.id,
          postId: params.id,
          isUpvote,
        },
      })

      await prisma.post.update({
        where: { id: params.id },
        data: {
          upvotes: isUpvote ? { increment: 1 } : undefined,
          downvotes: !isUpvote ? { increment: 1 } : undefined,
        },
      })
    }

    // Recalculate trust meter
    const updatedPost = await prisma.post.findUnique({
      where: { id: params.id },
    })

    if (updatedPost) {
      const trustMeter = calculateTrustMeter(updatedPost.upvotes, updatedPost.downvotes)
      await prisma.post.update({
        where: { id: params.id },
        data: { trustMeter },
      })
    }

    // Return current vote status
    const currentVote = await prisma.vote.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId: params.id,
        },
      },
    })

    return NextResponse.json({ 
      message: 'Vote updated',
      vote: currentVote 
    })
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

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '')
    const user = await getCurrentUser(token || null)

    if (!user) {
      return NextResponse.json({ vote: null })
    }

    const vote = await prisma.vote.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId: params.id,
        },
      },
    })

    return NextResponse.json({ vote })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
