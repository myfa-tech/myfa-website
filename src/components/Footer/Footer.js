import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { FaCheck } from 'react-icons/fa';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Divider from '@material-ui/core/Divider';
import { SocialIcon } from 'react-social-icons';
import { FaCreditCard, FaPhoneAlt, FaTruck } from 'react-icons/fa';

import ButtonWithLoader from '../ButtonWithLoader';

import { saveNewsletterMember } from '../../services/mailjet';

import logoSrc from '../../images/logo-1.png';
import paymentsSrc from '../../images/payments.png';

import './Footer.scss'

const Footer = ({ noBackgroundColor }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [successNewsletter, setSuccessNewsletter] = useState(false);
  const [failureNewsletter, setFailureNewsletter] = useState(false);

  const onNewsletterSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await saveNewsletterMember({ email });
      setSuccessNewsletter(true);
    } catch(err) {
      setFailureNewsletter(true);
    } finally {
      setIsLoading(false);
    }
  };

  const editNewsletterField = (e) => {
    setSuccessNewsletter(false);
    setFailureNewsletter(false);
    setEmail(e.target.value);
  };

  return (
    <footer className='footer'>
      <div className='our-services'>
        <div className='service'>
          <FaTruck className='icon' />
          <h4>Livraison à domicile</h4>
          <p>Livraison rapide, selon la disponibilité du destinataire</p>
        </div>
        <div className='service'>
          <FaPhoneAlt className='icon' />
          <h4>Service client</h4>
          <p>(+225) 84 21 51 54</p>
          <p>9h - 18h du lundi au vendredi</p>
          <p>9h - 13h week-end et jours fériés</p>
        </div>
        <div className='service'>
          <FaCreditCard className='icon' />
          <h4>Paiement sécurisé</h4>
          <p>Payez vos devis l’esprit serein</p>
        </div>
        <div className='service'>
          <FaCheck className='icon' />
          <h4>Gestionnaire de dépenses</h4>
          <p>MYFA vous permet de gérer votre budget</p>
        </div>
      </div>

      <Row className={`content-container ${noBackgroundColor ? 'no-background' : ''}`}>
        <Col xs={12} lg={3}>
          <div>
            <a href='/'>
              <img src={logoSrc} />
            </a>
          </div>
          <div className='brand-text'>
            <p>Achetez en toute sécurité du ravitaillement alimentaire pour vos proches en Côte d’Ivoire.</p>
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
            <li><a href='/ratings'>Avis des clients</a></li>
            <li><a href='/legal'>Mentions légales</a></li>
          </ul>
        </Col>
        <Col sm={6} lg={2} className='footer-col'>
          <h4>Contacts</h4>

          <ul>
            <li>Tél.: <a href='tel:+22584215154'>(+225) 84 21 51 54</a></li>

            <Divider />

            <li>Email: <a href='mailto:infos@myfa.fr'>infos@myfa.fr</a></li>

            <li>
              <p>🇫🇷 Station F</p>
              <p>5 parvis Alan Turing</p>
              <p>75013 Paris</p>
            </li>

            <li>🇨🇮 Cocody, Mermoz</li>
          </ul>
        </Col>
        <Col sm={6} lg={3} className='footer-col'>
          <h4>Inscrivez-vous</h4>

          <p>Une fois par semaine, nous vous mettons au courant des nouveautés de MYFA.</p>

          <Form onSubmit={onNewsletterSubmit}>
            <InputGroup className="mb-3" size="lg">
              <FormControl
                aria-label='Default'
                placeholder='Adresse email'
                aria-describedby="inputGroup-sizing-default"
                className='input'
                type='email'
                value={email}
                onChange={editNewsletterField}
              />
              <InputGroup.Append>
                <ButtonWithLoader
                  className='subscribe-btn'
                  disabled={isLoading}
                  isLoading={isLoading}
                  success={successNewsletter}
                  failure={failureNewsletter}
                  failureLabel='❌'
                  successLabel='✅'
                  label={<FaCheck className='subscribe-icon' />}
                />
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </Col>
      </Row>
      <div className='footer-footer'>
          <img src={paymentsSrc} />

          <p className='copyright-text'>
            Copyright © MYFA | All rights reserved.
          </p>
      </div>
    </footer>
  )
}

export default Footer
