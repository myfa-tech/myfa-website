import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Home from '../components/Home';
import OurPromise from '../components/OurPromise';
import Team from '../components/Team';
import Newsletter from '../components/Newsletter';
import News from '../components/News';
import Baskets from '../components/Baskets';
import HowItWorks from '../components/HowItWorks';
import Trustees from '../components/Trustees';

import socialSharingImgSrc from '../images/social-sharing-img.png';

import './index.scss';

const IndexPage = () => {
  return (
    <Layout hideHeader={true}>
      <SEO title="MYFA, pour vos proches au loin" img={socialSharingImgSrc} />

      <Home />
      <HowItWorks />
      <Baskets />
      <OurPromise />
      <Trustees />
      <Team />
      <News />
      <Newsletter />
    </Layout>
  );
}

export default IndexPage
