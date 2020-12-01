import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Router } from '@reach/router';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';

import common_fr from './intl/fr.json';
import common_en from './intl/en.json';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

import myfaLoadingSrc from './images/myfa-loading.gif';

const HomePage = lazy(() => import('./pages/home'));
const TeamPage = lazy(() => import('./pages/team'));
const RatingsPage = lazy(() => import('./pages/ratings'));
const BlogPage = lazy(() => import('./pages/blog'));
const LoginPage = lazy(() => import('./pages/login'));
const SignupPage = lazy(() => import('./pages/signup'));
const ArticlePage = lazy(() => import('./pages/articles'));
const LogoutPage = lazy(() => import('./pages/logout'));
const NotFound = lazy(() => import('./pages/404'));
const JobsPage = lazy(() => import('./pages/jobs'));
const EmailConfirmationPage = lazy(() => import('./pages/email_confirmation'));
const FaqPage = lazy(() => import('./pages/faq'));
const DashboardHomeKPIs = lazy(() => import('./pages/dashboard/home'));
const DashboardLogin = lazy(() => import('./pages/dashboard/login'));
const DashboardUsers = lazy(() => import('./pages/dashboard/users'));
const DashboardBaskets = lazy(() => import('./pages/dashboard/baskets'));
const DashbboardRequests = lazy(() => import('./pages/dashboard/requests'));

i18next.init({
  interpolation: { escapeValue: false },  // React already does escaping
  lng: 'fr',                              // language to use
  resources: {
    fr: {
      common: common_fr,
    },
    en: {
      common: common_en,
    },
  },
});

const App = () => (
  <Suspense fallback={<img className='loading-img' src={myfaLoadingSrc} alt='myfa logo for loading' />}>
    <Router>
      <HomePage path='/' />
      <TeamPage path='/team' />
      {/* <EmailConfirmationSuccessPage path='/email_confirmation_success' />
      <Redirect
        from="/profile"
        to="/profile/information"
      />
      <ResetPasswordEmailPage path='/reset_password/email' />
      <ResetPasswordPasswordPage path='/reset_password/password' />
      <CguFrPage path='/cgu_fr'/>
      <CgvFrPage path='/cgv_fr'/>
      <LegalFrPage path='/legal_fr' /> */}
      <EmailConfirmationPage path='/email_confirmation' />
      <LoginPage path='/login' />
      <SignupPage path='/signup' />
      <LogoutPage path='/logout' />
      <JobsPage path='/jobs' />
      <FaqPage path='/faq' />
      <RatingsPage path='/ratings' />
      <BlogPage path='/blog' />
      <ArticlePage path='articles/:articleId' />

      <DashboardHomeKPIs path='/dashboard' />
      <DashboardLogin path='/dashboard/login' />
      <DashboardUsers path='/dashboard/users' />
      <DashbboardRequests path='/dashboard/requests' />
      <DashboardBaskets path='/dashboard/baskets' />
      <NotFound default />
    </Router>
  </Suspense>
);

ReactDOM.render(
  <I18nextProvider i18n={i18next}>
    <App/>
  </I18nextProvider>,
  document.getElementById('app')
);
