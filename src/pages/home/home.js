import React, { lazy, Suspense, useEffect } from 'react';

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

const HomePage = () => {
  const [t] = useTranslate();

  useEffect(() => {

  }, []);

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
        <ProductsDetails />
        <PleasureBaskets />
        <Packs />
        <OurServices />
        <Ratings />
        <Asterisks />
      </Suspense>
    </Layout>
  );
}

export default HomePage;
