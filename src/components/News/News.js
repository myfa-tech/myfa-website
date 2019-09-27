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
              On est d’accord, le nom de l’évènement est long. Mais le principe est simple !
              « Women », vous l’aurez compris, signifie que les porteuses de projets sont uniquement
              des femmes (Who run the world ? demandez à Beyoncé).
            </p>
            <a href='/articles/global-women-startup-weekend-paris' className='btn-news'>
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
