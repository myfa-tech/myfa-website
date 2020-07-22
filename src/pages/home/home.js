import React, { lazy, Suspense, useEffect, useState } from 'react';

import SEO from '../../components/seo';
import Layout from '../../components/layout';
import SectionLoader from '../../components/SectionLoader';
const PleasureBaskets = lazy(() => import('./PleasureBaskets'));
const Packs = lazy(() => import('./Packs'));
const Covid19 = lazy(() => import('./Covid19'));
const Asterisks = lazy(() => import('./Asterisks'));
const OurServices = lazy(() => import('./OurServices'));
const Ratings = lazy(() => import('./Ratings'));
const ProductsDetails = lazy(() => import('./ProductsDetails'));

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import socialSharingImgSrc from '../../images/social-sharing-img.png';
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
      <SEO title={t('home_page.seo_title')} img={socialSharingImgSrc} />

      <Suspense fallback={<SectionLoader />}>
        <Covid19 />
        <ProductsDetails location={location} />
        <PleasureBaskets location={location} />
        <Packs location={location} />
        <OurServices />
        <Ratings />
        <Asterisks />
      </Suspense>
    </Layout>
  );
}

export default HomePage;
