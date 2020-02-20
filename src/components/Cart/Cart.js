import React, { useEffect, useState } from 'react';
import Divider from '@material-ui/core/Divider';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';
import { some } from 'lodash';
import { Row, Col } from 'react-bootstrap';

import PersonalInfo from './PersonalInfo';
import RelativeInfo from './RelativeInfo';
import CartItems from './CartItems';

import { addRecipient } from '../../services/users';
import lydiaService from '../../services/lydia';
import { saveUser } from '../../services/users';
import EventEmitter from '../../services/EventEmitter';
import useSignupForm from '../../hooks/useSignupForm';
import useRelativeForm from '../../hooks/useRelativeForm';

import './Cart.scss';

const spinnerStyle = css`
  display: block;
  margin: 0 auto;
`;

const Cart = () => {
  const [cart, setCart] = useState({});
  const [basketsPrice, setBasketsPrice] = useState(0);
  const [basketsNumber, setBasketsNumber] = useState(0);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [responseStatus, setResponseStatus] = useState(null);
  const [
    personalFormValues,
    handleChangePersonalFormValues,
    handleSubmitPersonalForm,
    personalFormErrors,
    setPersonalFormErrors
  ] = useSignupForm(signup, setResponseStatus);
  const [
    relativeFormValues,
    handleChangeRelativeFormValues,
    handleSubmitRelativeForm,
    relativeFormErrors,
    relativeFormRecipientIndex,
    handleRelativeFormRecipientChange
  ] = useRelativeForm(pay);

  const eventEmitter = new EventEmitter();

  useEffect(() => {
    initCart();
    eventEmitter.listen('editCart', initCart);
  }, []);

  useEffect(() => {
    updateBasketsPriceAndNumber();
  }, [cart]);

  const initCart = () => {
    if (typeof window !== 'undefined') {
      let newCart = JSON.parse(window.localStorage.getItem('cart'));

      if (!!newCart) {
        let enhancedCart = {};

        enhancedCart.baskets = newCart.reduce((acc, cur) => {
          if (!acc[cur.type]) {
            acc[cur.type] = {
              price: 0,
              qty: 0,
              label: cur.label,
              singlePrice: cur.price,
              type: cur.type,
              img: cur.img,
              items: cur.items || {},
            };
          }

          acc[cur.type].qty = acc[cur.type].qty + 1;
          acc[cur.type].price = acc[cur.type].price + cur.price;

          return acc;
        }, {});

        let newBasketsNumber = Object.values(enhancedCart.baskets).map(v => v.qty).reduce((acc, cur) => acc + cur, 0);
        let newBasketsPrice = Object.values(enhancedCart.baskets).map(v => v.price).reduce((acc, cur) => acc + cur, 0);

        setCart(enhancedCart);
        setBasketsNumber(newBasketsNumber);
        setBasketsPrice(newBasketsPrice);
      }
    }
  };

  const updateBasketsPriceAndNumber = () => {
    if (cart && cart.baskets) {
      let newBasketsNumber = Object.values(cart.baskets).map(v => v.qty).reduce((acc, cur) => acc + cur, 0);
      let newBasketsPrice = Object.values(cart.baskets).map(v => v.price).reduce((acc, cur) => acc + cur, 0);

      setBasketsNumber(newBasketsNumber);
      setBasketsPrice(newBasketsPrice);
    }
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const editItems = (type, adding) => {
    let oldQty = cart.baskets[type].qty;
    let newQty = cart.baskets[type].qty + adding;

    if (newQty > 0 && newQty <= 5) {
      cart.baskets[type].price = oldQty === 0 ? cart.baskets[type].singlePrice : newQty * (cart.baskets[type].price / oldQty);
      cart.baskets[type].qty = newQty;

      setCart({ ...cart });
    }
  };

  const nextStep = () => {
    const user = JSON.parse(window.localStorage.getItem('user'));

    if (user && step === 1) {
      setStep(step + 2);
      scrollToTop();
    } else if (step === 2) {
      setStep(step + 1);
      scrollToTop();
    } else if (step === 3) {
      pay();
    } else {
      setStep(step + 1);
      scrollToTop();
    }
  };

  const removeBaskets = (basketTypeToRemove) => {
    const savedCart = JSON.parse(window.localStorage.getItem('cart'));

    let filteredCart = savedCart.filter(b => b.type !== basketTypeToRemove);

    window.localStorage.setItem('cart', JSON.stringify(filteredCart));

    eventEmitter.emit('editCart');

    delete cart.baskets[basketTypeToRemove];
    setCart({ ...cart });
  };

  async function pay() {
    const user = JSON.parse(window.localStorage.getItem('user'));

    setIsLoading(true);

    cart.recipient = relativeFormValues;
    cart.price = basketsPrice;

    const promises = [lydiaService.requestPayment(cart, user.email)];

    if (!some(user.recipients, relativeFormValues)) {
      promises.push(addRecipient(relativeFormValues));
    }

    await Promise.all(promises);
    setIsLoading(false);
  };

  async function signup() {
    try {
      setIsLoading(true);
      await saveUser({ ...personalFormValues, recipients: [] });
      nextStep();
    } catch(e) {
      if (e.response.status === 409) {
        personalFormErrors.email = true;
        setPersonalFormErrors({ ...personalFormErrors });
        setResponseStatus(e.response.status);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id='cart'>
      {cart && cart.baskets && Object.keys(cart.baskets).length ?
        <Row>
          <Col md='8'>
            {step === 1 ? <CartItems cart={cart} basketsPrice={basketsPrice} editItems={editItems} removeBaskets={removeBaskets} /> : null}
            {step === 2 ?
              <>
                <PersonalInfo
                  errors={personalFormErrors}
                  form={personalFormValues}
                  responseStatus={responseStatus}
                  handleChangeFormValue={handleChangePersonalFormValues}
                />
                <div className='disabled-section relative-info'>
                  <h2>Informations sur mon proche</h2>
                </div>
              </> : null
            }
            {step === 3 ?
              <>
                <div className='disabled-section signup-to-order'>
                  <h2>Je m'inscris pour commander</h2>
                </div>
                <RelativeInfo
                  errors={relativeFormErrors}
                  form={relativeFormValues}
                  handleChangeFormValue={handleChangeRelativeFormValues}
                  recipientIndex={relativeFormRecipientIndex}
                  handleRecipientChange={handleRelativeFormRecipientChange}
                />
              </>: null
            }
          </Col>
          <Col md='4'>
            <div className='price-container'>
              <h2>Total</h2>

              <Divider variant='middle' />

              <div className='content-container'>
                <p>{basketsNumber} paniers : {basketsPrice.toFixed(2)} €</p>
                <p>Total TTC : {basketsPrice.toFixed(2)} €</p>
              </div>

              <Divider variant='middle' />

              {step === 1 ?
                <button className='next-button' onClick={nextStep}>Suivant</button> :
                null
              }

              {step === 2 ?
                (isLoading ?
                  <button className='next-button'>
                    <ClipLoader
                      css={spinnerStyle}
                      sizeUnit={'px'}
                      size={25}
                      color={'#000'}
                      loading={true}
                    />
                  </button> :
                  <button className='next-button' onClick={handleSubmitPersonalForm}>Suivant</button>
                ) : null
              }

              {step === 3 ?
                (isLoading ?
                  <button className='next-button'>
                    <ClipLoader
                      css={spinnerStyle}
                      sizeUnit={'px'}
                      size={25}
                      color={'#000'}
                      loading={true}
                    />
                  </button> :
                  <button className='next-button' onClick={handleSubmitRelativeForm}>Commander</button>
                ) : null
              }
            </div>
          </Col>
        </Row> :
        <div className='empty-cart-container'>
          <p>Votre panier est vide.</p>
          <a href='/#baskets' className='discover-baskets-button'>Découvrir les paniers</a>
        </div>
    }

    </section>
  );
};

export default Cart;
