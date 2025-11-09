import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import { z } from 'zod'

const postSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  sourceLink: z.string().url(),
  category: z.enum(['PROMOTION', 'INTERNSHIP', 'SCAM_REPORT']),
  tags: z.array(z.string()).optional(),
  imageUrl: z.string().url().optional(),
  fileUrl: z.string().url().optional(),
})

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const sort = searchParams.get('sort') || 'latest'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = (page - 1) * limit

    const where: any = {}
    if (category && category !== 'all') {
      where.category = category
    }
    if (search) {
      // SQLite doesn't support case-insensitive mode, so we use contains
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
        { tags: { contains: search } },
      ]
    }

    const orderBy: any = {}
    if (sort === 'latest') {
      orderBy.createdAt = 'desc'
    } else if (sort === 'trusted') {
      orderBy.trustMeter = 'desc'
    } else if (sort === 'reported') {
      orderBy.downvotes = 'desc'
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              username: true,
              image: true,
              verifiedBadge: true,
            },
          },
          _count: {
            select: {
              votes: true,
              reports: true,
            },
          },
        },
      }),
      prisma.post.count({ where }),
    ])

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '')
    const user = await getCurrentUser(token || null)

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const data = postSchema.parse(body)

    // Call AI verification service if available
    let aiConfidenceScore = 50 // Default neutral score
    let aiSuspiciousScore = 50
    
    try {
      const aiServiceUrl = process.env.AI_VERIFICATION_API_URL
      if (aiServiceUrl) {
        const aiResponse = await fetch(`${aiServiceUrl}/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: data.title,
            description: data.description,
            sourceLink: data.sourceLink,
            category: data.category,
            tags: data.tags || [],
          }),
        })
        
        if (aiResponse.ok) {
          const aiData = await aiResponse.json()
          aiConfidenceScore = aiData.confidenceScore || 50
          aiSuspiciousScore = aiData.suspiciousScore || 50
        }
      }
    } catch (error) {
      // If AI service fails, use default scores
      console.error('AI verification service error:', error)
    }

    const post = await prisma.post.create({
      data: {
        ...data,
        tags: JSON.stringify(data.tags || []),
        authorId: user.id,
        aiConfidenceScore,
        aiSuspiciousScore,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
            verifiedBadge: true,
          },
        },
      },
    })

    return NextResponse.json({ post }, { status: 201 })
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

