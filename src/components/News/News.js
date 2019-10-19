import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { FaQuoteLeft } from 'react-icons/fa'

import florianSrc from '../../images/florian.png'
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
            Si on nous avait dit, il y a 8 mois, lorsque nous nous lancions,
            que les choses se concrétiseraient aussi rapidement, je n’y aurais pas cru,
            et Doris non plus. Voilà déjà 1 semaine que nous sommes rentrés de notre premier “voyage d’affaires”,
            ni plus ni moins qu’en Côte d’Ivoire. En Afrique, continent qui nous est cher.
            </p>
            <a href='/articles/voyage-abidjan' className='btn-news'>
              Lire la suite
            </a>
            <div className='author-id'>
              <img src={florianSrc} className='profile-pic' alt='florian' />
              <h4>Florian Adonis</h4>
              <span>CTO, Myfa</span>
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
