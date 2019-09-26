import React from 'react'
import { Switch, Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import './App.scss'

import Navbar from './components/common/Navbar'
import Home from './components/Home'
import Features from './components/Features'
import OurEssence from './components/OurEssence'
import News from './components/News'
import Newsletter from './components/Newsletter'
import Footer from './components/common/Footer'
import Article1 from './components/Articles/Article1'
import Article2 from './components/Articles/Article2'

const Main = () => (
  <>
    <Helmet>
      <title>Myfa - Pour vos proches, au loin</title>
      <meta name="description" content="MyFa est une plateforme permettant à la diaspora africaine d'offrir des paniers de courses à leurs proches sur l'ensemble du continent africain." />
      <meta name="author" content="Myfa SAS" />
      <meta name="keywords" content="panier, courses, diaspora, click, collect, cote, ivoire, cameroun, application, mobile, tech, technologie, telecharger, télécharger, startup, frenchtech" />
    </Helmet>

    <Home />
    <Features />
    <OurEssence />
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
            <Route exact path='/' component={Main}/>
            <Route path='/articles/appli-pour-la-mif' component={Article1}/>
            <Route path='/articles/global-women-startup-weekend-paris' component={Article2}/>
          </Switch>
        </BrowserRouter>
      <Footer />
    </>
  )
}

export default App
