import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'

import './Footer.scss'

const Footer = () => {
  return (
    <footer className='footer'>
      <Container>
        <Row>
          <Col md={12}>
            <div className='brand'>
              <a href='#home'>Myfa</a>
            </div>
            <ul className='menu'>
              <li>
                <a href='#home'>Accueil</a>
              </li>
              <li>
                <a href='#features'>Fonctionnalités</a>
              </li>
              <li>
                <a href='#partners'>Partenaires</a>
              </li>
              <li>
                <a href='#news'>Actualités</a>
              </li>
            </ul>
            <p className='copyright-text'>
              Copyright © Myfa | All right reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
