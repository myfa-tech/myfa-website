import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Home from '../components/Home';
import OurPromise from '../components/OurPromise';
import Team from '../components/Team';
import Newsletter from '../components/Newsletter';
import Baskets from '../components/Baskets';
import HowItWorks from '../components/HowItWorks';

import fruitsBackgroundSrc from '../images/fruits-background.jpg';

import './index.scss';

const IndexPage = () => {
  return (
    <Layout hideHeader={true}>
      <SEO title="MYFA, pour vos proches au loin" img={fruitsBackgroundSrc} />

      <Home />
      <HowItWorks />
      <Baskets />
      <OurPromise />
      <Team />
      <Newsletter />
    </Layout>
  );
}

export default IndexPage
