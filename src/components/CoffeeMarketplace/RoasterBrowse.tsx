import { useState } from 'react'
import { Menu } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Background } from './Background'
import { RoasterCard } from './RoasterCard'
import { roasters } from './roasterData'
import { Sidebar } from './Sidebar'

export function RoasterBrowse() {
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
            <h2 className="text-lg font-semibold text-stone-800">Browse Roasters</h2>
            <p className="text-sm text-stone-600">Discover Artisanal Coffee Roasters</p>
          </div>
        </header>

        <main className="px-8 py-8">
          <ScrollArea className="h-[calc(100vh-4rem)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {Object.values(roasters).map((roaster) => (
                <RoasterCard key={roaster.name} roaster={roaster} />
              ))}
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  )
}