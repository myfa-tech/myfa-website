import React, { lazy, Suspense } from 'react';

import SEO from '../../components/seo';
import Layout from '../../components/layout';
import SectionLoader from '../../components/SectionLoader';
import Welcome from './Welcome';
const Newsletter = lazy(() => import('./Newsletter'));
const PleasureBaskets = lazy(() => import('./PleasureBaskets'));
const Packs = lazy(() => import('./Packs'));
const HowItWorks = lazy(() => import('./HowItWorks'));
const Covid19 = lazy(() => import('./Covid19'));

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
        <HowItWorks />
        <Newsletter />
      </Suspense>
    </Layout>
  );
}

export default HomePage;
