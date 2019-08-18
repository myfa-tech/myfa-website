import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import watchSrc from '../../assets/images/watch.png'

import './Section4.scss'

const Section4 = () => {
  return (
    <section className='section section-4'>
      <Container>
        <div className='title-container'>
          <h2>Why Choose Apple Watch</h2>
        </div>
        {/* for-loop on news, but limit to 2 */}
        <Row>
          <Col md={6} className='image-container'>
            <img src={watchSrc} alt='watch' />
          </Col>
          <Col md={6}>
            <div className='content'>
              <h4>Lorem Ipsum Dolor Sit Amet.</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptate, sed, assumenda. Tenetur sed esse, voluptas voluptate est
                veniam numquam, quis magni. Architecto minus suscipit quas, quo harum
                deserunt...
              </p>
              <a href='#' className='btn-news'>
                Lire la suite
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Section4
