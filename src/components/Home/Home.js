import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Banner from '../Banner';
import useTranslate from '../../hooks/useTranslate';

import Header from '../Header';
import Toast from '../Toast';

import './Home.scss';
import logoSrc from '../../images/logo-1.png';

const Home = ({ setShowToast, showToast, toastType }) => {
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
    <section id='home'>
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
        <Row>
          <Col md={1} className='image-container'></Col>
          <Col md={10}>
            <img src={logoSrc} alt='logo' className='logo-big' />
            <h1 className='title'>{t('home_page.home.title')}</h1>

            <a className='btn-main link' href='#baskets'>{t('home_page.home.discover_baskets_button')} 🥭</a>
          </Col>
          <Col md={1}></Col>
        </Row>
      </div>
    </section>
  );
};

export default Home;
