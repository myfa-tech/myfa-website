import React, { useEffect } from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Home from '../components/Home';
import OurPromise from '../components/OurPromise';
import Newsletter from '../components/Newsletter';
import Blog from '../components/Blog';
import Baskets from '../components/Baskets';
import HowItWorks from '../components/HowItWorks';
import Trustees from '../components/Trustees';
import Covid19 from '../components/Covid19';
import Asterisks from '../components/Asterisks';
import ThanksSection from '../components/ThanksSection';
import RamadanBaskets from '../components/RamadanBaskets';

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
      <RamadanBaskets />
      <Baskets />
      <HowItWorks />
      <OurPromise />
      <ThanksSection />
      <Trustees />
      <Blog />
      <Newsletter />
      <Asterisks />
    </Layout>
  );
}

export default IndexPage
