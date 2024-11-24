import { useState } from 'react'
import { Menu } from 'lucide-react'
import { motion } from 'framer-motion'
import { tastingNotes, categoryGradients, categoryIcons } from './tastingNotes'
import { Background } from './Background'
import { Sidebar } from './Sidebar'
import { ScrollArea } from "@/components/ui/scroll-area"
import { coffees } from './data'

export function FlavorMap() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedNote, setSelectedNote] = useState<string | null>(null)

  // Group notes by category
  const notesByCategory = Object.entries(tastingNotes).reduce((acc, [note, data]) => {
    if (!acc[data.category]) {
      acc[data.category] = []
    }
    acc[data.category].push({ note, ...data })
    return acc
  }, {} as Record<string, Array<{ note: string; gradient: [string, string]; category: string }>>)

  // Calculate popularity of each note
  const notePopularity = Object.entries(tastingNotes).reduce((acc, [note]) => {
    acc[note] = coffees.filter(coffee => coffee.notes.includes(note)).length
    return acc
  }, {} as Record<string, number>)

  // Get coffees with selected note
  const relatedCoffees = selectedNote 
    ? coffees.filter(coffee => coffee.notes.includes(selectedNote))
    : []

  return (
    <div className="min-h-screen font-sans antialiased bg-[#FAF7F2]">
      <Background />
      
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 md:hidden"
      >
        <Menu className="h-6 w-6 text-stone-700" />
      </button>

      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        hoveredCoffee={null}
      />

      <div className="md:pl-64">
        <header className="sticky top-0 z-40 bg-[#F5F1EA]/80 backdrop-blur-sm border-b border-stone-200/50">
          <div className="flex items-center justify-between px-8 py-4">
            <h2 className="text-lg font-semibold text-stone-800">Flavor Map</h2>
            <p className="text-sm text-stone-600">Explore Coffee Taste Profiles</p>
          </div>
        </header>

        <main className="container mx-auto px-8 py-12">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column - Flavor Map */}
            <div>
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h3 className="text-lg font-medium text-stone-900 mb-6">Interactive Flavor Map</h3>
                <div className="grid grid-cols-2 gap-6">
                  {Object.entries(notesByCategory).map(([category, notes]) => {
                    const Icon = categoryIcons[category]
                    const [startColor, endColor] = categoryGradients[category]
                    const isSelected = selectedCategory === category

                    return (
                      <motion.div
                        key={category}
                        className={`relative rounded-xl p-6 cursor-pointer transition-all duration-300
                          ${isSelected ? 'col-span-2' : ''}`}
                        style={{
                          background: `linear-gradient(135deg, ${startColor}, ${endColor})`,
                        }}
                        onClick={() => setSelectedCategory(isSelected ? null : category)}
                        layout
                      >
                        <div className="flex items-center gap-2 text-white mb-4">
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{category}</span>
                        </div>
                        
                        <motion.div 
                          className="grid grid-cols-2 sm:grid-cols-3 gap-2"
                          layout
                        >
                          {notes.map(({ note }) => {
                            const popularity = notePopularity[note]
                            const isNoteSelected = selectedNote === note

                            return (
                              <motion.button
                                key={note}
                                className={`px-3 py-1.5 rounded-full text-sm font-medium
                                  transition-all duration-300 relative overflow-hidden
                                  ${isNoteSelected 
                                    ? 'bg-white text-stone-900' 
                                    : 'bg-white/20 text-white hover:bg-white/30'}`}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setSelectedNote(isNoteSelected ? null : note)
                                }}
                                whileHover={{ scale: 1.05 }}
                                layout
                              >
                                <span>{note}</span>
                                <span className="text-xs opacity-60 ml-1">
                                  ({popularity})
                                </span>
                              </motion.button>
                            )
                          })}
                        </motion.div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Right Column - Selected Note Details */}
            <ScrollArea className="h-[calc(100vh-12rem)]">
              {selectedNote && (
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl p-8 shadow-sm">
                    <h3 className="text-lg font-medium text-stone-900 mb-2">
                      {selectedNote}
                    </h3>
                    <p className="text-sm text-stone-600 mb-4">
                      Found in {relatedCoffees.length} coffees
                    </p>
                    
                    <div className="space-y-4">
                      {relatedCoffees.map(coffee => {
                        const noteIndex = coffee.notes.indexOf(selectedNote)
                        return (
                          <div 
                            key={coffee.name}
                            className="p-4 rounded-lg bg-stone-50 hover:bg-stone-100 
                              transition-colors duration-200"
                          >
                            <div className="font-medium text-stone-900">
                              {coffee.name}
                            </div>
                            <div className="text-sm text-stone-600 mt-1">
                              {coffee.roaster}
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {coffee.notes.map((note, index) => (
                                <span
                                  key={note}
                                  className={`px-2 py-0.5 rounded-full text-xs
                                    ${note === selectedNote
                                      ? 'bg-stone-900 text-white'
                                      : 'bg-stone-200 text-stone-600'}`}
                                >
                                  {note}
                                </span>
                              ))}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Flavor Combinations */}
                  <div className="bg-white rounded-2xl p-8 shadow-sm">
                    <h3 className="text-lg font-medium text-stone-900 mb-4">
                      Common Combinations
                    </h3>
                    <div className="space-y-3">
                      {Object.entries(
                        relatedCoffees.reduce((acc, coffee) => {
                          coffee.notes
                            .filter(note => note !== selectedNote)
                            .forEach(note => {
                              acc[note] = (acc[note] || 0) + 1
                            })
                          return acc
                        }, {} as Record<string, number>)
                      )
                        .sort(([, a], [, b]) => b - a)
                        .slice(0, 5)
                        .map(([note, count]) => (
                          <div 
                            key={note}
                            className="flex items-center justify-between"
                          >
                            <span className="text-stone-900">{note}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-32 h-2 bg-stone-100 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-stone-900"
                                  style={{
                                    width: `${(count / relatedCoffees.length) * 100}%`
                                  }}
                                />
                              </div>
                              <span className="text-sm text-stone-600">
                                {Math.round((count / relatedCoffees.length) * 100)}%
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </ScrollArea>
          </div>
        </main>
      </div>
    </div>
  )
}