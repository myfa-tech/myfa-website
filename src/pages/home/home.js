import React, { useEffect, useState } from 'react';

import SEO from '../../components/seo';
import Layout from '../../components/layout';
import PleasureBaskets from './PleasureBaskets';
import Packs from './Packs';
import Covid19 from './Covid19';
import Asterisks from './Asterisks';
import OurServices from './OurServices';
import Ratings from './Ratings';
import ProductsDetails from './ProductsDetails';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import homeBg from '../../images/default-bg.jpg';

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
    <Layout
      className='home-page'
      headerBackground={homeBg}
      headerDescription={t('home_page.home.welcome_title')}
      headerBackgroundPosition='center center'
    >
      <SEO title={t('home_page.seo_title')} />

      <Covid19 />
      <ProductsDetails location={location} />
      <PleasureBaskets location={location} />
      <Packs location={location} />
      <OurServices />
      <Ratings />
      <Asterisks />
    </Layout>
  );
}

export default HomePage;
