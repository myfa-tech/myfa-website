import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaCheck } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/core';

import useTranslate from '../../../hooks/useTranslate';
import './Newsletter.scss';
import Toast from '../../../components/Toast';

const Newsletter = (props) => {
  const { email, isLoading, onEmailChange, onSubmit, showToast, setShowToast, toastType } = props
  const [t] = useTranslate();

  return (
    <section id='newsletter'>
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
      <div className='content-container'>
        <div className='content'>
          <h2>{t('home_page.newsletter.title')}</h2>
          <p>{t('home_page.newsletter.description')}</p>
        </div>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={onSubmit}>
              <InputGroup className="mb-3" size="lg">
                <FormControl
                  aria-label="Default"
                  placeholder={t('home_page.newsletter.input_placeholder')}
                  aria-describedby="inputGroup-sizing-default"
                  className='input'
                  type='email'
                  value={email}
                  onChange={onEmailChange}
                />
                <InputGroup.Append>
                  <Button type='submit' className='subscribe-btn' disabled={isLoading}>
                    {isLoading ?
                      <ClipLoader
                        css={spinnerStyle}
                        sizeUnit={"px"}
                        size={25}
                        color={'#311a19'}
                        loading={true}
                      /> :
                      <>
                        <span className='subscribe-text'>{t('home_page.newsletter.subscribe_button')}</span>
                        <FaCheck className='subscribe-icon' />
                      </>
                    }
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form>
          </Col>
        </Row>
      </div>
    </section>
  )
}

const spinnerStyle = css`
  display: block;
  margin: 0 auto;
`

export default Newsletter
