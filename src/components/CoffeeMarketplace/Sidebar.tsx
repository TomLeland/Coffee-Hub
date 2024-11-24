import { useNavigate, useLocation } from 'react-router-dom'
import { Coffee, Factory, Users, Leaf, CoffeeIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { type Coffee as CoffeeType } from './types'
import { tastingNotes, categoryGradients } from './tastingNotes'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  hoveredCoffee: CoffeeType | null
}

const navItems = [
  { 
    name: 'Coffees', 
    icon: Coffee, 
    path: '/coffees',
    gradient: ['#8B2635', '#B54B59'] // Deep burgundy gradient
  },
  { 
    name: 'Roasters', 
    icon: Factory, 
    path: '/roasters',
    gradient: ['#E67E22', '#F4C430'] // Warm roasted gradient
  },
  { 
    name: 'Producers', 
    icon: Users, 
    path: '/producers',
    gradient: ['#7CAB9B', '#A4C7BB'] // Fresh herb gradient
  },
  { 
    name: 'Flavors', 
    icon: Leaf, 
    path: '/flavors',
    gradient: ['#FFB5C2', '#FED7E0'] // Soft floral gradient
  }
]

export function Sidebar({ isOpen, onClose, hoveredCoffee }: SidebarProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const categories = hoveredCoffee
    ? [...new Set(hoveredCoffee.notes.map(note => tastingNotes[note]?.category))]
    : []

  const gradients = categories
    .map(category => category && categoryGradients[category])
    .filter(Boolean)

  const gradientColors = gradients.length > 0
    ? `linear-gradient(135deg, ${gradients.map(g => g[0]).join(', ')})`
    : 'none'

  return (
    <div className={`fixed inset-y-0 left-0 w-64 bg-stone-800 transform transition-transform duration-200 ease-in-out ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } md:translate-x-0`}>
      <div className="p-6">
        <button 
          onClick={() => navigate('/coffees')}
          className="flex items-center gap-3 mb-12 group w-full"
        >
          <div className="relative">
            <CoffeeIcon className="w-6 h-6 text-stone-400 group-hover:text-white transition-colors duration-200" />
            <CoffeeIcon className="w-4 h-4 text-stone-400 group-hover:text-white transition-colors duration-200 absolute -right-1 -bottom-1 transform rotate-12" />
          </div>
          <h1 className="text-xl font-semibold relative text-white group-hover:text-white transition-colors duration-200">
            <span className={`transition-opacity duration-300 ${hoveredCoffee ? 'opacity-0' : 'opacity-100'}`}>
              CoffeeHub
            </span>
            {hoveredCoffee && (
              <span 
                className="absolute inset-0 bg-clip-text text-transparent transition-opacity duration-300"
                style={{
                  backgroundImage: gradientColors,
                }}
              >
                CoffeeHub
              </span>
            )}
          </h1>
        </button>

        <nav className="space-y-2">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path
            const [startColor, endColor] = item.gradient

            return (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.path)
                  onClose()
                }}
                style={{
                  ['--hover-gradient']: `linear-gradient(135deg, ${startColor}, ${endColor})`
                }}
                className={`w-full flex items-center px-4 h-12 rounded-lg border border-stone-600 
                  transition-all duration-200 group relative overflow-hidden
                  ${isActive ? 'text-white border-transparent bg-[image:var(--hover-gradient)]' : 'text-stone-300'}`}
              >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200
                  bg-[image:var(--hover-gradient)]`} />
                <span className={`w-8 text-xs relative z-10 transition-colors duration-200
                  ${isActive ? 'text-white' : 'text-stone-500 group-hover:text-white'}`}>
                  {String(index).padStart(2, '0')}
                </span>
                <item.icon className={`w-4 h-4 mr-3 relative z-10 transition-colors duration-200
                  ${isActive ? 'text-white' : 'text-stone-400 group-hover:text-white'}`} />
                <span className={`font-normal relative z-10 transition-colors duration-200
                  ${isActive ? 'text-white' : 'text-stone-300 group-hover:text-white'}`}>
                  {item.name}
                </span>
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}