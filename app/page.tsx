'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import PostCard from '@/components/PostCard'
import { Filter, TrendingUp } from 'lucide-react'

interface Post {
  id: string
  title: string
  description: string
  sourceLink: string
  category: string
  imageUrl?: string
  tags: string
  aiConfidenceScore?: number
  trustMeter: number
  upvotes: number
  downvotes: number
  isVerified: boolean
  status: string
  createdAt: Date | string
  author: {
    id: string
    name?: string
    username?: string
    image?: string
    verifiedBadge?: boolean
  }
}

export default function Home() {
  const searchParams = useSearchParams()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState<string>('all')
  const [sort, setSort] = useState<string>('latest')
  const [search, setSearch] = useState<string>(searchParams.get('search') || '')
  const [userVotes, setUserVotes] = useState<Record<string, boolean | null>>({})

  useEffect(() => {
    fetchPosts()
  }, [category, sort, search])

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (category !== 'all') params.append('category', category)
      if (search) params.append('search', search)
      params.append('sort', sort)

      const res = await fetch(`/api/posts?${params.toString()}`)
      const data = await res.json()
      setPosts(data.posts || [])
      
      // Fetch user votes
      const token = localStorage.getItem('token')
      if (token) {
        // Fetch votes for each post
        const votes: Record<string, boolean | null> = {}
        for (const post of data.posts || []) {
          const voteRes = await fetch(`/api/posts/${post.id}/vote`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          if (voteRes.ok) {
            const voteData = await voteRes.json()
            votes[post.id] = voteData.vote?.isUpvote ?? null
          }
        }
        setUserVotes(votes)
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleVote = async (postId: string, isUpvote: boolean) => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login to vote')
      return
    }

    try {
      const res = await fetch(`/api/posts/${postId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isUpvote }),
      })

      if (res.ok) {
        // Update local state
        setUserVotes((prev) => ({
          ...prev,
          [postId]: prev[postId] === isUpvote ? null : isUpvote,
        }))
        // Refresh posts
        fetchPosts()
      }
    } catch (error) {
      console.error('Error voting:', error)
    }
  }

  const handleReport = async (postId: string) => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login to report')
      return
    }

    const reason = prompt('Why are you reporting this post?')
    if (!reason) return

    try {
      const res = await fetch(`/api/posts/${postId}/report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reason }),
      })

      if (res.ok) {
        alert('Report submitted. Thank you!')
      }
    } catch (error) {
      console.error('Error reporting:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Tabs */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setCategory('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              category === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            All Posts
          </button>
          <button
            onClick={() => setCategory('PROMOTION')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              category === 'PROMOTION'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            🔵 Promotions
          </button>
          <button
            onClick={() => setCategory('INTERNSHIP')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              category === 'INTERNSHIP'
                ? 'bg-pink-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            🌸 Internships
          </button>
          <button
            onClick={() => setCategory('SCAM_REPORT')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              category === 'SCAM_REPORT'
                ? 'bg-red-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            🔴 Scam Reports
          </button>
        </div>

        {/* Sort & Filter */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="latest">Latest</option>
              <option value="trusted">Most Trusted</option>
              <option value="reported">Most Reported</option>
            </select>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md animate-pulse-slow h-96"
            />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No posts found. Be the first to create one!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="animate-fade-in">
              <PostCard
                post={post}
                userVote={userVotes[post.id] ?? null}
                onVote={handleVote}
                onReport={handleReport}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
