import React, { useEffect, useState } from 'react';
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
  // const [isReady, setIsReady] = useState(false);
  const location = useLocation();

  useEffect(() => {
    hashLinkScroll();
  }, []);

  function hashLinkScroll() {
    const { hash } = location;
    if (hash !== '') {
      // Push onto callback queue so it runs after the DOM is updated,
      // this is required when navigating from a different page so that
      // the element is rendered on the page before trying to getElementById.
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 0);
    }
  }

  // useEffect(() => {
  //   if (isReady) {
  //     goToSection();
  //   }
  // }, [location]);

  // const goToSection = () => {
  //   let hash = location.hash;

  //   if (!!hash) {
  //     let anchor = document.getElementById(hash.substr(1));
  //     anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
  //   }

  //   if (!isReady) {
  //     setIsReady(true);
  //   }
  // };

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
