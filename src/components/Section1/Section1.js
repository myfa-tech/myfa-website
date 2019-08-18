import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import watchSrc from '../../assets/images/watch.png'

import './Section1.scss'

const Section1 = () => {
  return (
    <section>
      <Container className='section-1'>
        <Row>
          <Col md={6} className='image-container'>
            <img src={watchSrc} alt='watch' />
          </Col>
          <Col md={6}>
            <h1>Pour vos proche au loin</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna.
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptas, modi fugit in veritatis labore perferendis.
              Minima hic at, nostrum nihil!
            </p>
            <a href='#' className='btn-main'>
              Primary button
            </a>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Section1
