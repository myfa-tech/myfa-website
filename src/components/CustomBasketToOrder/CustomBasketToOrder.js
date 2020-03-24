import React, { useState, useEffect } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import { ThemeProvider } from '@material-ui/core/styles';
import StepLabel from '@material-ui/core/StepLabel';
import { createMuiTheme } from '@material-ui/core/styles';
import { Col, Row } from 'react-bootstrap';

import CartModal from '../CartModal';

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

import EventEmitter from '../../services/EventEmitter';
import { customBasketDetails } from '../../assets/customBasket';
import useTranslate from '../../hooks/useTranslate';

import './CustomBasketToOrder.scss';

const SUPP_PRICE = 1.5;

const CustomBasketToOrder = () => {
  const [step, setStep] = useState(1);
  const [basket, setBasket] = useState({ supps: [] });
  const [basketPrice, setBasketPrice] = useState(customBasketDetails.price);
  const [showCartModal, setShowCartModal] = useState(false);
  const [supps, setSupps] = useState([]);
  const [slidingInfosTop, setSlidingInfosTop] = useState(null);
  const [canPay, setCanPay] = useState(false);
  const [t] = useTranslate();

  let isSliding = true;

  useEffect(() => {
    let suppsPrice = supps.length * SUPP_PRICE;
    setBasketPrice(customBasketDetails.price + suppsPrice);
  }, [supps]);

  useEffect(() => {
    if (basket.fruits && basket.fruits.length &&
      basket.bases && basket.bases.length &&
      basket.veggies && basket.veggies.length &&
      basket.sauces && basket.sauces.length) {
      setCanPay(true);
    } else {
      setCanPay(false);
    }
  }, [basket]);

  useEffect(() => {
    window.onscroll = function() {
      let limit = document.getElementById('sliding-infos-container').offsetHeight - 200;

      if (window.pageYOffset >= limit && isSliding) {
        setSlidingInfosTop(limit);
        isSliding = false;
      } else if (window.pageYOffset < limit && !isSliding) {
        setSlidingInfosTop(null);
        isSliding = true;
      }
    };
  }, []);

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#000',
      }
    },
  });

  const toggleCartModal = () => {
    setShowCartModal(!showCartModal);
  };

  const nextStep = (currentBasket) => {
    const newBasket = { ...basket, ...currentBasket };

    setBasket({ ...newBasket });
    setStep(step + 1);

    window.scrollTo(0, 0);
  };

  const previousStep = () => {
    setStep(step - 1);
  };

  const addToCart = (currentBasket, qty, quickPay = false) => {
    if (typeof window !== 'undefined') {
      const eventEmitter = new EventEmitter();
      let cart = JSON.parse(window.localStorage.getItem('cart'));

      setBasket({ ...basket, ...currentBasket });

      let newBasket = { ...customBasketDetails, price: basketPrice, items: { ...basket, supps: currentBasket.supps }};
      setBasket({ ...newBasket });

      if (!cart) {
        cart = [];
      }

      for (let i=0; i<qty; i++) {
        cart.push(newBasket);
      }

      window.localStorage.setItem('cart', JSON.stringify(cart));
      eventEmitter.emit('editCart');

      if (!quickPay) {
        toggleCartModal();
      }
    }
  };

  const pay = () => {
    addToCart(basket, 1, true);
    window.location.assign('/cart');
  }

  return (
    <section id='custom-basket-to-order'>
      <Row>
        <Col md='4' lg='3'>
          <div className='basket-img-container'>
            <img src={customBasketDetails.img} alt={customBasketDetails.imgAlt} />
            <p>{t('custom_basket_to_order.photo_disclaimer')}</p>
          </div>
        </Col>
        <Col md='8' lg='7'>
          <h1>{t(customBasketDetails.labelTranslate)}</h1>

          <h2>
            <span className='regular-price'>{customBasketDetails.realPrice}€</span>
            <span className='new-price'>{customBasketDetails.price}€</span>
            <span className='reduction'>-{customBasketDetails.reduction}%</span>
          </h2>

          <p className='description'>
            {t(customBasketDetails.descriptionTranslate)}
          </p>

          <div className='stepper-container'>
            <ThemeProvider theme={theme}>
              <Stepper activeStep={step - 1} alternativeLabel>
                <Step>
                  <StepLabel>{t('custom_basket_to_order.stepper_bases_fruits')}</StepLabel>
                </Step>
                <Step>
                  <StepLabel>{t('custom_basket_to_order.stepper_veggies')}</StepLabel>
                </Step>
                <Step>
                  <StepLabel>{t('custom_basket_to_order.stepper_sauces')}</StepLabel>
                </Step>
                <Step>
                  <StepLabel>{t('custom_basket_to_order.stepper_supps')}</StepLabel>
                </Step>
              </Stepper>
            </ThemeProvider>
          </div>

          {step === 1 ? <Step1 basketParts={basket} nextStep={nextStep} supps={supps} setSupps={setSupps} />: null}
          {step === 2 ? <Step2 basketParts={basket} nextStep={nextStep} previousStep={previousStep} supps={supps} setSupps={setSupps} />: null}
          {step === 3 ? <Step3 basketParts={basket} nextStep={nextStep} previousStep={previousStep} supps={supps} setSupps={setSupps} />: null}
          {step === 4 ? <Step4 basketParts={basket} previousStep={previousStep} addToCart={addToCart} supps={supps} setSupps={setSupps} canPay={canPay} />: null}
        </Col>
        <Col xs={0} lg={2} id='sliding-infos-container' className='.d-none .d-lg-block'>
          <div id='sliding-infos' style={slidingInfosTop ? { position: 'absolute', bottom: 0 } : { position: 'fixed', top: 100 }}>
            <h2>{customBasketDetails.label}</h2>
            <p>{t('custom_basket_to_order.price_from')} {customBasketDetails.price} €</p>
            <p>{t('custom_basket_to_order.your_basket')} : <b>{basketPrice.toFixed(2)} €</b></p>
            <button className={`pay-button ${canPay ? '' : 'disabled'}`} disabled={!canPay} onClick={pay}>
              {t('custom_basket_to_order.checkout')}
            </button>
          </div>
        </Col>
      </Row>

      {showCartModal &&
        <CartModal
          showCartModal={showCartModal}
          toggleCartModal={toggleCartModal}
          basket={basket}
        />
      }
    </section>
  );
};

export default CustomBasketToOrder;
