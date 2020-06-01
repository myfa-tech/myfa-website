import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

import useTranslate from '../../../hooks/useTranslate';

import './Covid19.scss';

const Covid19 = () => {
  const [t] = useTranslate();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const popupViewed = window.localStorage.getItem('popupViewed');

    if (!popupViewed) {
      setTimeout(() => {
        toggleBanner();
      }, 2000);
    }
  }, []);

  const toggleBanner = () => {
    setShowBanner(!showBanner);
  };

  const removeBanner = () => {
    window.localStorage.setItem('popupViewed', 'true');
    toggleBanner();
  };

  return showBanner && (
    <section id='covid-19'>
      <button className='remove-banner-button' onClick={removeBanner}><FaTimes /></button>
      <h2>{t('home_page.home.launch_popup.title')}</h2>
      <p>{t('home_page.home.launch_popup.paragraph1')}</p>
      <p>{t('home_page.home.launch_popup.paragraph2')}</p>
    </section>
  );
};

export default Covid19;
