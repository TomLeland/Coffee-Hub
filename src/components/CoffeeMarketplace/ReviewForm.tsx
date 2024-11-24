import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { type Review } from './types'
import { tastingNotes } from './tastingNotes'

interface ReviewFormProps {
  coffeeId: string
  onSubmit: (review: Omit<Review, 'id' | 'createdAt'>) => void
}

export function ReviewForm({ coffeeId, onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(3)
  const [comment, setComment] = useState('')
  const [selectedNotes, setSelectedNotes] = useState<string[]>([])
  const [characteristics, setCharacteristics] = useState({
    acidity: 0.5,
    sweetness: 0.5,
    bitterness: 0.5
  })
  const [body, setBody] = useState<"Light" | "Medium" | "Full">("Medium")
  const [selectedMouthfeel, setSelectedMouthfeel] = useState<("Syrupy" | "Creamy" | "Silky" | "Juicy")[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      coffeeId,
      rating,
      comment,
      notes: selectedNotes,
      characteristics,
      body,
      mouthfeel: selectedMouthfeel,
      userName: "Anonymous" // In a real app, this would come from auth
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Rating */}
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-2">Rating</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              className={`w-12 h-12 rounded-lg text-lg font-medium transition-all duration-200 ${
                value <= rating
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      {/* Comment */}
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-2">
          Your Review
        </label>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts about this coffee..."
          className="min-h-[100px]"
        />
      </div>

      {/* Tasting Notes */}
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-2">
          Tasting Notes
        </label>
        <div className="flex flex-wrap gap-2">
          {Object.entries(tastingNotes).map(([note, { color }]) => (
            <button
              key={note}
              type="button"
              onClick={() => {
                setSelectedNotes(prev => 
                  prev.includes(note) 
                    ? prev.filter(n => n !== note)
                    : [...prev, note]
                )
              }}
              className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                selectedNotes.includes(note)
                  ? 'text-white shadow-md'
                  : 'text-stone-700 bg-stone-50'
              }`}
              style={{
                backgroundColor: selectedNotes.includes(note) ? color : undefined
              }}
            >
              {note}
            </button>
          ))}
        </div>
      </div>

      {/* Characteristics */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-stone-700">
          Characteristics
        </label>
        
        <div className="space-y-6">
          {Object.entries(characteristics).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm text-stone-600 capitalize">
                  {key}
                </label>
                <span className="text-sm text-stone-600">
                  {Math.round(value * 10)}/10
                </span>
              </div>
              <Slider
                value={[value * 10]}
                min={0}
                max={10}
                step={1}
                onValueChange={([newValue]) => {
                  setCharacteristics(prev => ({
                    ...prev,
                    [key]: newValue / 10
                  }))
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-2">
          Body
        </label>
        <div className="flex gap-2">
          {["Light", "Medium", "Full"].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setBody(value as typeof body)}
              className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
                body === value
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      {/* Mouthfeel */}
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-2">
          Mouthfeel
        </label>
        <div className="flex flex-wrap gap-2">
          {["Syrupy", "Creamy", "Silky", "Juicy"].map((feel) => (
            <button
              key={feel}
              type="button"
              onClick={() => {
                setSelectedMouthfeel(prev => 
                  prev.includes(feel as any)
                    ? prev.filter(f => f !== feel)
                    : [...prev, feel as any]
                )
              }}
              className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
                selectedMouthfeel.includes(feel as any)
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {feel}
            </button>
          ))}
        </div>
      </div>

      <Button 
        type="submit"
        className="w-full"
        disabled={!rating || !comment}
      >
        Submit Review
      </Button>
    </form>
  )
}