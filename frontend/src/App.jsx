import { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Search from './pages/Search.jsx'
import Map from './pages/Map.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <nav> */}
      <nav className="p-4 border-b mb-6">
        <Link to="/" className="mr-4">Home</Link>
        <Link to="/search" className="mr-4">Search</Link>
        <Link to="/map" className="mr-4">Map</Link>
      </nav>

      {/* routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </>
  )
}

export default App
