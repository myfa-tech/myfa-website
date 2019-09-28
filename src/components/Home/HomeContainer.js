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
            <Row>
              <Col>
                <img src={logoMyfaQuest} alt='logo questionnaire Myfa' />
              </Col>
              <Col>
                <span>x</span>
              </Col>
              <Col>
                <img src={logoGSWQuest} alt='logo questionnaire Global Startup Weekend' />
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary">Save changes</Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

export default HomeContainer
