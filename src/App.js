import React from 'react'
import './App.scss'

import Navbar from './components/common/Navbar'
import Home from './components/Home'
import Features from './components/Features'
import Partners from './components/Partners'
import News from './components/News'
import Newsletter from './components/Newsletter'
import Footer from './components/common/Footer'

function App() {
  return (
    <>
      <Navbar />
      <Home />
      <Features />
      <Partners />
      <News />
      <Newsletter />
      <Footer />
    </>
  )
}

export default App
