import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Router } from '@reach/router';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';

import common_fr from './intl/fr.json';
import common_en from './intl/en.json';

import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

const HomePage = lazy(() => import('./pages/home'));
const EmailConfirmationSuccessPage = lazy(() => import('./pages/email_confirmation_success'));
const MobileMoneyOrdersPage = lazy(() => import('./pages/mobile_money_orders'));
const ProfileInformationPage = lazy(() => import('./pages/profile/information'));
const ProfileOrdersPage = lazy(() => import('./pages/profile/orders'));
const ProfilePasswordPage = lazy(() => import('./pages/profile/password'));
const ProfileRelativesPage = lazy(() => import('./pages/profile/relatives'));
const ResetPasswordEmailPage = lazy(() => import('./pages/reset_password/email'));
const ResetPasswordPasswordPage = lazy(() => import('./pages/reset_password/password'));
const TeamPage = lazy(() => import('./pages/team'));
const BasketsPage = lazy(() => import('./pages/baskets'));
const CartPage = lazy(() => import('./pages/cart'));
const CguEnPage = lazy(() => import('./pages/cgu_en'));
const CguFrPage = lazy(() => import('./pages/cgu_fr'));
const CgvFrPage = lazy(() => import('./pages/cgv_fr'));
const CgvEnPage = lazy(() => import('./pages/cgv_en'));
const LegalEnPage = lazy(() => import('./pages/legal_en'));
const LegalFrPage = lazy(() => import('./pages/legal_fr'));
const CustomBasketPage = lazy(() => import('./pages/custom-basket'));
const EmailConfirmationPage = lazy(() => import('./pages/email_confirmation'));
const LogoutPage = lazy(() => import('./pages/logout'));
const OrdersPage = lazy(() => import('./pages/orders'));
const RamadanBasketsPage = lazy(() => import('./pages/ramadan-baskets'));
const ArticlePage = lazy(() => import('./pages/articles'));
const JobsPage = lazy(() => import('./pages/jobs'));

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

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Router>
      <HomePage path='/' />
      <TeamPage path='/team' />
      <EmailConfirmationSuccessPage path='/email_confirmation_success' />
      <MobileMoneyOrdersPage path='/mobile_money_orders' />
      <Redirect
        from="/profile"
        to="/profile/information"
      />
      <ProfileInformationPage path='/profile/information' />
      <ProfileOrdersPage path='/profile/orders' />
      <ProfilePasswordPage path='/profile/password' />
      <ProfileRelativesPage path='/profile/relatives' />
      <ResetPasswordEmailPage path='/reset_password/email' />
      <ResetPasswordPasswordPage path='/reset_password/password' />
      <BasketsPage path='/baskets' />
      <CartPage path='/cart' />
      <CguFrPage path='/cgu_fr'/>
      <CguEnPage path='/cgu_en'/>
      <CgvFrPage path='/cgv_fr'/>
      <CgvEnPage path='/cgv_en'/>
      <LegalEnPage path='/legal_en' />
      <LegalFrPage path='/legal_fr' />
      <CustomBasketPage path='/custom-basket' />
      <EmailConfirmationPage path='/email_confirmation' />
      <LogoutPage path='/logout' />
      <OrdersPage path='/orders' />
      <JobsPage path='/jobs' />
      <RamadanBasketsPage path='/ramadan-baskets' />
      <ArticlePage path='articles/:articleId' />

      <DashboardHomeKPIs path='/dashboard' />
      <DashboardLogin path='/dashboard/login' />
      <DashboardUsers path='/dashboard/users' />
      <DashboardBaskets path='/dashboard/baskets' />
      <DashboardFinance path='/dashboard/finance' />
      <DashboardStocks path='/dashboard/stocks' />
    </Router>
  </Suspense>
);

ReactDOM.render(
  <I18nextProvider i18n={i18next}>
    <App/>
  </I18nextProvider>,
  document.getElementById('app')
);
