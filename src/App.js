import React from 'react'
import './App.scss'

import Navbar from './components/common/Navbar'
import Section1 from './components/Section1'
import Section2 from './components/Section2'
import Section3 from './components/Section3'
import Section4 from './components/Section4'
import Newsletter from './components/Newsletter'
import Footer from './components/common/Footer'

function App() {
  return (
    <>
      <Navbar />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Newsletter />
      <Footer />
    </>
  )
}

export default App
