import { 
  CoffeeMarketplace, 
  CoffeeDetail, 
  RoasterDetail, 
  RoasterBrowse,
  ProducerBrowse,
  ProducerDetail,
  FlavorMap
} from './components/CoffeeMarketplace'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CoffeeMarketplace />} />
        <Route path="/coffees" element={<CoffeeMarketplace />} />
        <Route path="/roasters" element={<RoasterBrowse />} />
        <Route path="/producers" element={<ProducerBrowse />} />
        <Route path="/flavors" element={<FlavorMap />} />
        <Route path="/coffee/:id" element={<CoffeeDetail />} />
        <Route path="/roaster/:id" element={<RoasterDetail />} />
        <Route path="/producer/:id" element={<ProducerDetail />} />
      </Routes>
    </Router>
  )
}

export default App