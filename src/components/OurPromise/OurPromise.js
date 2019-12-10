import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import './OurPromise.scss'

const OurPromise = () => {
  return (
    <section id='our-promise' className='section-3'>
      <div className='title-container'>
        <h2>Notre promesse ✨</h2>
      </div>
      <Row className='content-container'>
        <Col md={5} className='image-container'>
          <div className='empty'></div>
          <p>Doris, Florian & Alexandre</p>
        </Col>
        <Col md={7} className='text-container'>
          <div className='content'>
            <h3>S’assurer du bien-être de vos proches.</h3>
            <p>
              Envoyer de l’argent à sa famille, c’est bien. S’assurer qu’elle ai mangé, c’est mieux.
            </p>
          </div>
        </Col>
      </Row>
    </section>
  )
}

export default OurPromise
