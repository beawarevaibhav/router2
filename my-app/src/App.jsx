import React, { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './components/header/header.jsx'
import Footer from './components/footer/footer.jsx'
import Home from './components/home/home.jsx'
import About from './components/about/about.jsx'

function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <>
      <Header cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<Home setCartCount={setCartCount} />} />
        <Route path="/about" element={<About />} /> {/* ✅ Moved inside <Routes> */}
      </Routes>
      <Footer />
       
    </>
  )
}

export default App
