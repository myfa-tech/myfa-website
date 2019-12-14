import React from 'react'
import Steps, { Step } from 'rc-steps'
import { Container } from 'react-bootstrap'

import 'rc-steps/assets/index.css'
import 'rc-steps/assets/iconfont.css'

import './Orders.scss'

const Orders = ({ basket }) => {
  const steps = [
    { title: 'Commandé', description: 'Le panier a été commandé, mais pas encore payé.' },
    { title: 'Payé', description: 'Le panier a été payé. La livraison est prévue début 2020.' },
    { title: 'En cours de livraison', description: 'Le panier est en cours de préparation. Il sera bientôt livré.' },
    { title: 'Livré', description: 'Le panier a été livré avec succès.' },
  ]
  let currentStep = 0

  if (basket && basket.paid) {
    currentStep = 1
  }

  return basket ? (
    <Container className='container'>
      <h1>Commande {basket.orderRef.substr(0, 13)}</h1>
      
      <p>Merci pour votre commande. Suivez ici son avancement.</p>

      <Steps direction='vertical' current={currentStep}>
        {steps.map((step, index) => (
          <Step key={index} title={step.title} description={step.description} />
        ))}
      </Steps>
    </Container>
  ) : null
}

export default Orders
