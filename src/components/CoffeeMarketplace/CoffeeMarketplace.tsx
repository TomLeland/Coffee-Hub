import { useState } from 'react'
import { Menu, ChevronDown, ChevronUp, Filter } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Background } from './Background'
import { CoffeeCard } from './CoffeeCard'
import { coffees } from './data'
import { Sidebar } from './Sidebar'
import { type Coffee } from './types'
import { tastingNotes } from './tastingNotes'

const categories = Array.from(new Set(Object.values(tastingNotes).map(note => note.category)))
const processes = Array.from(new Set(coffees.map(coffee => coffee.process)))
const origins = Array.from(new Set(coffees.map(coffee => coffee.origin)))
const roasters = Array.from(new Set(coffees.map(coffee => coffee.roaster)))
const producers = Array.from(new Set(coffees.map(coffee => coffee.producer)))
const mouthfeels = new Set(coffees.flatMap(coffee => coffee.mouthfeel))

interface RangeSectionProps {
  title: string
  value: number[]
  onChange: (value: number[]) => void
  min: number
  max: number
  step?: number
  formatValue?: (value: number) => string
}

function RangeSection({ title, value, onChange, min, max, step = 1, formatValue = v => v.toString() }: RangeSectionProps) {
  return (
    <div>
      <h3 className="text-sm font-medium text-stone-300 mb-3">{title}</h3>
      <div className="space-y-4">
        <div className="flex justify-between text-sm text-stone-400">
          <span>{formatValue(value[0])}</span>
          <span>{formatValue(value[1])}</span>
        </div>
        <Slider
          value={value}
          min={min}
          max={max}
          step={step}
          onValueChange={onChange}
          className="w-full"
        />
      </div>
    </div>
  )
}

interface FilterSectionProps {
  title: string
  items: string[]
  selected: string[]
  onSelect: (value: string[]) => void
}

function FilterSection({ title, items, selected, onSelect }: FilterSectionProps) {
  return (
    <div>
      <h3 className="text-sm font-medium text-stone-300 mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map(item => (
          <Button
            key={item}
            variant="outline"
            size="sm"
            className={`rounded-full border-2 transition-colors duration-200
              ${selected.includes(item)
                ? 'bg-primary text-white hover:bg-primary/90 border-primary'
                : 'bg-transparent hover:bg-primary hover:text-white border-stone-600 hover:border-primary text-stone-300'
              }`}
            onClick={() => {
              onSelect(
                selected.includes(item)
                  ? selected.filter(i => i !== item)
                  : [...selected, item]
              )
            }}
          >
            {item}
          </Button>
        ))}
      </div>
    </div>
  )
}

export function CoffeeMarketplace() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [hoveredCoffee, setHoveredCoffee] = useState<Coffee | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  
  const [selectedProcesses, setSelectedProcesses] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedOrigins, setSelectedOrigins] = useState<string[]>([])
  const [selectedRoasters, setSelectedRoasters] = useState<string[]>([])
  const [selectedProducers, setSelectedProducers] = useState<string[]>([])
  const [selectedMouthfeels, setSelectedMouthfeels] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 50])
  const [ratingRange, setRatingRange] = useState([0, 5])
  const [selectedBodies, setSelectedBodies] = useState<string[]>([])
  const [characteristicRanges, setCharacteristicRanges] = useState({
    acidity: [0, 1],
    sweetness: [0, 1],
    bitterness: [0, 1]
  })

  const filteredCoffees = coffees.filter(coffee => {
    if (selectedProcesses.length > 0 && !selectedProcesses.includes(coffee.process)) {
      return false
    }

    if (selectedCategories.length > 0) {
      const coffeeCategories = coffee.notes.map(note => tastingNotes[note]?.category)
      if (!selectedCategories.some(cat => coffeeCategories.includes(cat))) {
        return false
      }
    }

    if (selectedOrigins.length > 0 && !selectedOrigins.includes(coffee.origin)) {
      return false
    }

    if (selectedRoasters.length > 0 && !selectedRoasters.includes(coffee.roaster)) {
      return false
    }

    if (selectedProducers.length > 0 && !selectedProducers.includes(coffee.producer)) {
      return false
    }

    if (selectedMouthfeels.length > 0 && !selectedMouthfeels.some(feel => coffee.mouthfeel.includes(feel))) {
      return false
    }

    if (coffee.price < priceRange[0] || coffee.price > priceRange[1]) {
      return false
    }

    if (coffee.rating < ratingRange[0] || coffee.rating > ratingRange[1]) {
      return false
    }

    if (selectedBodies.length > 0 && !selectedBodies.includes(coffee.body)) {
      return false
    }

    const { acidity, sweetness, bitterness } = coffee.characteristics
    if (acidity < characteristicRanges.acidity[0] || acidity > characteristicRanges.acidity[1]) {
      return false
    }
    if (sweetness < characteristicRanges.sweetness[0] || sweetness > characteristicRanges.sweetness[1]) {
      return false
    }
    if (bitterness < characteristicRanges.bitterness[0] || bitterness > characteristicRanges.bitterness[1]) {
      return false
    }

    return true
  })

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
        hoveredCoffee={hoveredCoffee}
      />

      <div className="md:pl-64">
        <header className="sticky top-0 z-40 bg-stone-900/90 backdrop-blur-sm border-b border-stone-700">
          <div className="flex items-center justify-between px-8 py-4">
            <h2 className="text-lg font-semibold text-stone-100">Browse Collection</h2>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-stone-300 hover:text-white hover:bg-stone-800/80"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                {showFilters ? (
                  <ChevronUp className="w-4 h-4 ml-2" />
                ) : (
                  <ChevronDown className="w-4 h-4 ml-2" />
                )}
              </Button>
              <p className="text-sm text-stone-400">
                {filteredCoffees.length} coffees
              </p>
            </div>
          </div>

          {showFilters && (
            <div className="px-8 py-6 bg-stone-800/95 border-t border-stone-700/50">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="bg-stone-700/50 mb-6">
                  <TabsTrigger value="basic" className="data-[state=active]:bg-stone-600">
                    Basic Filters
                  </TabsTrigger>
                  <TabsTrigger value="flavor" className="data-[state=active]:bg-stone-600">
                    Flavor & Process
                  </TabsTrigger>
                  <TabsTrigger value="origins" className="data-[state=active]:bg-stone-600">
                    Origins & Producers
                  </TabsTrigger>
                  <TabsTrigger value="characteristics" className="data-[state=active]:bg-stone-600">
                    Characteristics
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <RangeSection
                      title="Price Range ($)"
                      value={priceRange}
                      onChange={setPriceRange}
                      min={0}
                      max={50}
                    />

                    <RangeSection
                      title="Rating"
                      value={ratingRange}
                      onChange={setRatingRange}
                      min={0}
                      max={5}
                      step={0.1}
                      formatValue={v => v.toFixed(1)}
                    />

                    <FilterSection
                      title="Body"
                      items={['Light', 'Medium', 'Full']}
                      selected={selectedBodies}
                      onSelect={setSelectedBodies}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="flavor" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FilterSection
                      title="Flavor Categories"
                      items={categories}
                      selected={selectedCategories}
                      onSelect={setSelectedCategories}
                    />

                    <div className="space-y-6">
                      <FilterSection
                        title="Process"
                        items={processes}
                        selected={selectedProcesses}
                        onSelect={setSelectedProcesses}
                      />

                      <FilterSection
                        title="Mouthfeel"
                        items={Array.from(mouthfeels)}
                        selected={selectedMouthfeels}
                        onSelect={setSelectedMouthfeels}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="origins" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FilterSection
                      title="Origins"
                      items={origins}
                      selected={selectedOrigins}
                      onSelect={setSelectedOrigins}
                    />

                    <FilterSection
                      title="Roasters"
                      items={roasters}
                      selected={selectedRoasters}
                      onSelect={setSelectedRoasters}
                    />

                    <FilterSection
                      title="Producers"
                      items={producers}
                      selected={selectedProducers}
                      onSelect={setSelectedProducers}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="characteristics" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Object.entries(characteristicRanges).map(([key, value]) => (
                      <RangeSection
                        key={key}
                        title={`${key.charAt(0).toUpperCase()}${key.slice(1)}`}
                        value={value}
                        onChange={(newValue) => setCharacteristicRanges(prev => ({
                          ...prev,
                          [key]: newValue
                        }))}
                        min={0}
                        max={1}
                        step={0.1}
                        formatValue={v => `${(v * 10).toFixed(0)}/10`}
                      />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-2 transition-colors duration-200
                    bg-transparent hover:bg-primary hover:text-white border-stone-600 hover:border-primary text-stone-300"
                  onClick={() => {
                    setSelectedProcesses([])
                    setSelectedCategories([])
                    setSelectedOrigins([])
                    setSelectedRoasters([])
                    setSelectedProducers([])
                    setSelectedMouthfeels([])
                    setPriceRange([0, 50])
                    setRatingRange([0, 5])
                    setSelectedBodies([])
                    setCharacteristicRanges({
                      acidity: [0, 1],
                      sweetness: [0, 1],
                      bitterness: [0, 1]
                    })
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          )}
        </header>

        <main className="px-8 py-8">
          <ScrollArea className="h-[calc(100vh-4rem)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {filteredCoffees.map((coffee) => (
                <div 
                  key={coffee.name}
                  onMouseEnter={() => setHoveredCoffee(coffee)}
                  onMouseLeave={() => setHoveredCoffee(null)}
                >
                  <CoffeeCard coffee={coffee} />
                </div>
              ))}
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  )
}