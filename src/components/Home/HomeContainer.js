import React, { Component } from 'react'
import { Button, Modal, Col, Row } from 'react-bootstrap'

import Home from './Home'

import logoMyfaQuest from '../../assets/images/quest_myfa_logo.png'
import logoGSWQuest from '../../assets/images/quest_gsw_logo.png'

export class HomeContainer extends Component {
  state = {
    showModal: false,
  }

  componentDidMount() {
    this.setState({ showModal: true })
  }

  handleClose = () => {
    this.setState({ showModal: false })
  }

  render() {
    const { showModal } = this.state

    return (
      <>
        <Home />

        <Modal show={showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Avez-vous 1 minute ? 😉</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row style={{ marginLeft: 20, marginRight: 20, marginTop: 20, marginBottom: 20 }}>
              <Col style={{ textAlign: 'right' }} xs={5}>
                <img style={{ width: '70%' }} src={logoMyfaQuest} alt='logo questionnaire Myfa' />
              </Col>
              <Col style={{ textAlign: 'center', fontSize: 20 }} xs={2}>
                <span>x</span>
              </Col>
              <Col xs={5}>
                <img style={{ width: '60%' }} src={logoGSWQuest} alt='logo questionnaire Global Startup Weekend' />
              </Col>
            </Row>

            <Row>
              <p style={{ fontSize: '24', paddingLeft: 20, paddingRight: 20, textAlign: 'justify' }}>
                Dans le cadre du Global Startup Weekend Paris 2019, nous vous proposons de remplir ce formulaire, qui nous permettra de booster notre projet.
              </p>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <a style={{
              fontWeight: 400,
              color: '#fff',
              textAlign: 'center',
              verticalAlign: 'middle',
              backgroundColor: '#315f69',
              border: '1px solid transparent',
              paddingTop: '0.375rem',
              paddingBottom: '0.375rem',
              paddingLeft: '0.75rem',
              paddingRight: '0.75rem',
              fontSize: '1rem',
              lineHeight: '1.5',
              borderRadius: '0.25rem'
            }}
            href='https://docs.google.com/forms/d/1nbfb4if01S1WRDoESkDsuPBulUI1IaXNmBA-Blm2fPk/viewform?edit_requested=true'>
              Répondre au questionnaire
            </a>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

export default HomeContainer
