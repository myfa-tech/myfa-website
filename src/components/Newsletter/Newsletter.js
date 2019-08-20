import React from 'react'
import { Button, Container, Col, FormControl, InputGroup, Row } from 'react-bootstrap'
import { FaCheck } from 'react-icons/fa'

import './Newsletter.scss'

const Newsletter = () => {
  return (
    <section className='section newsletter'>
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
            <InputGroup className="mb-3" size="lg">
              <FormControl
                aria-label="Default"
                placeholder="Entrez votre adresse email"
                aria-describedby="inputGroup-sizing-default"
                className='input'
              />
              <InputGroup.Append>
                <Button className='subscribe-btn'>
                  <span className='subscribe-text'>Souscrire</span>
                  <FaCheck className='subscribe-icon' />
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Newsletter
