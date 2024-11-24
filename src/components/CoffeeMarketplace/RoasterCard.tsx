import { useNavigate } from 'react-router-dom'
import { Award, Building2, Calendar, Factory, Star } from 'lucide-react'
import { type Roaster } from './types'
import { coffees } from './data'

export function RoasterCard({ roaster }: { roaster: Roaster }) {
  const navigate = useNavigate()
  const roasterCoffees = coffees.filter(coffee => coffee.roaster === roaster.name)
  const averageRating = roasterCoffees.reduce((acc, coffee) => acc + coffee.rating, 0) / roasterCoffees.length

  return (
    <div 
      className="group relative bg-white rounded-2xl transition-all duration-300 hover:shadow-xl overflow-hidden cursor-pointer"
      onClick={() => navigate(`/roaster/${encodeURIComponent(roaster.name.toLowerCase().replace(/\s+/g, '-'))}`)}
    >
      <div className="relative p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-xl bg-stone-100 flex items-center justify-center">
            <Factory className="w-8 h-8 text-stone-600" />
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-stone-900">{roaster.name}</h3>
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

        <p className="text-stone-600 line-clamp-3 mb-6">
          {roaster.description}
        </p>

        <div className="space-y-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-stone-500 mb-2">Specialties</div>
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

          <div>
            <div className="text-xs uppercase tracking-wider text-stone-500 mb-2">Certifications</div>
            <div className="flex flex-wrap gap-2">
              {roaster.certifications.map(cert => (
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
        </div>

        <div className="flex items-center justify-between mt-6 pt-6 border-t border-stone-100">
          <div className="flex items-center gap-4">
            <div>
              <div className="text-sm text-stone-500">Average Rating</div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-stone-900" />
                <span className="font-medium text-stone-900">{averageRating.toFixed(1)}</span>
              </div>
            </div>
            <div>
              <div className="text-sm text-stone-500">Coffees</div>
              <div className="font-medium text-stone-900">{roasterCoffees.length}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}