'use client'

import Link from 'next/link'
import { ThumbsUp, ThumbsDown, Flag, ExternalLink, CheckCircle } from 'lucide-react'
import { formatDate, getCategoryColor, getCategoryLabel, calculateTrustMeter } from '@/lib/utils'

interface PostCardProps {
  post: {
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
  userVote?: boolean | null
  onVote?: (postId: string, isUpvote: boolean) => void
  onReport?: (postId: string) => void
}

export default function PostCard({ post, userVote, onVote, onReport }: PostCardProps) {
  const tags = post.tags ? JSON.parse(post.tags) : []
  const categoryColor = getCategoryColor(post.category)
  const trustMeter = calculateTrustMeter(post.upvotes, post.downvotes)

  const handleVote = (isUpvote: boolean) => {
    if (onVote) {
      onVote(post.id, isUpvote)
    }
  }

  const handleReport = () => {
    if (onReport) {
      onReport(post.id)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Category Bar */}
      <div className={`h-1 ${categoryColor}`} />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {post.title}
              </h3>
              {post.isVerified && (
                <CheckCircle className="w-5 h-5 text-green-500" title="Verified" />
              )}
              {post.status === 'FLAGGED' && (
                <span className="px-2 py-1 text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded">
                  Flagged
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <span>{post.author.name || post.author.username || 'Anonymous'}</span>
              {post.author.verifiedBadge && (
                <span className="px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                  Verified User
                </span>
              )}
              <span>•</span>
              <span>{formatDate(post.createdAt)}</span>
            </div>
          </div>
          <span className={`px-3 py-1 text-xs font-medium text-white rounded-full ${categoryColor}`}>
            {getCategoryLabel(post.category)}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
          {post.description}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag: string, idx: number) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* AI Confidence & Trust Meter */}
        <div className="mb-4 space-y-2">
          {post.aiConfidenceScore !== null && post.aiConfidenceScore !== undefined && (
            <div>
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                <span>AI Confidence</span>
                <span>{Math.round(post.aiConfidenceScore)}% Genuine</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all"
                  style={{ width: `${post.aiConfidenceScore}%` }}
                />
              </div>
            </div>
          )}
          <div>
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
              <span>Community Trust</span>
              <span>{trustMeter}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all"
                style={{ width: `${trustMeter}%` }}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleVote(true)}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg transition-colors ${
                userVote === true
                  ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span>{post.upvotes}</span>
            </button>
            <button
              onClick={() => handleVote(false)}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg transition-colors ${
                userVote === false
                  ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900'
              }`}
            >
              <ThumbsDown className="w-4 h-4" />
              <span>{post.downvotes}</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href={post.sourceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 px-3 py-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="text-sm">Visit Link</span>
            </a>
            {onReport && (
              <button
                onClick={handleReport}
                className="flex items-center space-x-1 px-3 py-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <Flag className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

