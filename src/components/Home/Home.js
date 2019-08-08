import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'

import style from './Home.scss'

const Home = () => {
  return (
    <Container>
      <Row>
        <Col md={6}>1 of 2</Col>
        <Col md={6}>
          <h1>Pour vos proche au loin</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptas, modi fugit in veritatis labore perferendis.
            Minima hic at, nostrum nihil!
          </p>
          <Button size="lg" active>
            Primary button
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Home
