import React from 'react'
import { Switch, Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'

import './App.scss'

import Navbar from './components/common/Navbar'
import Home from './components/Home'
import Features from './components/Features'
import Partners from './components/Partners'
import News from './components/News'
import Newsletter from './components/Newsletter'
import Footer from './components/common/Footer'
import Article1 from './components/Articles/Article1'

const Main = () => (
  <>
    <Home />
    <Features />
    <Partners />
    <News />
    <Newsletter />
  </>
)

function App() {
  return (
    <>
      <Navbar />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Main}/>
            <Route path="/articles/1" component={Article1}/>
          </Switch>
        </BrowserRouter>
      <Footer />
    </>
  )
}

export default App
