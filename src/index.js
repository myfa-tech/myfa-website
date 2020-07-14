import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Router } from '@reach/router';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';

import common_fr from './intl/fr.json';
import common_en from './intl/en.json';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

const HomePage = lazy(() => import('./pages/home'));
const EmailConfirmationSuccessPage = lazy(() => import('./pages/email_confirmation_success'));
const MobileMoneyOrdersPage = lazy(() => import('./pages/mobile_money_orders'));
const ProfilePage = lazy(() => import('./pages/profile'));
const ResetPasswordEmailPage = lazy(() => import('./pages/reset_password/email'));
const ResetPasswordPasswordPage = lazy(() => import('./pages/reset_password/password'));
const TeamPage = lazy(() => import('./pages/team'));
const BasketsDetailsPage = lazy(() => import('./pages/baskets_details'));
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
const ArticlePage = lazy(() => import('./pages/articles'));
const Packs = lazy(() => import('./pages/packs'));
const Baskets = lazy(() => import('./pages/baskets'));
const JobsPage = lazy(() => import('./pages/jobs'));
const FaqPage = lazy(() => import('./pages/faq'));
const BlogPage = lazy(() => import('./pages/blog'));
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

const App = () => (
  <Suspense fallback={<div></div>}>
    <Router>
      <HomePage path='/' />
      <TeamPage path='/team' />
      <EmailConfirmationSuccessPage path='/email_confirmation_success' />
      <MobileMoneyOrdersPage path='/mobile_money_orders' />
      <Redirect
        from="/profile"
        to="/profile/information"
      />
      <ProfilePage path='/profile/*' />
      <ResetPasswordEmailPage path='/reset_password/email' />
      <ResetPasswordPasswordPage path='/reset_password/password' />
      <BasketsDetailsPage path='/baskets/details' />
      <BasketsDetailsPage path='/packs/details' />
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
      <FaqPage path='/faq' />
      <Packs path='/packs' />
      <Baskets path='/pleasure-baskets' />
      <BlogPage path='/blog' />
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
