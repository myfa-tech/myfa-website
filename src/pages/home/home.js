import React, { lazy, Suspense } from 'react';

import SEO from '../../components/seo';
import Layout from '../../components/layout';
import SectionLoader from '../../components/SectionLoader';
import Welcome from './Welcome';
const PleasureBaskets = lazy(() => import('./PleasureBaskets'));
const Packs = lazy(() => import('./Packs'));
const Covid19 = lazy(() => import('./Covid19'));
const Asterisks = lazy(() => import('./Asterisks'));
const OurServices = lazy(() => import('./OurServices'));
const Ratings = lazy(() => import('./Ratings/Ratings'));

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import socialSharingImgSrc from '../../images/social-sharing-img.png';

import useTranslate from '../../hooks/useTranslate';

const HomePage = () => {
  const [t] = useTranslate();

  return (
    <Layout  hideHeader={true}>
      <SEO title={t('home_page.seo_title')} img={socialSharingImgSrc} />

      <Welcome />

      <Suspense fallback={<SectionLoader />}>
        <Covid19 />
        <Packs />
        <PleasureBaskets />
        <OurServices />
        <Ratings />
        <Asterisks />
      </Suspense>
    </Layout>
  );
}

export default HomePage;
