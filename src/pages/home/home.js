import React, { useEffect } from 'react';
import { useLocation } from '@reach/router';

import SEO from '../../components/seo';
import Layout from '../../components/Layout';
import WelcomeSection from './WelcomeSection';
import OurServicesSection from './OurServicesSection';
import PricesSection from './PricesSection';
import NeedSection from './NeedSection';
import SimulatorSection from './SimulatorSection';

import './home.scss';

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    hashLinkScroll();
  }, [location]);

  function hashLinkScroll() {
    const { hash } = location;
    if (hash !== '') {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 0);
    }
  }

  return (
    <Layout
      className='home-page'
    >
      <SEO title='MYFA, pour vos proches au loin' />

      <WelcomeSection />
      <NeedSection />
      <OurServicesSection />
      <PricesSection />
      <SimulatorSection />
    </Layout>
  );
}

export default HomePage;
