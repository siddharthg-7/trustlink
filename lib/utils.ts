import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  const d = new Date(date)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000)
  
  if (diffInSeconds < 60) return 'just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
  
  return d.toLocaleDateString()
}

export function calculateTrustMeter(upvotes: number, downvotes: number): number {
  const total = upvotes + downvotes
  if (total === 0) return 50 // Neutral
  return Math.round((upvotes / total) * 100)
}

export function getCategoryColor(category: string): string {
  switch (category) {
    case 'PROMOTION':
      return 'bg-blue-500'
    case 'INTERNSHIP':
      return 'bg-pink-500'
    case 'SCAM_REPORT':
      return 'bg-red-500'
    default:
      return 'bg-gray-500'
  }
}

export function getCategoryLabel(category: string): string {
  switch (category) {
    case 'PROMOTION':
      return 'Promotion'
    case 'INTERNSHIP':
      return 'Internship'
    case 'SCAM_REPORT':
      return 'Scam Report'
    default:
      return category
  }
}

