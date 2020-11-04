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

import useTranslate from '../../hooks/useTranslate';
import { saveNewsletterMember } from '../../services/mailjet';

import logoSrc from '../../images/logo-1.png';
import paymentsSrc from '../../images/payments.png';

import './Footer.scss'

const Footer = ({ noBackgroundColor }) => {
  const [t, locale] = useTranslate();
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
      <div>
        <Row className={`content-container ${noBackgroundColor ? 'no-background' : ''}`}>
          <Col xs={12} lg={3}>
            <div>
              <a href='/'>
                <img src={logoSrc} />
              </a>
            </div>
            <div className='brand-text'>
              <p>{t('footer.introduction')}</p>
            </div>
            <div className='social-icons-container'>
              <SocialIcon target='_blank' style={{ width: 40, height: 40 }} network='facebook' url='https://www.facebook.com/myfa.fr' />
              <SocialIcon target='_blank' style={{ width: 40, height: 40 }} network='twitter' url='https://www.twitter.com/myfa_fr' />
              <SocialIcon target='_blank' style={{ width: 40, height: 40 }} network='instagram' url='https://www.instagram.com/myfa.fr' />
              <SocialIcon target='_blank' style={{ width: 40, height: 40 }} network='linkedin' url='https://www.linkedin.com/company/myfa-sas' />
            </div>
          </Col>
          <Col sm={6} lg={2} className='footer-col'>
            <h4>{t('footer.know_more')}</h4>

            <ul>
              <li><a href='/team'>{t('footer.team')}</a></li>
              <li><a href='/faq'>{t('footer.faq')}</a></li>
              <li><a href='/jobs'>{t('footer.jobs')}</a></li>
            </ul>
          </Col>
          <Col sm={6} lg={2} className='footer-col'>
            <h4>{t('footer.but_still')}</h4>

            <ul>
              <li><a href='/blog'>Blog</a></li>
              <li><a href={`/legal_${locale}`}>{t('footer.legal_notice')}</a></li>
              <li><a href='/ratings'>{t('footer.clients_ratings')}</a></li>
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
            <h4>{t('footer.subscribe')}</h4>

        <p>{t('footer.subscribe_text')}</p>

            <Form onSubmit={onNewsletterSubmit}>
              <InputGroup className="mb-3" size="lg">
                <FormControl
                  aria-label="Default"
                  placeholder={t('home_page.newsletter.input_placeholder')}
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
        <Row className='footer-footer'>
          <Col sm={5}>
            <img src={paymentsSrc} />
          </Col>
          <Col sm={7}>
            <p className='copyright-text'>
              Copyright © MYFA | All rights reserved.
            </p>
          </Col>
        </Row>
      </div>
    </footer>
  )
}

export default Footer
