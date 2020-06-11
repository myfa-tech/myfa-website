import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { SocialIcon } from 'react-social-icons';

import useTranslate from '../../hooks/useTranslate';

import logoSrc from '../../images/logo-1.png';
import paymentsSrc from '../../images/payments.png';

import './Footer.scss'

const Footer = ({ noBackgroundColor }) => {
  const [t, locale] = useTranslate();

  return (
    <footer className='footer'>
      <div>
        <Row className={`content-container ${noBackgroundColor ? 'no-background' : ''}`}>
          <Col sm={5}>
            <a href='/'>
              <img src={logoSrc} />
            </a>
          </Col>
          <Col sm={7} className='text-container'>
            <a href={`/legal_${locale}`}>{t('footer.legal_notice')}</a>
            <div>
              <SocialIcon className='social-icon' target='_blank' network='facebook' url='https://www.facebook.com/myfa.fr' />
              <SocialIcon className='social-icon' target='_blank' network='twitter' url='https://www.twitter.com/myfa_fr' />
              <SocialIcon className='social-icon' target='_blank' network='instagram' url='https://www.instagram.com/myfa.fr' />
              <SocialIcon className='social-icon' target='_blank' network='linkedin' url='https://www.linkedin.com/company/myfa-sas' />
            </div>
          </Col>
        </Row>
        <Row className='footer-footer'>
          <Col sm={5}>
            <img src={paymentsSrc} />
          </Col>
          <Col sm={7}>
            <p className='copyright-text'>
              Copyright © MYFA | All right reserved.
            </p>
          </Col>
        </Row>
      </div>
    </footer>
  )
}

export default Footer
