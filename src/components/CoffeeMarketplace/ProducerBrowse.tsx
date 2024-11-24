import { useState } from 'react'
import { Menu } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Background } from './Background'
import { ProducerCard } from './ProducerCard'
import { ProducerMap } from './ProducerMap'
import { producers } from './producerData'
import { Sidebar } from './Sidebar'

export function ProducerBrowse() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen font-sans antialiased bg-[#FAF7F2]">
      <Background />
      
      {/* Mobile sidebar toggle */}
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

      {/* Main content */}
      <div className="md:pl-64">
        <header className="sticky top-0 z-40 bg-[#F5F1EA]/80 backdrop-blur-sm border-b border-stone-200/50">
          <div className="flex items-center justify-between px-8 py-4">
            <h2 className="text-lg font-semibold text-stone-800">Coffee Producers</h2>
            <p className="text-sm text-stone-600">Discover Coffee Origins</p>
          </div>
        </header>

        <main className="px-8 py-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Map Section */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="h-[400px]">
                <ProducerMap producers={Object.values(producers)} />
              </div>
            </div>

            {/* Producer Cards */}
            <ScrollArea className="h-[calc(100vh-32rem)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.values(producers).map((producer) => (
                  <ProducerCard key={producer.name} producer={producer} />
                ))}
              </div>
            </ScrollArea>
          </div>
        </main>
      </div>
    </div>
  )
}