import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { FaQuoteLeft } from 'react-icons/fa'

import dorisSrc from '../../assets/images/doris.jpg'
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
              Hein ? Quoi ? Que veut dire “Myfa” ?
              Cela veut dire “famille” en verlan. Le verlan étant une forme d&#39;argot
              français qui consiste en l&#39;inversion des syllabes d&#39;un mot. Vous
              comprendrez donc d’où le chanteur Stromae tient son nom…
              Le y ? juste pour le style...
            </p>
            <a href='/articles/appli-pour-la-mif' className='btn-news'>
              Lire la suite
            </a>
            <div className='author-id'>
              <img src={dorisSrc} className='profile-pic' />
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
