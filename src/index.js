import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Router } from '@reach/router';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import * as Sentry from '@sentry/react';

import common_fr from './intl/fr.json';
import common_en from './intl/en.json';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

import myfaLoadingSrc from './images/myfa-loading.gif';

const HomePage = lazy(() => import('./pages/home'));
const EmailConfirmationSuccessPage = lazy(() => import('./pages/email_confirmation_success'));
const ResetPasswordEmailPage = lazy(() => import('./pages/reset_password/email'));
const ResetPasswordPasswordPage = lazy(() => import('./pages/reset_password/password'));
const TeamPage = lazy(() => import('./pages/team'));
const CguEnPage = lazy(() => import('./pages/cgu_en'));
const CguFrPage = lazy(() => import('./pages/cgu_fr'));
const CgvFrPage = lazy(() => import('./pages/cgv_fr'));
const CgvEnPage = lazy(() => import('./pages/cgv_en'));
const LegalEnPage = lazy(() => import('./pages/legal_en'));
const LegalFrPage = lazy(() => import('./pages/legal_fr'));
const EmailConfirmationPage = lazy(() => import('./pages/email_confirmation'));
const LogoutPage = lazy(() => import('./pages/logout'));
const ArticlePage = lazy(() => import('./pages/articles'));
const JobsPage = lazy(() => import('./pages/jobs'));
const FaqPage = lazy(() => import('./pages/faq'));
const RatingsPage = lazy(() => import('./pages/ratings'));
const NotFound = lazy(() => import('./pages/404'));

const DashboardHomeKPIs = lazy(() => import('./pages/dashboard'));
const DashboardLogin = lazy(() => import('./pages/dashboard/login'));
const DashboardUsers = lazy(() => import('./pages/dashboard/users'));
const DashboardBaskets = lazy(() => import('./pages/dashboard/baskets'));
const DashboardFinance = lazy(() => import('./pages/dashboard/finance'));
const DashboardStocks = lazy(() => import('./pages/dashboard/stocks'));

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

if (process.env.NODE_ENV === 'production') {
  console.log('Sentry init - PRODUCTION MODE');
  Sentry.init({ dsn: "https://a8deec86fbde4709940d231446734fcc@o436858.ingest.sentry.io/5398591" });
}

const App = () => (
  <Suspense fallback={<img className='loading-img' src={myfaLoadingSrc} alt='myfa logo for loading' />}>
    <Router>
      <HomePage path='/' />
      <TeamPage path='/team' />
      <EmailConfirmationSuccessPage path='/email_confirmation_success' />
      <Redirect
        from="/profile"
        to="/profile/information"
      />
      <ResetPasswordEmailPage path='/reset_password/email' />
      <ResetPasswordPasswordPage path='/reset_password/password' />
      <CguFrPage path='/cgu_fr'/>
      <CguEnPage path='/cgu_en'/>
      <CgvFrPage path='/cgv_fr'/>
      <CgvEnPage path='/cgv_en'/>
      <LegalEnPage path='/legal_en' />
      <LegalFrPage path='/legal_fr' />
      <EmailConfirmationPage path='/email_confirmation' />
      <LogoutPage path='/logout' />
      <JobsPage path='/jobs' />
      <FaqPage path='/faq' />
      <RatingsPage path='/ratings' />
      <ArticlePage path='articles/:articleId' />

      <DashboardHomeKPIs path='/dashboard' />
      <DashboardLogin path='/dashboard/login' />
      <DashboardUsers path='/dashboard/users' />
      <DashboardBaskets path='/dashboard/baskets' />
      <DashboardFinance path='/dashboard/finance' />
      <DashboardStocks path='/dashboard/stocks' />
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
