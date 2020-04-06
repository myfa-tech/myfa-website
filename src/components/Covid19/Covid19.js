import React from 'react';
import useTranslate from '../../hooks/useTranslate';

import './Covid19.scss';

const Covid19 = () => {
  const [t] = useTranslate();

  return (
    <section id='covid-19'>
      <h2>{t('home_page.home.launch_popup.title')}</h2>
      <p>{t('home_page.home.launch_popup.paragraph1')}</p>
      <p>{t('home_page.home.launch_popup.paragraph2')}</p>
    </section>
  );
};

export default Covid19;
