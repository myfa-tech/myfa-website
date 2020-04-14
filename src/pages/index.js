import React, { useEffect } from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Home from '../components/Home';
import OurPromise from '../components/OurPromise';
import Newsletter from '../components/Newsletter';
import News from '../components/News';
import Baskets from '../components/Baskets';
import HowItWorks from '../components/HowItWorks';
import Trustees from '../components/Trustees';
import Covid19 from '../components/Covid19';
import socialSharingImgSrc from '../images/social-sharing-img.png';

import './index.scss';
import useTranslate from '../hooks/useTranslate';

const IndexPage = () => {
  const [t] = useTranslate();

  return (
    <Layout hideHeader={true}>
      <SEO title={t('home_page.seo_title')} img={socialSharingImgSrc} />

      <Home />
      <Covid19 />
      <HowItWorks />
      <Baskets />
      <OurPromise />
      <Trustees />
      <News />
      <Newsletter />
    </Layout>
  );
}

export default IndexPage
