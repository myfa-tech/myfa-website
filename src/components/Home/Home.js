import React, { useEffect, useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import useTranslate from '../../hooks/useTranslate';

import Header from '../Header';
import Toast from '../Toast';

import './Home.scss';
import logoSrc from '../../images/logo-1.png';

const Home = ({ setShowToast, showToast, toastType }) => {
  const [showLaunchModal, setShowLaunchModal] = useState(false);
  const [t] = useTranslate();

  useEffect(() => {
    const popupViewed = window.localStorage.getItem('popupViewed');

    if (!popupViewed) {
      setTimeout(() => {
        toggleLaunchModal();
        window.localStorage.setItem('popupViewed', 'true');
      }, 2000);
    }
  }, []);

  const toggleLaunchModal = () => {
    setShowLaunchModal(!showLaunchModal);
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
      <Container className='section-1'>
        <Header />
        <Row>
          <Col md={1} className='image-container'></Col>
          <Col md={10}>
            <img src={logoSrc} alt='logo' className='logo-big' />
            <h1>{t('home_page.home.title')}</h1>

            <a className='btn-main link' href='#baskets'>{t('home_page.home.discover_baskets_button')} 🥭</a>

            <h2>{t('home_page.home.subtitle')}</h2>
          </Col>
          <Col md={1}></Col>
        </Row>
      </Container>
      {showLaunchModal &&
        <Modal show={showLaunchModal} onHide={toggleLaunchModal} id='launch-modal'>
          <Modal.Header closeButton />
          <Modal.Body>
            <h1>{t('home_page.home.launch_popup.title')} 🎉</h1>

            <p>{t('home_page.home.launch_popup.paragraph1')}</p>
            <p>{t('home_page.home.launch_popup.paragraph2')}</p>
          </Modal.Body>
        </Modal>
      }
    </section>
  );
};

export default Home;
