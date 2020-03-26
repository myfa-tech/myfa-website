import React, { useEffect } from 'react';

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
import Countdown from '../components/Countdown';

import socialSharingImgSrc from '../images/social-sharing-img.png';

import './index.scss';
import useTranslate from '../hooks/useTranslate';

const IndexPage = () => {
  const [t] = useTranslate();

  return (
    <Layout hideHeader={true}>
      <SEO title={t('home_page.seo_title')} img={socialSharingImgSrc} />

      <Home />
      <HowItWorks />
      <Baskets />
      <OurPromise />
      <Trustees />
      <Team />
      <News />
      <Newsletter />

      <Countdown />
    </Layout>
  );
}

export default IndexPage
