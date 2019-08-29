import React from 'react'
import { Button, Container, Col, FormControl, InputGroup, Row, Form } from 'react-bootstrap'
import { FaCheck } from 'react-icons/fa'

import './Newsletter.scss'
import Toast from '../common/Toast'

const Newsletter = (props) => {
  const { email, onEmailChange, onSubmit, showToast, setShowToast, toastType } = props

  return (
    <section className='section newsletter'>
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
      <Container>
        <Row>
          <Col md={12}>
            <div className='content'>
              <h2>Abonnez-vous à notre newsletter !</h2>
              <p>
                Soyez les premiers au courant des nouveautés et offres promotionnelles
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={onSubmit}>
              <InputGroup className="mb-3" size="lg">
                <FormControl
                  aria-label="Default"
                  placeholder="Entrez votre adresse email"
                  aria-describedby="inputGroup-sizing-default"
                  className='input'
                  type='email'
                  value={email}
                  onChange={onEmailChange}
                />
                <InputGroup.Append>
                  <Button type='submit' className='subscribe-btn'>
                    <span className='subscribe-text'>Souscrire</span>
                    <FaCheck className='subscribe-icon' />
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Newsletter
