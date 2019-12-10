import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Header from '../Header';
import Toast from '../Toast';

import './Home.scss';
import logoSrc from '../../images/logo-1.png';

const Home = ({ setShowToast, showToast, toastType }) => (
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
          <h1>Par nous, pour vos proches, en Côte d’Ivoire, livraison en 48h*.</h1>

          <a className='btn-main link' href='#baskets'>Découvrir les paniers 🥭</a>
        </Col>
        <Col md={1}></Col>
      </Row>
    </Container>
  </section>
);

export default Home;
