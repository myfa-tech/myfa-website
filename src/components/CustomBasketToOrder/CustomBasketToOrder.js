import React, { useState } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import StepLabel from '@material-ui/core/StepLabel';
import { createMuiTheme } from '@material-ui/core/styles';
import { Col, Container, Row } from 'react-bootstrap';

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

import { customBasketDetails } from '../../assets/customBasket';

import './CustomBasketToOrder.scss';

const useStyles = makeStyles({
  stepperRoot: {
    background: 'transparent',
    padding: 0,
    width: '100%',
  },
  stepRoot: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  labelContainer: {
    fontSize: '15px',
  }
});

const CustomBasketToOrder = () => {
  const [step, setStep] = useState(1);
  const [basket, setBasket] = useState({ supps: [] });

  const classes = useStyles();
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#000',
      }
    },
  });

  const nextStep = (currentBasket) => {
    const newBasket = { ...basket, ...currentBasket };

    setBasket({ ...newBasket });
    setStep(step + 1);

    window.scrollTo(0, 0);
  };

  const previousStep = () => {
    setStep(step - 1);
  };

  return (
    <section id='custom-basket-to-order'>
      <Container>
        <Row>
          <Col md='4'>
            <div className='basket-img-container'>
              <img src={customBasketDetails.img} alt={customBasketDetails.imgAlt} />
              <p>Photo non contractuelle</p>
            </div>
          </Col>
          <Col md='8'>
            <h1>{customBasketDetails.label}</h1>

            <h2>
              <span className='regular-price'>{customBasketDetails.realPrice}€</span>
              <span className='new-price'>{customBasketDetails.price}€</span>
              <span className='reduction'>-{customBasketDetails.reduction}%</span>
            </h2>

            <p className='description'>
              {customBasketDetails.description}
            </p>

            <div className='stepper-container'>
              <ThemeProvider theme={theme}>
                <Stepper activeStep={step - 1} alternativeLabel classes={{ root: classes.stepperRoot }}>
                  <Step classes={{ root: classes.stepRoot }}>
                    <StepLabel>Bases & Fruits</StepLabel>
                  </Step>
                  <Step classes={{ root: classes.stepRoot }}>
                    <StepLabel>Légumes</StepLabel>
                  </Step>
                  <Step classes={{ root: classes.stepRoot }}>
                    <StepLabel>Sauces</StepLabel>
                  </Step>
                  <Step classes={{ root: classes.stepRoot }}>
                    <StepLabel>Suppléments</StepLabel>
                  </Step>
                </Stepper>
              </ThemeProvider>
            </div>

            {step === 1 ? <Step1 basketParts={basket} nextStep={nextStep} />: null}
            {step === 2 ? <Step2 basketParts={basket} nextStep={nextStep} previousStep={previousStep} />: null}
            {step === 3 ? <Step3 basketParts={basket} nextStep={nextStep} previousStep={previousStep} />: null}
            {step === 4 ? <Step4 basketParts={basket} previousStep={previousStep} />: null}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CustomBasketToOrder;
