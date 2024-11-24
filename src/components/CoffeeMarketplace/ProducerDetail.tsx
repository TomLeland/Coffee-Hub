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
  MapPin,
  Mountain,
  Scale,
  Sprout,
  Star,
  Target,
  Workflow
} from 'lucide-react'
import { producers } from './producerData'
import { coffees } from './data'
import { roasters } from './roasterData'
import { tastingNotes, categoryGradients } from './tastingNotes'
import { CoffeeCard } from './CoffeeCard'
import { ScrollArea } from "@/components/ui/scroll-area"
import { ProducerMap } from './ProducerMap'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer
} from 'recharts'

export function ProducerDetail() {
  const { id } = useParams()
  // Find producer by normalized name
  const producer = Object.values(producers).find(p => 
    p.name.toLowerCase().replace(/\s+/g, '-') === id
  )
  
  if (!producer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-stone-900 mb-4">Producer not found</h2>
          <Link 
            to="/producers"
            className="text-stone-600 hover:text-stone-900 flex items-center gap-2 justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to producers
          </Link>
        </div>
      </div>
    )
  }

  const producerCoffees = coffees.filter(coffee => coffee.producer === producer.name)
  
  // Calculate producer statistics
  const stats = {
    averageRating: producerCoffees.reduce((acc, coffee) => acc + coffee.rating, 0) / producerCoffees.length,
    totalCoffees: producerCoffees.length,
    roasters: new Set(producerCoffees.map(c => c.roaster)).size,
    processes: {} as Record<string, number>,
    flavorProfile: {} as Record<string, number>,
    characteristics: {
      acidity: 0,
      sweetness: 0,
      bitterness: 0
    }
  }

  // Calculate process distribution
  producerCoffees.forEach(coffee => {
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
    stats.characteristics[key as keyof typeof stats.characteristics] /= producerCoffees.length
  })

  // Get partner roasters
  const partnerRoasters = Array.from(new Set(producerCoffees.map(c => c.roaster)))
    .map(name => roasters[name])
    .filter(Boolean)

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#F5F1EA]/80 backdrop-blur-sm border-b border-stone-200/50">
        <div className="container mx-auto px-8 py-4">
          <Link 
            to="/producers"
            className="text-stone-600 hover:text-stone-900 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to producers
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
                  <Sprout className="w-8 h-8 text-stone-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-stone-900">{producer.name}</h1>
                  <div className="flex items-center gap-4 mt-1 text-stone-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{producer.location.region}, {producer.location.country}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Mountain className="w-4 h-4" />
                      <span>{producer.location.elevation}m</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-stone-600 leading-relaxed mb-6">
                {producer.description}
              </p>

              <div className="flex items-center gap-4">
                <div>
                  <div className="text-sm text-stone-500">Founded</div>
                  <div className="font-medium text-stone-900">{producer.founded}</div>
                </div>
                <div>
                  <div className="text-sm text-stone-500">Farm Size</div>
                  <div className="font-medium text-stone-900">{producer.farmSize}</div>
                </div>
              </div>
            </div>

            {/* Location Map */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-lg font-medium text-stone-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Location
              </h2>
              <div className="h-[300px] rounded-lg overflow-hidden">
                <ProducerMap producers={[producer]} />
              </div>
            </div>

            {/* Varieties & Processing */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-lg font-medium text-stone-900 mb-6 flex items-center gap-2">
                <Coffee className="w-5 h-5" />
                Coffee Production
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-stone-900 mb-2">Varieties Grown</h3>
                  <div className="flex flex-wrap gap-2">
                    {producer.varieties.map(variety => (
                      <span 
                        key={variety}
                        className="px-3 py-1 rounded-full text-sm bg-stone-50 text-stone-700"
                      >
                        {variety}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-stone-900 mb-2">Processing Methods</h3>
                  <div className="flex flex-wrap gap-2">
                    {producer.processes.map(process => (
                      <span 
                        key={process}
                        className="px-3 py-1 rounded-full text-sm bg-stone-50 text-stone-700"
                      >
                        {process}
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
                    {producer.certifications.map(cert => (
                      <span 
                        key={cert}
                        className="px-3 py-1 rounded-full text-sm bg-stone-50 text-stone-700 flex items-center gap-1"
                      >
                        <Award className="w-3.5 h-3.5" />
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
                {producer.socialImpact && (
                  <div>
                    <h3 className="text-sm font-medium text-stone-900 mb-2 flex items-center gap-1.5">
                      <Heart className="w-4 h-4" />
                      Social Impact
                    </h3>
                    <p className="text-stone-600">{producer.socialImpact}</p>
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
                Production Analysis
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
                    {stats.roasters}
                  </div>
                  <div className="text-sm text-stone-500">Partner Roasters</div>
                </div>
                <div>
                  <div className="text-3xl font-semibold text-stone-900">
                    {producer.processes.length}
                  </div>
                  <div className="text-sm text-stone-500">Processing Methods</div>
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

            {/* Partner Roasters */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-lg font-medium text-stone-900 mb-6 flex items-center gap-2">
                <Factory className="w-5 h-5" />
                Partner Roasters
              </h2>
              <div className="space-y-4">
                {partnerRoasters.map(roaster => (
                  <Link
                    key={roaster.name}
                    to={`/roaster/${roaster.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block p-4 rounded-lg bg-stone-50 hover:bg-stone-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center">
                        <Factory className="w-6 h-6 text-stone-600" />
                      </div>
                      <div>
                        <div className="font-medium text-stone-900">{roaster.name}</div>
                        <div className="text-sm text-stone-500">{roaster.location}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Available Coffees */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-lg font-medium text-stone-900 mb-6 flex items-center gap-2">
                <Star className="w-5 h-5" />
                Available Coffees
              </h2>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-4">
                  {producerCoffees
                    .sort((a, b) => b.rating - a.rating)
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