import { useNavigate } from 'react-router-dom'
import { type Coffee } from './types'
import { tastingNotes, categoryIcons } from './tastingNotes'
import { Coffee as CoffeeIcon, Droplets, Gauge, Leaf, Factory, Users, Workflow } from 'lucide-react'

function CharacteristicBar({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 text-sm text-stone-600">{label}</div>
      <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-stone-600 transition-all duration-300 ease-out"
          style={{ width: `${value * 100}%` }}
        />
      </div>
    </div>
  )
}

function RoasterLogo({ roaster }: { roaster: string }) {
  return (
    <div className="w-12 h-12 rounded-xl border-2 border-stone-200 flex items-center justify-center bg-stone-50 transition-all duration-300">
      <CoffeeIcon className="w-6 h-6 text-stone-700" />
    </div>
  )
}

export function CoffeeCard({ coffee }: { coffee: Coffee }) {
  const navigate = useNavigate()

  return (
    <div 
      className="group bg-white rounded-2xl transition-all duration-300 hover:shadow-xl overflow-hidden cursor-pointer"
      onClick={() => navigate(`/coffee/${encodeURIComponent(coffee.name.toLowerCase().replace(/\s+/g, '-'))}`)}
    >
      <div className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h3 className="text-2xl font-semibold text-stone-900">{coffee.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1 text-stone-600">
                <Factory className="w-4 h-4" />
                <span>{coffee.roaster}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1 text-stone-600">
                <Users className="w-4 h-4" />
                <span>{coffee.producer}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1 text-stone-600">
                <Workflow className="w-4 h-4" />
                <span>{coffee.process}</span>
              </div>
            </div>
          </div>
          <RoasterLogo roaster={coffee.roaster} />
        </div>

        <div className="mb-6">
          <div className="text-xs uppercase tracking-wider text-stone-500 mb-1.5">
            <div className="flex items-center gap-1">
              <Leaf className="w-3 h-3" />
              <span>Flavors</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {coffee.notes.map((note) => {
              const noteData = tastingNotes[note]
              if (!noteData) return null
              const { gradient, category } = noteData
              const Icon = categoryIcons[category]
              const [startColor, endColor] = gradient
              
              return (
                <span 
                  key={note} 
                  className="text-sm px-3 py-1 rounded-full flex items-center gap-1.5 
                    transition-all duration-300 text-stone-700 bg-stone-50
                    group-hover:text-white"
                  style={{
                    background: 'rgb(248 248 248)',
                    ['--tw-gradient']: `linear-gradient(135deg, ${startColor}, ${endColor})`,
                    backgroundImage: 'var(--tw-gradient)',
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{note}</span>
                </span>
              )
            })}
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <CharacteristicBar 
            value={coffee.characteristics.acidity} 
            label="Acidity" 
          />
          <CharacteristicBar 
            value={coffee.characteristics.sweetness} 
            label="Sweetness" 
          />
          <CharacteristicBar 
            value={coffee.characteristics.bitterness} 
            label="Bitterness" 
          />
        </div>

        <div className="flex gap-4 mb-6">
          <div>
            <div className="text-xs uppercase tracking-wider text-stone-500 mb-1.5">
              <div className="flex items-center gap-1">
                <Gauge className="w-3 h-3" />
                <span>Body</span>
              </div>
            </div>
            <div className="px-3 py-1 rounded-full text-sm font-medium bg-stone-50 text-stone-700">
              {coffee.body}
            </div>
          </div>
          <div className="flex-1">
            <div className="text-xs uppercase tracking-wider text-stone-500 mb-1.5">
              <div className="flex items-center gap-1">
                <Droplets className="w-3 h-3" />
                <span>Mouthfeel</span>
              </div>
            </div>
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

        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold text-stone-900">
            ${coffee.price.toFixed(2)}
          </div>
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 rounded-full border-2 border-stone-200"></div>
            <div 
              className="absolute inset-0 rounded-full border-2 border-stone-600 transition-all duration-700 ease-in-out"
              style={{
                clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 ${100 - (coffee.rating / 5) * 100}%)`
              }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-stone-900">
              {coffee.rating.toFixed(1)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}