import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import watchSrc from '../../assets/images/watch.png'

import './Section1.scss'

const Section1 = () => {
  return (
    <section id='home'>
      <Container className='section-1'>
        <Row>
          <Col md={6} className='image-container'>
            <img src={watchSrc} alt='watch' />
          </Col>
          <Col md={6}>
            <h1>Myfa, pour vos proches au loin</h1>
            <p>
              Dites au revoir à cette frustration de ne pas pouvoir aider concrètement
              un de vos proches à cause de la distance. Avec Myfa, vous pouvez composer
              un panier de biens alimentaires, à destination de vos proches en Afrique !
            </p>
            <p>
              Tout ce qu'il vous suffit de faire : télécharger l'application et vous laisser guider.
            </p>
            <a href='#' className='btn-main'>
              Télécharger l'application
            </a>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Section1
