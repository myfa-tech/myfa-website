import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { IoIosCloudOutline } from 'react-icons/io'

import watchSrc from '../../assets/images/watch.png'
import './Section2.scss'

const Section2 = () => (
  <section id='features' className='section section-2'>
    <Container>
      <Row>
        <div className='heading'>
          <h2>Our Core Features</h2>
        </div>
        <Col md={4}>
          <div className='feature-box'>
            <IoIosCloudOutline className='small-icon' />
            <h4>Smooth Touch</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem, inventore?</p>
          </div>
          <div className='feature-box'>
            <IoIosCloudOutline className='small-icon' />
            <h4>Smooth Touch</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem, inventore?</p>
          </div>
          <div className='feature-box'>
            <IoIosCloudOutline className='small-icon' />
            <h4>Smooth Touch</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem, inventore?</p>
          </div>
        </Col>
        <Col md={4} className='image-container'>
          <img src={watchSrc} alt='watch' />
        </Col>
        <Col md={4}>
          <div className='feature-box'>
            <IoIosCloudOutline className='small-icon' />
            <h4>Smooth Touch</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem, inventore?</p>
          </div>
          <div className='feature-box'>
            <IoIosCloudOutline className='small-icon' />
            <h4>Smooth Touch</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem, inventore?</p>
          </div>
          <div className='feature-box'>
            <IoIosCloudOutline className='small-icon' />
            <h4>Smooth Touch</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem, inventore?</p>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
)

export default Section2
