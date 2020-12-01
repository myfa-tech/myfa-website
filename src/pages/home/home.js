import React, { useEffect, useState } from 'react';
import { useLocation } from '@reach/router';

import SEO from '../../components/seo';
import Layout from '../../components/Layout';
import WelcomeSection from './WelcomeSection';
import OurServicesSection from './OurServicesSection';
import PricesSection from './PricesSection';
import NeedSection from './NeedSection';
import SimulatorSection from './SimulatorSection';

import useTranslate from '../../hooks/useTranslate';

import './home.scss';

const HomePage = () => {
  const [t] = useTranslate();
  const [isReady, setIsReady] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.onload = goToSection;
  }, []);

  useEffect(() => {
    if (isReady) {
      goToSection();
    }
  }, [location]);

  const goToSection = () => {
    let hash = location.hash;

    if (!!hash) {
      let anchor = document.getElementById(hash.substr(1));
      anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (!isReady) {
      setIsReady(true);
    }
  };

  return (
    <Layout
      className='home-page'
    >
      <SEO title={t('home_page.seo_title')} />

      <WelcomeSection />
      <NeedSection />
      <OurServicesSection />
      <PricesSection />
      <SimulatorSection />
    </Layout>
  );
}

export default HomePage;
