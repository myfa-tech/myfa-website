import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@reach/router';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';

import common_fr from './intl/fr.json';
import common_en from './intl/en.json';

import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

import HomePage from './pages/home';
import EmailConfirmationSuccessPage from './pages/email_confirmation_success';
import MobileMoneyOrdersPage from './pages/mobile_money_orders';
import ProfilePage from './pages/profile';
import ProfileInformationPage from './pages/profile/information';
import ProfileOrdersPage from './pages/profile/orders';
import ProfilePasswordPage from './pages/profile/password';
import ProfileRelativesPage from './pages/profile/relatives';
import ResetPasswordEmailPage from './pages/reset_password/email';
import ResetPasswordPasswordPage from './pages/reset_password/password';
import TeamPage from './pages/team';
import BasketsPage from './pages/baskets';
import CartPage from './pages/cart';
import CguEnPage from './pages/cgu_en';
import CguFrPage from './pages/cgu_fr';
import CgvFrPage from './pages/cgv_fr';
import CgvEnPage from './pages/cgv_en';
import LegalEnPage from './pages/legal_en';
import LegalFrPage from './pages/legal_fr';
import CustomBasketPage from './pages/custom-basket';
import EmailConfirmationPage from './pages/email_confirmation';
import LogoutPage from './pages/logout';
import OrdersPage from './pages/orders';
import RamadanBasketsPage from './pages/ramadan-baskets';
import ArticlePage from './pages/articles';

import DashboardHomeKPIs from './pages/dashboard';
import DashboardLogin from './pages/dashboard/login';
import DashboardUsers from './pages/dashboard/users';
import DashboardBaskets from './pages/dashboard/baskets';
import DashboardFinance from './pages/dashboard/finance';
import DashboardStocks from './pages/dashboard/stocks';

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
  <Router>
    <HomePage path='/' />
    <TeamPage path='/team' />
    <EmailConfirmationSuccessPage path='/email_confirmation_success' />
    <MobileMoneyOrdersPage path='/mobile_money_orders' />
    <ProfilePage path='/profile' />
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
    <RamadanBasketsPage path='/ramadan-baskets' />
    <ArticlePage path='articles/:articleId' />

    <DashboardHomeKPIs path='/dashboard' />
    <DashboardLogin path='/dashboard/login' />
    <DashboardUsers path='/dashboard/users' />
    <DashboardBaskets path='/dashboard/baskets' />
    <DashboardFinance path='/dashboard/finance' />
    <DashboardStocks path='/dashboard/stocks' />
  </Router>
);

ReactDOM.render(
  <I18nextProvider i18n={i18next}>
    <App/>
  </I18nextProvider>,
  document.getElementById('app')
);
