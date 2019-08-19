import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { FaQuoteLeft } from 'react-icons/fa'

import './News.scss'

const News = () => {
  return (
    <section id='news' className='section section-4'>
      <Container>
        <div className='title-container'>
          <h2>Actualités</h2>
        </div>
        {/* for-loop on news, but limit to 3 last */}
        <Row>
          <Col md={4} className='article-block'>

          </Col>
          <Col md={4} className='article-block'>
            <FaQuoteLeft size='2em' className='quote-icon' />
            <p>
              A wonderful serenity has taken possession of my entire soul,
              like these sweet mornings of spring which I enjoy with my whole heart.
              I am alone, and feel the charm of existence in this spot, which was created
              for the bliss of souls like mine. I am so happy, my dear friend, so absorbed
              in the exquisite sense of mere tranquil existence, that I neglect my...
            </p>
            <a href='#' className='btn-news'>
              Lire la suite
            </a>
            <div className='author-id'>
              <h4>Doris Somon</h4>
              <span>CEO, Myfa</span>
            </div>
          </Col>
          <Col md={4} className='article-block'>

          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default News
