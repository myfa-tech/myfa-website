import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Home from '../components/Home'
import Features from '../components/Features'
import OurEssence from '../components/OurEssence'
import News from '../components/News'
import Newsletter from '../components/Newsletter'

const IndexPage = () => (
  <Layout>
    <SEO title="Myfa, pour vos proches au loin" />

    <Home />
    <Features />
    <OurEssence />
    <News />
    <Newsletter />
  </Layout>
)

export default IndexPage
