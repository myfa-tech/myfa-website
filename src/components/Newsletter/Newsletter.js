import React from 'react'
import { Button, Container, Col, FormControl, InputGroup, Row } from 'react-bootstrap'

import './Newsletter.scss'

const Newsletter = () => {
  return (
    <section className='section newsletter'>
      <Container>
        <Row>
          <Col md={12}>
            <div className='content'>
              <h2>Get Product Updates</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
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
                <Button className='subscribe-btn'>Souscrire</Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Newsletter
