import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import watchSrc from '../../assets/images/watch.png'
import './Partners.scss'

const Partners = () => {
  return (
    <section id='partners' className='section section-3'>
      <Container>
        <Row>
          <Col md={6} className='image-container'>
            <img src={watchSrc} alt='watch' />
          </Col>
          <Col md={6}>
            <div className='content'>
              <h2>Designed By Professional , The Benefit For Creative Gigs</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quia vel labore, deleniti minima nisi, velit atque quaerat impedit
                ea maxime sunt accusamus at obcaecati dolor iure iusto omnis quis eum.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quia vel labore, deleniti minima nisi, velit atque quaerat impedit
                ea maxime sunt accusamus at obcaecati dolor iure iusto omnis quis eum.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Partners
