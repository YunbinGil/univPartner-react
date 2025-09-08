import { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import exHome from './pages/exHome.jsx'
import Search from './pages/Search.jsx'
import Map from './pages/Map.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Signup from './pages/Signup.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <nav> 나중에 삭제 */}
      <nav className="p-4 border-b mb-6">
        <Link to="/" className="mr-4">Login</Link>
        <Link to="/search" className="mr-4">Search</Link>
        <Link to="/map" className="mr-4">Map</Link>
        <Link to="/home" className="mr-4">Home</Link>
        <Link to="/exHome" className="mr-4">exHome</Link>
      </nav>

      {/* routes */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/map" element={<Map />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App
