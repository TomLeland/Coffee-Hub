import { useNavigate } from 'react-router-dom'
import { Award, Building2, Calendar, MapPin, Mountain, Sprout } from 'lucide-react'
import { type Producer } from './types'
import { coffees } from './data'

export function ProducerCard({ producer }: { producer: Producer }) {
  const navigate = useNavigate()
  const producerCoffees = coffees.filter(coffee => coffee.producer === producer.name)

  return (
    <div 
      className="group relative bg-white rounded-2xl transition-all duration-300 hover:shadow-xl overflow-hidden cursor-pointer"
      onClick={() => navigate(`/producer/${encodeURIComponent(producer.name.toLowerCase().replace(/\s+/g, '-'))}`)}
    >
      <div className="relative p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-xl bg-stone-100 flex items-center justify-center">
            <Sprout className="w-8 h-8 text-stone-600" />
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-stone-900">{producer.name}</h3>
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

        <p className="text-stone-600 line-clamp-3 mb-6">
          {producer.description}
        </p>

        <div className="space-y-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-stone-500 mb-2">Varieties</div>
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
            <div className="text-xs uppercase tracking-wider text-stone-500 mb-2">Processes</div>
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

          <div>
            <div className="text-xs uppercase tracking-wider text-stone-500 mb-2">Certifications</div>
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
        </div>

        <div className="flex items-center justify-between mt-6 pt-6 border-t border-stone-100">
          <div>
            <div className="text-sm text-stone-500">Available Coffees</div>
            <div className="font-medium text-stone-900">{producerCoffees.length} coffees</div>
          </div>
          <div>
            <div className="text-sm text-stone-500">Farm Size</div>
            <div className="font-medium text-stone-900">{producer.farmSize}</div>
          </div>
        </div>
      </div>
    </div>
  )
}