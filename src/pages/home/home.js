import React, { useEffect, useState } from 'react';

import SEO from '../../components/seo';
import HomeLayout from './Layout';
import WelcomeSection from './WelcomeSection';
import OurServicesSection from './OurServicesSection';
import PricesSection from './PricesSection';
import NeedSection from './NeedSection';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import useTranslate from '../../hooks/useTranslate';

import './home.scss';

const HomePage = ({ location }) => {
  const [t] = useTranslate();
  const [isReady, setIsReady] = useState(false);

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
      let elementRect = document.getElementById(hash.substr(1)).getBoundingClientRect();
      let bodyRect = document.body.getBoundingClientRect();
      let offset = elementRect.top - bodyRect.top;

      window.scrollTo(0, offset);
    }

    if (!isReady) {
      setIsReady(true);
    }
  };

  return (
    <HomeLayout
      className='home-page'
    >
      <SEO title={t('home_page.seo_title')} />

      <WelcomeSection />
      <NeedSection />
      <OurServicesSection />
      <PricesSection />
    </HomeLayout>
  );
}

export default HomePage;
