import { type Review } from './types'
import { ThumbsUp } from 'lucide-react'
import { tastingNotes } from './tastingNotes'

interface ReviewListProps {
  reviews: Review[]
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

export function ReviewList({ reviews }: ReviewListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {reviews.map((review) => (
        <div 
          key={review.id}
          className="bg-stone-50 rounded-xl p-6"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-semibold text-stone-900">
                    {review.rating}
                  </span>
                  <span className="text-sm text-stone-500">/5</span>
                </div>
                <span className="text-sm text-stone-600">
                  {formatDate(review.createdAt)}
                </span>
              </div>
              <p className="font-medium text-stone-900">{review.userName}</p>
            </div>
            <button className="text-stone-400 hover:text-stone-600">
              <ThumbsUp className="w-4 h-4" />
            </button>
          </div>

          <p className="text-stone-700 mb-6">{review.comment}</p>

          {/* Tasting Notes */}
          {review.notes.length > 0 && (
            <div className="mb-6">
              <p className="text-sm text-stone-600 mb-2">Tasting Notes</p>
              <div className="flex flex-wrap gap-2">
                {review.notes.map((note) => (
                  <span
                    key={note}
                    className="px-3 py-1 rounded-full text-sm text-white"
                    style={{
                      backgroundColor: tastingNotes[note]?.color
                    }}
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Characteristics */}
          <div className="space-y-2 mb-6">
            {Object.entries(review.characteristics).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2">
                <div className="w-20 text-sm text-stone-600 capitalize">
                  {key}
                </div>
                <div className="flex-1 h-2 bg-white rounded-full overflow-hidden">
                  <div
                    className="h-full bg-stone-600"
                    style={{ width: `${value * 100}%` }}
                  />
                </div>
                <div className="w-12 text-sm text-stone-600 text-right">
                  {Math.round(value * 10)}/10
                </div>
              </div>
            ))}
          </div>

          {/* Body and Mouthfeel */}
          <div className="flex gap-4">
            <div>
              <p className="text-sm text-stone-600 mb-1">Body</p>
              <span className="px-3 py-1 rounded-full text-sm bg-white text-stone-700">
                {review.body}
              </span>
            </div>
            <div>
              <p className="text-sm text-stone-600 mb-1">Mouthfeel</p>
              <div className="flex gap-2">
                {review.mouthfeel.map((feel) => (
                  <span
                    key={feel}
                    className="px-3 py-1 rounded-full text-sm bg-white text-stone-700"
                  >
                    {feel}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}