import React, { useEffect, useState } from 'react';
import Banner from '../../../components/Banner';
import Header from '../../../components/Header';
import Toast from '../../../components/Toast';

import useTranslate from '../../../hooks/useTranslate';

import './Welcome.scss';

const Welcome = ({ setShowToast, showToast, toastType }) => {
  const [showBanner, setShowBanner] = useState(false);
  const [t] = useTranslate();

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

  return (
    <section id='welcome'>
      {showToast ?
        <div
          style={{
            position: 'fixed',
            top: 10,
            right: 10,
          }}
        >
          <Toast show={showToast} setShow={setShowToast} type={toastType} />
        </div>
      : null}
      <div className='section-1'>
        {showBanner &&
          <Banner
            type='info'
            show={showBanner}
            title={t('home_page.home.launch_popup.title')}
            onClose={removeBanner}
            text={`${t('home_page.home.launch_popup.paragraph1')} ${t('home_page.home.launch_popup.paragraph2')}`}
          />
        }
        <Header />
        <div className='title-container'>
          <h1>Pour le bien-être de vos proches en Côte d’Ivoire, nous livrons en 48h*.</h1>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
