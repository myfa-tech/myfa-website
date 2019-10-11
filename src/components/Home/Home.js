import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import ChatBot from 'react-simple-chatbot'
import { ThemeProvider } from 'styled-components'

import './Home.scss'
import { isEmptyString } from 'is-what'

const steps = [
  {
    id: '1',
    message: 'Salut ! Nous recherchons nos premiers utilisateurs testeurs de notre nouvelle solution innovante ! Intéressé(e) ? 😉 Comment tu t\'appelles ?',
    trigger: '2',
  },
  {
    id: '2',
    user: true,
    validator: (value) => {
      if (!value || value === '') {
        return 'prénom invalide';
      }
      return true;
    },
    trigger: '3',
  },
  {
    id: '3',
    message: 'Enchanté {previousValue}. J\'ai simplement besoin de ton email. Myfa te contactera très prochainement 😉',
    trigger: '4',
  },
  {
    id: '4',
    user: true,
    validator: (value) => {
      if (!value.includes('@')) {
        return 'adresse invalide';
      }
      return true;
    },
    trigger: '5',
  },
  {
    id: '5',
    message: 'Merci ! Restons en contact ✌🏽🌍',
    end: true,
  },
]

const theme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#f1d866',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#f1d866',
  botFontColor: '#4a4a4a',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
}

const Home = ({ handleEndChatBot }) => {
  return (
    <section id='home'>
      <Container className='section-1'>
        <Row>
          <Col md={6}>
            <h1>Myfa, pour vos proches au loin</h1>
            <p>
              Dites au revoir à cette frustration de ne pas pouvoir aider concrètement
              un de vos proches à cause de la distance. Avec Myfa, vous pouvez composer
              un panier de biens alimentaires, à destination de vos proches en Afrique !
            </p>
            <p>
              Tout ce qu'il vous suffit de faire : télécharger l'application et vous laisser guider.
            </p>
            <span className='btn-main'>
              Bientôt disponible
            </span>
          </Col>
          <Col md={6} className='image-container'>
            <ThemeProvider theme={theme}>
              <ChatBot
                handleEnd={handleEndChatBot}
                headerTitle='Parlez-nous'
                steps={steps}
                placeholder='Entrez votre message ...'
              />
            </ThemeProvider>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Home
