import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  Coffee as CoffeeIcon, 
  CupSoda, 
  Droplets, 
  Gauge, 
  Leaf, 
  MapPin, 
  Scale, 
  ThermometerSun,
  Factory,
  Users,
  Workflow,
  Star,
  UserCircle2
} from 'lucide-react'
import { coffees } from './data'
import { tastingNotes, categoryIcons } from './tastingNotes'
import { Background } from './Background'
import { Sidebar } from './Sidebar'
import { CoffeeReviews } from './CoffeeReviews'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { type Coffee as CoffeeType } from './types'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer
} from 'recharts'

// Mock user perception data - in a real app, this would come from aggregated reviews
const mockUserPerception = {
  notes: ['Chocolate', 'Caramel', 'Nutty'],
  characteristics: {
    acidity: 0.6,
    sweetness: 0.8,
    bitterness: 0.4
  },
  body: "Medium",
  mouthfeel: ["Creamy", "Smooth"],
  rating: 4.2,
  totalReviews: 128
}

function CharacteristicsComparison({ official, perceived }: { 
  official: Record<string, number>,
  perceived: Record<string, number>
}) {
  return (
    <div className="space-y-4">
      {Object.entries(official).map(([key, value]) => (
        <div key={key} className="space-y-2">
          <div className="flex justify-between text-sm text-stone-500 capitalize">
            <span>{key}</span>
            <span>Official vs User Perceived</span>
          </div>
          <div className="flex gap-2">
            <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary"
                style={{ width: `${value * 100}%` }}
              />
            </div>
            <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-stone-600"
                style={{ width: `${perceived[key] * 100}%` }}
              />
            </div>
          </div>
          <div className="flex justify-between text-sm text-stone-600">
            <span>{(value * 10).toFixed(1)}/10</span>
            <span>{(perceived[key] * 10).toFixed(1)}/10</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function FlavorComparison({ official, perceived }: {
  official: string[],
  perceived: string[]
}) {
  const allNotes = Array.from(new Set([...official, ...perceived]))
  const categories = Array.from(new Set(allNotes.map(note => tastingNotes[note]?.category)))

  return (
    <div className="space-y-6">
      {categories.map(category => {
        if (!category) return null
        const Icon = categoryIcons[category]
        
        const notesInCategory = allNotes.filter(note => 
          tastingNotes[note]?.category === category
        )

        return (
          <div key={category}>
            <h4 className="text-sm font-medium text-stone-700 mb-3 flex items-center gap-2">
              <Icon className="w-4 h-4" />
              {category}
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {notesInCategory.map(note => {
                const isOfficial = official.includes(note)
                const isPerceived = perceived.includes(note)
                const { gradient } = tastingNotes[note] || {}
                const [startColor, endColor] = gradient || []

                return (
                  <div 
                    key={note}
                    className="flex items-center justify-between p-2 rounded-lg bg-stone-50"
                    style={{
                      background: isOfficial && isPerceived
                        ? `linear-gradient(135deg, ${startColor}, ${endColor})`
                        : undefined
                    }}
                  >
                    <span className={`text-sm ${
                      isOfficial && isPerceived ? 'text-white' : 'text-stone-700'
                    }`}>
                      {note}
                    </span>
                    <div className="flex gap-2">
                      {isOfficial && (
                        <Factory className={`w-4 h-4 ${
                          isOfficial && isPerceived ? 'text-white' : 'text-stone-600'
                        }`} />
                      )}
                      {isPerceived && (
                        <UserCircle2 className={`w-4 h-4 ${
                          isOfficial && isPerceived ? 'text-white' : 'text-stone-600'
                        }`} />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function CoffeeDetail() {
  const { id } = useParams()
  const coffee = coffees.find(c => 
    c.name.toLowerCase().replace(/\s+/g, '-') === id
  )

  if (!coffee) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-stone-900 mb-4">Coffee not found</h2>
          <Link 
            to="/"
            className="text-stone-600 hover:text-stone-900 flex items-center gap-2 justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to collection
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen font-sans antialiased bg-[#FAF7F2]">
      <Background />
      <Sidebar isOpen={false} onClose={() => {}} hoveredCoffee={null} />

      <div className="md:pl-64">
        <header className="sticky top-0 z-40 bg-stone-900/90 backdrop-blur-sm border-b border-stone-700">
          <div className="flex items-center gap-4 px-8 py-4">
            <Link 
              to="/"
              className="text-stone-400 hover:text-white flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to collection
            </Link>
            <div className="flex-1" />
            <div className="text-xl font-semibold text-white">
              ${coffee.price.toFixed(2)}
            </div>
          </div>
        </header>

        <main className="container mx-auto px-8 py-12 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column - Details */}
            <div className="space-y-6">
              {/* Coffee Name and Basic Info */}
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h2 className="text-3xl font-semibold text-stone-800 mb-2">{coffee.name}</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-stone-600">
                    <Factory className="w-4 h-4" />
                    <span>{coffee.roaster}</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-600">
                    <Users className="w-4 h-4" />
                    <span>{coffee.producer}</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-600">
                    <MapPin className="w-4 h-4" />
                    <span>{coffee.origin}</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-600">
                    <Workflow className="w-4 h-4" />
                    <span>{coffee.process}</span>
                  </div>
                </div>
              </div>

              {/* Tabbed View for Official vs Perceived */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <Tabs defaultValue="official" className="w-full">
                  <div className="px-8 pt-8 pb-4 border-b border-stone-200">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-medium text-stone-900">Flavor Profile</h3>
                      <TabsList className="bg-stone-100">
                        <TabsTrigger 
                          value="official"
                          className="data-[state=active]:bg-primary data-[state=active]:text-white"
                        >
                          <Factory className="w-4 h-4 mr-2" />
                          Roaster's Notes
                        </TabsTrigger>
                        <TabsTrigger 
                          value="perceived"
                          className="data-[state=active]:bg-stone-800 data-[state=active]:text-white"
                        >
                          <UserCircle2 className="w-4 h-4 mr-2" />
                          User Perceived
                        </TabsTrigger>
                      </TabsList>
                    </div>
                  </div>

                  <TabsContent value="official" className="p-8 focus-visible:outline-none">
                    <div className="space-y-8">
                      {/* Tasting Notes */}
                      <div>
                        <h4 className="text-sm font-medium text-stone-700 mb-3 flex items-center gap-2">
                          <Leaf className="w-4 h-4" />
                          Tasting Notes
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {coffee.notes.map((note) => {
                            const { gradient, category } = tastingNotes[note]
                            const Icon = categoryIcons[category]
                            const [startColor, endColor] = gradient
                            return (
                              <span 
                                key={note} 
                                className="text-sm px-4 py-1.5 rounded-full text-white
                                  flex items-center gap-1.5"
                                style={{
                                  background: `linear-gradient(135deg, ${startColor}, ${endColor})`
                                }}
                              >
                                <Icon className="w-3.5 h-3.5" />
                                <span>{note}</span>
                              </span>
                            )
                          })}
                        </div>
                      </div>

                      {/* Characteristics */}
                      <div>
                        <h4 className="text-sm font-medium text-stone-700 mb-3 flex items-center gap-2">
                          <Scale className="w-4 h-4" />
                          Characteristics
                        </h4>
                        <div className="space-y-3">
                          {Object.entries(coffee.characteristics).map(([key, value]) => (
                            <div key={key} className="flex items-center gap-2">
                              <div className="w-24 text-sm text-stone-600 capitalize">{key}</div>
                              <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-primary"
                                  style={{ width: `${value * 100}%` }}
                                />
                              </div>
                              <div className="w-12 text-sm text-stone-600 text-right">
                                {Math.round(value * 10)}/10
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Body & Mouthfeel */}
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-medium text-stone-700 mb-2 flex items-center gap-2">
                            <Gauge className="w-4 h-4" />
                            Body
                          </h4>
                          <div className="text-2xl font-medium text-stone-900">
                            {coffee.body}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-stone-700 mb-2 flex items-center gap-2">
                            <Droplets className="w-4 h-4" />
                            Mouthfeel
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {coffee.mouthfeel.map(feel => (
                              <span 
                                key={feel}
                                className="px-3 py-1 rounded-full text-sm font-medium bg-stone-50 text-stone-700"
                              >
                                {feel}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="perceived" className="p-8 focus-visible:outline-none">
                    <div className="space-y-8">
                      {/* User Rating Overview */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                            <span className="text-2xl font-semibold text-stone-900">
                              {mockUserPerception.rating.toFixed(1)}
                            </span>
                          </div>
                          <div className="text-sm text-stone-500">
                            Based on {mockUserPerception.totalReviews} reviews
                          </div>
                        </div>
                      </div>

                      {/* Comparison Sections */}
                      <div className="space-y-8">
                        <div>
                          <h4 className="text-sm font-medium text-stone-700 mb-4">
                            Flavor Profile Comparison
                          </h4>
                          <FlavorComparison 
                            official={coffee.notes}
                            perceived={mockUserPerception.notes}
                          />
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-stone-700 mb-4">
                            Characteristics Comparison
                          </h4>
                          <CharacteristicsComparison 
                            official={coffee.characteristics}
                            perceived={mockUserPerception.characteristics}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-sm font-medium text-stone-700 mb-2">Body</h4>
                            <div className="flex items-center gap-4">
                              <div>
                                <div className="text-sm text-stone-500">Official</div>
                                <div className="font-medium text-stone-900">{coffee.body}</div>
                              </div>
                              <div className="text-stone-300">vs</div>
                              <div>
                                <div className="text-sm text-stone-500">Perceived</div>
                                <div className="font-medium text-stone-900">
                                  {mockUserPerception.body}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium text-stone-700 mb-2">Mouthfeel</h4>
                            <div className="flex items-center gap-4">
                              <div className="flex-1">
                                <div className="text-sm text-stone-500">Official</div>
                                <div className="flex flex-wrap gap-1">
                                  {coffee.mouthfeel.map(feel => (
                                    <span 
                                      key={feel}
                                      className="px-2 py-0.5 rounded-full text-xs bg-stone-100 text-stone-700"
                                    >
                                      {feel}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div className="text-stone-300">vs</div>
                              <div className="flex-1">
                                <div className="text-sm text-stone-500">Perceived</div>
                                <div className="flex flex-wrap gap-1">
                                  {mockUserPerception.mouthfeel.map(feel => (
                                    <span 
                                      key={feel}
                                      className="px-2 py-0.5 rounded-full text-xs bg-stone-100 text-stone-700"
                                    >
                                      {feel}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Brewing Recommendations */}
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h3 className="text-lg font-medium text-stone-900 mb-4 flex items-center gap-2">
                  <ThermometerSun className="w-5 h-5" />
                  <span>Brewing Recommendations</span>
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-stone-600 mb-1">Temperature</div>
                    <div className="font-medium text-stone-900">195°F - 205°F</div>
                  </div>
                  <div>
                    <div className="text-sm text-stone-600 mb-1">Ratio</div>
                    <div className="font-medium text-stone-900">1:16 - 1:17</div>
                  </div>
                  <div>
                    <div className="text-sm text-stone-600 mb-1">Grind Size</div>
                    <div className="font-medium text-stone-900">Medium-Fine</div>
                  </div>
                  <div>
                    <div className="text-sm text-stone-600 mb-1">Brew Time</div>
                    <div className="font-medium text-stone-900">3:30 - 4:00</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Hero Image */}
              <div className="sticky top-24">
                <div className="relative bg-stone-100 rounded-2xl overflow-hidden aspect-square mb-6">
                  <div className="absolute inset-0 opacity-25">
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(135deg, ${coffee.notes
                          .map(note => tastingNotes[note]?.gradient[0] || '')
                          .filter(Boolean)
                          .join(', ')})`,
                        filter: 'blur(50px) saturate(1.5)',
                        transform: 'scale(1.2)',
                      }}
                    />
                  </div>
                  <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-32 h-32 rounded-2xl border-2 border-stone-200 flex items-center justify-center text-stone-700 bg-white/80 backdrop-blur-sm mb-6">
                      <CoffeeIcon className="w-16 h-16" />
                    </div>
                  </div>
                </div>

                {/* Reviews Section */}
                <CoffeeReviews coffeeId={coffee.name} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}