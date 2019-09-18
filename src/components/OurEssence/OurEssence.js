import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import ourEssenceSrc from '../../images/notre_essence.jpg'
import './OurEssence.scss'

const OurEssence = () => {
  return (
    <section id='our-essence' className='section section-3'>
      <Container>
        <Row>
          <Col md={6} className='image-container'>
            <img src={ourEssenceSrc} alt='watch' />
          </Col>
          <Col md={6}>
            <div className='content'>
              <h2>Notre essence</h2>

              <p>
                En tant que membres de la diaspora africaine, nous avons pour mission
                de prendre en charge une partie (si ce n'est l'entièreté) des dépenses
                de nos proches restés au pays : pas de panique, Myfa est là.
                L'application a été pensée pour vous : d'ici, faites les courses pour votre famille, là bas.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default OurEssence
