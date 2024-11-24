import { useParams, Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  Award,
  Building2,
  Calendar,
  Coffee,
  Factory,
  Globe,
  GraduationCap,
  Heart,
  Scale,
  Star,
  Target
} from 'lucide-react'
import { roasters } from './roasterData'
import { coffees } from './data'
import { tastingNotes, categoryGradients } from './tastingNotes'
import { CoffeeCard } from './CoffeeCard'
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer
} from 'recharts'

export function RoasterDetail() {
  const { id } = useParams()
  // Find roaster by normalized name
  const roaster = Object.values(roasters).find(r => 
    r.name.toLowerCase().replace(/\s+/g, '-') === id
  )
  
  if (!roaster) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-stone-900 mb-4">Roaster not found</h2>
          <Link 
            to="/roasters"
            className="text-stone-600 hover:text-stone-900 flex items-center gap-2 justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to roasters
          </Link>
        </div>
      </div>
    )
  }

  const roasterCoffees = coffees.filter(coffee => coffee.roaster === roaster.name)
  
  // Calculate roaster statistics
  const stats = {
    averageRating: roasterCoffees.reduce((acc, coffee) => acc + coffee.rating, 0) / roasterCoffees.length,
    totalCoffees: roasterCoffees.length,
    processes: {} as Record<string, number>,
    producers: new Set(roasterCoffees.map(c => c.producer)).size,
    origins: new Set(roasterCoffees.map(c => c.origin)).size,
    flavorProfile: {} as Record<string, number>,
    characteristics: {
      acidity: 0,
      sweetness: 0,
      bitterness: 0
    }
  }

  // Calculate process distribution
  roasterCoffees.forEach(coffee => {
    stats.processes[coffee.process] = (stats.processes[coffee.process] || 0) + 1
    
    // Calculate average characteristics
    stats.characteristics.acidity += coffee.characteristics.acidity
    stats.characteristics.sweetness += coffee.characteristics.sweetness
    stats.characteristics.bitterness += coffee.characteristics.bitterness

    // Calculate flavor category distribution
    coffee.notes.forEach(note => {
      const category = tastingNotes[note]?.category
      if (category) {
        stats.flavorProfile[category] = (stats.flavorProfile[category] || 0) + 1
      }
    })
  })

  // Convert to percentages and prepare for radar chart
  const totalNotes = Object.values(stats.flavorProfile).reduce((a, b) => a + b, 0)
  const flavorData = Object.entries(stats.flavorProfile).map(([category, count]) => ({
    category,
    value: (count / totalNotes) * 100
  }))

  // Average out characteristics
  Object.keys(stats.characteristics).forEach(key => {
    stats.characteristics[key as keyof typeof stats.characteristics] /= roasterCoffees.length
  })

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#F5F1EA]/80 backdrop-blur-sm border-b border-stone-200/50">
        <div className="container mx-auto px-8 py-4">
          <Link 
            to="/roasters"
            className="text-stone-600 hover:text-stone-900 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to roasters
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-stone-100 flex items-center justify-center">
                  <Factory className="w-8 h-8 text-stone-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-stone-900">{roaster.name}</h1>
                  <div className="flex items-center gap-4 mt-1 text-stone-600">
                    <div className="flex items-center gap-1">
                      <Building2 className="w-4 h-4" />
                      <span>{roaster.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Est. {roaster.founded}</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-stone-600 leading-relaxed mb-6">
                {roaster.description}
              </p>

              <div className="flex items-center gap-2">
                <a 
                  href={roaster.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-stone-600 hover:text-stone-900"
                >
                  <Globe className="w-4 h-4" />
                  <span>Visit Website</span>
                </a>
              </div>
            </div>

            {/* Philosophy & Approach */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-lg font-medium text-stone-900 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Philosophy & Approach
              </h2>
              <p className="text-stone-600 leading-relaxed mb-6">
                {roaster.philosophy}
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-stone-900 mb-2">Roasting Style</h3>
                  <p className="text-stone-600">{roaster.roastingStyle}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-stone-900 mb-2">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {roaster.specialties.map(specialty => (
                      <span 
                        key={specialty}
                        className="px-3 py-1 rounded-full text-sm bg-stone-50 text-stone-700"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications & Impact */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-lg font-medium text-stone-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Certifications & Impact
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-stone-900 mb-2">Certifications</h3>
                  <div className="flex flex-wrap gap-2">
                    {roaster.certifications.map(cert => (
                      <span 
                        key={cert}
                        className="px-3 py-1 rounded-full text-sm bg-stone-50 text-stone-700"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
                {roaster.socialImpact && (
                  <div>
                    <h3 className="text-sm font-medium text-stone-900 mb-2 flex items-center gap-1.5">
                      <Heart className="w-4 h-4" />
                      Social Impact
                    </h3>
                    <p className="text-stone-600">{roaster.socialImpact}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Statistics */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-lg font-medium text-stone-900 mb-6 flex items-center gap-2">
                <Scale className="w-5 h-5" />
                Roaster Analysis
              </h2>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="text-3xl font-semibold text-stone-900">
                    {stats.averageRating.toFixed(1)}
                  </div>
                  <div className="text-sm text-stone-500">Average Rating</div>
                </div>
                <div>
                  <div className="text-3xl font-semibold text-stone-900">
                    {stats.totalCoffees}
                  </div>
                  <div className="text-sm text-stone-500">Total Coffees</div>
                </div>
                <div>
                  <div className="text-3xl font-semibold text-stone-900">
                    {stats.producers}
                  </div>
                  <div className="text-sm text-stone-500">Producers</div>
                </div>
                <div>
                  <div className="text-3xl font-semibold text-stone-900">
                    {stats.origins}
                  </div>
                  <div className="text-sm text-stone-500">Origins</div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Process Distribution */}
                <div>
                  <h3 className="text-sm font-medium text-stone-900 mb-3">Process Methods</h3>
                  <div className="space-y-2">
                    {Object.entries(stats.processes).map(([process, count]) => (
                      <div key={process} className="flex items-center gap-2">
                        <div className="text-sm text-stone-600 w-24">{process}</div>
                        <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-stone-600"
                            style={{ 
                              width: `${(count / stats.totalCoffees) * 100}%` 
                            }}
                          />
                        </div>
                        <div className="text-sm text-stone-600 w-12 text-right">
                          {Math.round((count / stats.totalCoffees) * 100)}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Flavor Profile */}
                <div>
                  <h3 className="text-sm font-medium text-stone-900 mb-3">Flavor Profile</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={flavorData}>
                        <PolarGrid />
                        <PolarAngleAxis 
                          dataKey="category"
                          tick={{ fill: '#78716c', fontSize: 12 }}
                        />
                        <Radar
                          name="Flavor Profile"
                          dataKey="value"
                          stroke="#292524"
                          fill="#292524"
                          fillOpacity={0.1}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Average Characteristics */}
                <div>
                  <h3 className="text-sm font-medium text-stone-900 mb-3">Average Characteristics</h3>
                  <div className="space-y-2">
                    {Object.entries(stats.characteristics).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-2">
                        <div className="text-sm text-stone-600 w-24 capitalize">{key}</div>
                        <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-stone-600"
                            style={{ width: `${value * 100}%` }}
                          />
                        </div>
                        <div className="text-sm text-stone-600 w-12 text-right">
                          {Math.round(value * 10)}/10
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Popular Coffees */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-lg font-medium text-stone-900 mb-6 flex items-center gap-2">
                <Star className="w-5 h-5" />
                Popular Coffees
              </h2>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-4">
                  {roasterCoffees
                    .sort((a, b) => b.rating - a.rating)
                    .slice(0, 3)
                    .map((coffee) => (
                      <CoffeeCard key={coffee.name} coffee={coffee} />
                    ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}