import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Banner from '../../../components/Banner';
import { IoLogoWhatsapp } from 'react-icons/io';
import Header from '../../../components/Header';
import Toast from '../../../components/Toast';

import useTranslate from '../../../hooks/useTranslate';

import './Welcome.scss';
import logoSrc from '../../../images/logo-1.png';

const PhoneInfos = () => (
  <div className='phone-infos'>
    <IoLogoWhatsapp className='whatsapp-icon' />
    <p className='number'>(+225) 84 21 51 54</p>
    <p className='hours'>9h-18h lun au ven | 9h-13h we et fériés</p>
  </div>
);

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
        <Row className='content-container'>
          <Col md={6}></Col>
          <Col md={6}>
            <div className='beauty-basket-container'>
              <h1 className='title'>{t('home_page.home.title')}</h1>
              <h2>{t('home_page.home.subtitle')}</h2>
              <h3>9.90€ / 6.500 Fcfa</h3>
              <a href='/baskets?type=beauty' className='get-basket-button'>{t('home_page.home.get_basket_button')}</a>
            </div>
          </Col>
        </Row>
        <div className='beauty-basket-container-small'>
          <div className='beauty-basket-inner-container-small'>
            <h1 className='title'>{t('home_page.home.title')}</h1>
            <h2>{t('home_page.home.subtitle')}</h2>
            <h3>9.90€ / 6.500 Fcfa</h3>
            <a href='/baskets?type=beauty' className='get-basket-button'>{t('home_page.home.get_basket_button')}</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
