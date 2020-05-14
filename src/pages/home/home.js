import React from 'react';

import Layout from '../../components/layout';
import SEO from '../../components/seo';
import Welcome from './Welcome';
import OurPromise from './OurPromise';
import Newsletter from './Newsletter';
import Blog from './Blog';
import Baskets from './Baskets';
import HowItWorks from './HowItWorks';
import Trustees from './Trustees';
import Covid19 from './Covid19';
import Asterisks from './Asterisks';
import ThanksSection from './ThanksSection';
import RamadanBaskets from './RamadanBaskets';

import socialSharingImgSrc from '../../images/social-sharing-img.png';

import useTranslate from '../../hooks/useTranslate';

const HomePage = () => {
  const [t] = useTranslate();

  return (
    <>
      <SEO title={t('home_page.seo_title')} img={socialSharingImgSrc} />

      {/* <Welcome />
      <Covid19 />
      <RamadanBaskets />
      <Baskets />
      <HowItWorks />
      <OurPromise />
      <ThanksSection />
      <Trustees />
      <Blog />
      <Newsletter />
      <Asterisks /> */}
    </>
  );
}

export default HomePage;
