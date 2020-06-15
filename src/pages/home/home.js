import React, { lazy, Suspense } from 'react';

import SEO from '../../components/seo';
import Layout from '../../components/layout';
import SectionLoader from '../../components/SectionLoader';
import Welcome from './Welcome';
const OurPromise = lazy(() => import('./OurPromise'));
const Newsletter = lazy(() => import('./Newsletter'));
const Blog = lazy(() => import('./Blog'));
const Baskets = lazy(() => import('./Baskets'));
const HowItWorks = lazy(() => import('./HowItWorks'));
const Trustees = lazy(() => import('./Trustees'));
const Covid19 = lazy(() => import('./Covid19'));
const Asterisks = lazy(() => import('./Asterisks'));
const ThanksSection = lazy(() => import('./ThanksSection'));

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
        <Baskets />
        <HowItWorks />
        <OurPromise />
        <ThanksSection />
        <Trustees />
        <Blog />
        <Newsletter />
        <Asterisks />
      </Suspense>
    </Layout>
  );
}

export default HomePage;
