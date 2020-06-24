import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Divider from '@material-ui/core/Divider';
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
          <Col xs={12} lg={3}>
            <div>
              <a href='/'>
                <img src={logoSrc} />
              </a>
            </div>
            <div className='brand-text'>
              <p>
                Achetez en toute sécurité du ravitaillement alimentaire pour vos proches en Côte d’Ivoire.
              </p>
            </div>
            <div className='social-icons-container'>
              <SocialIcon target='_blank' style={{ width: 40, height: 40 }} network='facebook' url='https://www.facebook.com/myfa.fr' />
              <SocialIcon target='_blank' style={{ width: 40, height: 40 }} network='twitter' url='https://www.twitter.com/myfa_fr' />
              <SocialIcon target='_blank' style={{ width: 40, height: 40 }} network='instagram' url='https://www.instagram.com/myfa.fr' />
              <SocialIcon target='_blank' style={{ width: 40, height: 40 }} network='linkedin' url='https://www.linkedin.com/company/myfa-sas' />
            </div>
          </Col>
          <Col sm={6} lg={3} className='footer-col'>
            <h4>En savoir plus ?</h4>

            <ul>
              <li><a href='/team'>L'équipe</a></li>
              <li><a href='/faq'>Questions fréquentes</a></li>
              <li><a href='/jobs'>Recrutement</a></li>
            </ul>
          </Col>
          <Col sm={6} lg={3} className='footer-col'>
            <h4>Mais encore ?</h4>

            <ul>
              <li><a href='/blog'>Blog</a></li>
              <li><a href={`/legal_${locale}`}>Mentions légales</a></li>
            </ul>
          </Col>
          <Col xs={12} lg={3} className='footer-col'>
            <h4>Contact</h4>

            <ul>
              <li>Tél.: <a href='tel:+22584215154'>(+225) 84 21 51 54</a></li>

              <Divider />

              <li>Email: <a href='mailto:infos@myfa.fr'>infos@myfa.fr</a></li>
            </ul>
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
