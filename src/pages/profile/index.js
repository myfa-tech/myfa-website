import React, { lazy, Suspense } from 'react';
import { Router } from '@reach/router';

const ProfileInformationPage = lazy(() => import('./information'));
const ProfileOrdersPage = lazy(() => import('./orders'));
const ProfilePasswordPage = lazy(() => import('./password'));
const ProfileRelativesPage = lazy(() => import('./relatives'));
import SEO from '../../components/seo';
import Layout from '../../components/layout';
import SectionLoader from '../../components/SectionLoader';
import ProfileGreeting from './ProfileGreeting';

import headerBackground from '../../images/profile-cart-bg.jpg';
import useTranslate from '../../hooks/useTranslate';

const Profile = () => {
  const [t] = useTranslate();

  return (
    <Layout
      headerBackground={headerBackground}
      headerBackgroundPosition='center center'
      stickyHeaderBackgroundPosition='center center'
      headerDescription={t('profile.description')}
      className='profile-background profile'
    >
      <SEO title='Profil' />

      <ProfileGreeting />

      <Suspense fallback={<SectionLoader />}>
        <Router>
          <ProfileInformationPage path='/information' />
          <ProfileOrdersPage path='/orders' />
          <ProfilePasswordPage path='/password' />
          <ProfileRelativesPage path='/relatives' />
        </Router>
      </Suspense>
    </Layout>
  );
};

export default Profile;
