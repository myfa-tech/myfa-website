import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { FaCheck } from 'react-icons/fa';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Divider from '@material-ui/core/Divider';
import { SocialIcon } from 'react-social-icons';

import ButtonWithLoader from '../ButtonWithLoader';
import Toast from '../Toast';

import useTranslate from '../../hooks/useTranslate';
import { saveNewsletterMember } from '../../services/mailjet';

import logoSrc from '../../images/logo-1.png';
import paymentsSrc from '../../images/payments.png';

import './Footer.scss'

const Footer = ({ noBackgroundColor }) => {
  const [t, locale] = useTranslate();
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  const onNewsletterSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await saveNewsletterMember({ email });
      setToastType('success');
      setShowToast(true);
      resetEmail();
    } catch(err) {
      setToastType('error');
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className='footer'>
      {showToast ?
        <div
          style={{
            position: 'fixed',
            top: 10,
            right: 10,
          }}
        >
          <Toast show={showToast} setShow={setShowToast} type={toastType} />
        </div>
      : null}
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
          <Col sm={6} lg={2} className='footer-col'>
            <h4>En savoir plus ?</h4>

            <ul>
              <li><a href='/team'>L'équipe</a></li>
              <li><a href='/faq'>Questions fréquentes</a></li>
              <li><a href='/jobs'>Recrutement</a></li>
            </ul>
          </Col>
          <Col sm={6} lg={2} className='footer-col'>
            <h4>Mais encore ?</h4>

            <ul>
              <li><a href='/blog'>Blog</a></li>
              <li><a href={`/legal_${locale}`}>Mentions légales</a></li>
              <li><a href='/ratings'>Avis des clients</a></li>
            </ul>
          </Col>
          <Col sm={6} lg={2} className='footer-col'>
            <h4>Contact</h4>

            <ul>
              <li>Tél.: <a href='tel:+22584215154'>(+225) 84 21 51 54</a></li>

              <Divider />

              <li>Email: <a href='mailto:infos@myfa.fr'>infos@myfa.fr</a></li>
            </ul>
          </Col>
          <Col sm={6} lg={3} className='footer-col'>
            <h4>Inscrivez-vous</h4>

            <p>Une fois par semaine, nous vous mettons au courant des nouveautés de MYFA.</p>

            <Form onSubmit={onNewsletterSubmit}>
              <InputGroup className="mb-3" size="lg">
                <FormControl
                  aria-label="Default"
                  placeholder={t('home_page.newsletter.input_placeholder')}
                  aria-describedby="inputGroup-sizing-default"
                  className='input'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <InputGroup.Append>
                  <ButtonWithLoader
                    className='subscribe-btn'
                    disabled={isLoading}
                    isLoading={isLoading}
                    label={<FaCheck className='subscribe-icon' />}
                  />
                </InputGroup.Append>
              </InputGroup>
            </Form>
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
