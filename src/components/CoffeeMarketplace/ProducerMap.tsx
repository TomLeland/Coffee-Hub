import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { type Producer } from './types'

// Public token for demo purposes
mapboxgl.accessToken = 'pk.eyJ1IjoiYm9sdGRldiIsImEiOiJjbHRxbmF2NmowMGlqMmtvNnlxZmNqZnZsIn0.YU1mGENlGx-PclS-JLhz7Q'

interface ProducerMapProps {
  producers: Producer[]
}

export function ProducerMap({ producers }: ProducerMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (!mapContainer.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v12', // Changed to outdoors style which works with public token
      center: [0, 20], // Center on coffee-growing regions
      zoom: 2
    })

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl())

    // Add markers for each producer
    producers.forEach(producer => {
      const { coordinates } = producer.location
      
      // Create custom marker element
      const el = document.createElement('div')
      el.className = 'w-6 h-6 bg-stone-900 rounded-full border-2 border-white shadow-lg cursor-pointer'
      
      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="p-2">
          <div class="font-medium">${producer.name}</div>
          <div class="text-sm text-stone-600">${producer.location.region}, ${producer.location.country}</div>
          <div class="text-sm text-stone-600">${producer.location.elevation}m elevation</div>
        </div>
      `)

      // Add marker to map
      new mapboxgl.Marker(el)
        .setLngLat(coordinates)
        .setPopup(popup)
        .addTo(map.current)
    })

    return () => {
      if (map.current) {
        map.current.remove()
      }
    }
  }, [producers])

  return (
    <div ref={mapContainer} className="w-full h-full" />
  )
}