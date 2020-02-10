import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { FaLinkedinIn, FaTwitter, FaQuoteLeft } from 'react-icons/fa'

import dorisSrc from '../../images/doris.png'
import florianSrc from '../../images/florian.png'
import alexSrc from '../../images/alex.png'

import './Team.scss'

const Team = () => (
  <section id='team' className='section-4'>
    <div className='title-container'>
      <h2>L'équipe 🏆</h2>
    </div>
    <Row className='content-container'>
      <Col md={4} className='article-block'>
        <div className='desktop-quote'>
          <FaQuoteLeft size='2em' className='quote-icon' />
          <p>
            Avec MYFA, j’ai voulu créer un moyen de pouvoir faire plaisir, sans frustrations.
            Ici, je sais ce que devient mon argent.
          </p>
        </div>
        <div className='author-id'>
          <img src={dorisSrc} className='profile-pic' alt='doris' />
          <h4>Doris Somon</h4>
          <div className='social-links'>
            <a href='https://www.linkedin.com/in/doris-somon/' target="_blank"><FaLinkedinIn /></a>
            <a href='https://twitter.com/DorisSomon' target="_blank"><FaTwitter /></a>
          </div>
          <span>CEO, MYFA</span>
        </div>
        <div className='mobile-quote'>
          <FaQuoteLeft size='2em' className='quote-icon' />
          <p>
            Avec MYFA, j’ai voulu créer un moyen de pouvoir faire plaisir, sans frustrations.
            Ici, je sais ce que devient mon argent.
          </p>
        </div>
      </Col>
      <Col md={4} className='article-block'>
        <div className='desktop-quote'>
          <FaQuoteLeft size='2em' className='quote-icon' />
          <p>
            Notre ambition est d'apporter une vraie bonne solution
            aux problèmes causés par la distance. Nous rapprochons les familles.
          </p>
        </div>
        <div className='author-id'>
          <img src={florianSrc} className='profile-pic' alt='florian' />
          <h4>Florian Adonis</h4>
          <div className='social-links'>
            <a href='https://www.linkedin.com/in/florianadonis' target="_blank"><FaLinkedinIn /></a>
            <a href='https://twitter.com/florian_adonis' target="_blank"><FaTwitter /></a>
          </div>
          <span>CTO, MYFA</span>
        </div>
        <div className='mobile-quote'>
          <FaQuoteLeft size='2em' className='quote-icon' />
          <p>
            Notre ambition est d'apporter une vraie bonne solution
            aux problèmes causés par la distance. Nous rapprochons les familles.
          </p>
        </div>
      </Col>
      <Col md={4} className='article-block'>
        <div className='desktop-quote'>
          <FaQuoteLeft size='2em' className='quote-icon' />
          <p>
            Nous vous proposons une expérience nouvelle pour ravir vos proches
            et entretenir la confiance malgré la distance !
          </p>
        </div>
        <div className='author-id'>
          <img src={alexSrc} className='profile-pic' alt='alex' />
          <h4>Alexandre Meschberger</h4>
          <div className='social-links'>
            <a href='https://www.linkedin.com/in/alexandre-meschberger-97891012a/' target="_blank"><FaLinkedinIn /></a>
          </div>
          <span>CFO, MYFA</span>
        </div>
        <div className='mobile-quote'>
          <FaQuoteLeft size='2em' className='quote-icon' />
          <p>
            Nous vous proposons une expérience nouvelle pour ravir vos proches
            et entretenir la confiance malgré la distance !
          </p>
        </div>
      </Col>
    </Row>
  </section>
);

export default Team;
