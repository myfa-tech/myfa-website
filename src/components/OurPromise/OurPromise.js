import React from 'react'
import { Row, Col } from 'react-bootstrap'

import foundersSrc from '../../images/founders.jpeg';
import './OurPromise.scss'

const OurPromise = () => {
  return (
    <section id='our-promise' className='section-3'>
      <div className='title-container'>
        <h2>Notre promesse ✨</h2>
      </div>
      <Row className='content-container'>
        <Col md={5} className='image-container'>
          <img src={foundersSrc} />
          <p>Florian, Doris & Alexandre</p>
        </Col>
        <Col md={7} className='text-container'>
          <div className='content'>
            <h3>S’assurer du bien-être de vos proches.</h3>
            <p>
              Envoyer de l’argent à sa famille, c’est bien. S’assurer qu’elle ait mangé, c’est mieux.
            </p>
          </div>
        </Col>
      </Row>
    </section>
  )
}

export default OurPromise
