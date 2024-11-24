import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ReviewForm } from './ReviewForm'
import { ReviewList } from './ReviewList'
import { type Review } from './types'

interface CoffeeReviewsProps {
  coffeeId: string
}

export function CoffeeReviews({ coffeeId }: CoffeeReviewsProps) {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviews, setReviews] = useState<Review[]>([])

  const handleReviewSubmit = (reviewData: Omit<Review, 'id' | 'createdAt'>) => {
    const newReview: Review = {
      ...reviewData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date()
    }
    setReviews(prev => [newReview, ...prev])
    setShowReviewForm(false)
  }

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-stone-900">Reviews</h3>
        <Button 
          variant="outline"
          onClick={() => setShowReviewForm(!showReviewForm)}
        >
          {showReviewForm ? 'Cancel' : 'Write a Review'}
        </Button>
      </div>

      {showReviewForm && (
        <div className="mb-8 p-6 bg-stone-50 rounded-lg border border-stone-100">
          <ReviewForm 
            coffeeId={coffeeId}
            onSubmit={handleReviewSubmit}
          />
        </div>
      )}

      <ReviewList reviews={reviews} />
    </div>
  )
}