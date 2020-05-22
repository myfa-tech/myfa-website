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
        <Row>
          <Col md={1}></Col>
          <Col md={10}>
            <Row>
              <Col lg={4} className='d-none d-lg-block'></Col>
              <Col lg={4} className='image-container'>
                <img src={logoSrc} alt='logo' className='logo-big' />
              </Col>
              <Col lg={4} className='d-none d-lg-block'>
                <PhoneInfos />
              </Col>
            </Row>
            <h1 className='title'>{t('home_page.home.title')}*</h1>

            <div className='d-block d-lg-none'>
              <PhoneInfos />
            </div>
          </Col>
          <Col md={1}></Col>
        </Row>
      </div>
    </section>
  );
};

export default Welcome;
