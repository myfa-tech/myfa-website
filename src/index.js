import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@reach/router';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';

import HomePage from './pages/home';
import Layout from './components/layout';

import common_fr from './intl/fr.json';
import common_en from './intl/en.json';

import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

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
    <Layout path='/' hideHeader={true}>
      <HomePage default />
    </Layout>
  </Router>
);

ReactDOM.render(
  <I18nextProvider i18n={i18next}>
    <App/>
  </I18nextProvider>,
  document.getElementById('app')
);
