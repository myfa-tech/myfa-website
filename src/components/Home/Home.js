import React, { useEffect, useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

import Header from '../Header';
import Toast from '../Toast';

import './Home.scss';
import logoSrc from '../../images/logo-1.png';

const Home = ({ setShowToast, showToast, toastType }) => {
  const [showLaunchModal, setShowLaunchModal] = useState(false);
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    const popupViewed = window.localStorage.getItem('popupViewed');

    if (!popupViewed) {
      setTimeout(() => {
        toggleLaunchModal();
        window.localStorage.setItem('popupViewed', 'true');
      }, 2000);
    }

    const newIsSafari = typeof navigator !== 'undefined' ?
      /^((?!chrome|android).)*safari/i.test(navigator.userAgent) :
      false;

    setIsSafari(newIsSafari);
  }, []);

  const toggleLaunchModal = () => {
    setShowLaunchModal(!showLaunchModal);
  };

  console.log(isSafari);

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
      <Container className={`section-1 ${isSafari ? 'jpg-background' : 'webp-background'}`}>
        <Header />
        <Row>
          <Col md={1} className='image-container'></Col>
          <Col md={10}>
            <img src={logoSrc} alt='logo' className='logo-big' />
            <h1>Pour le plaisir de vos proches en Côte d’Ivoire, nous livrons en 48h*.</h1>

            <a className='btn-main link' href='#baskets'>Découvrir les paniers 🥭</a>

            <h2>*période de lancement : la livraison sera faite courant mars, par les fondateurs.</h2>
          </Col>
          <Col md={1}></Col>
        </Row>
      </Container>
      {showLaunchModal &&
        <Modal show={showLaunchModal} onHide={toggleLaunchModal} id='launch-modal'>
          <Modal.Header closeButton />
          <Modal.Body>
            <h1>Lancement 🎉</h1>

            <p>
              Toute commande réalisée sera livrée dans un délai d’un mois, par les fondateurs eux mêmes !
            </p>
            <p>
              Fin de la période de lancement : 31 mars 2020. Profitez des petits prix durant cette période !
            </p>
          </Modal.Body>
        </Modal>
      }
    </section>
  );
};

export default Home;
