import React, { useEffect, useState } from 'react';
import Divider from '@material-ui/core/Divider';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';
import { some } from 'lodash';
import { Row, Col } from 'react-bootstrap';

import PersonalInfo from './PersonalInfo';
import RelativeInfo from './RelativeInfo';
import CartItems from './CartItems';

import { addRecipient, loginUser, loginFBUser, loginGoogleUser, fetchUser } from '../../services/users';
import stripeService from '../../services/stripe';
import { saveUser } from '../../services/users';
import EventEmitter from '../../services/EventEmitter';
import useSignupForm from '../../hooks/useSignupForm';
import useLoginForm from '../../hooks/useLoginForm';
import useRelativeForm from '../../hooks/useRelativeForm';
import useTranslate from '../../hooks/useTranslate';

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
  const [isFetching, setIsFetching] = useState(true);
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(null);
  const [responseStatus, setResponseStatus] = useState(null);
  const [identificationPath, setIdentificationPath] = useState('signup');
  const [relativeFormRecipientIndex, setRelativeFormRecipientIndex] = useState(-1);
  const [
    signupFormValues,
    handleChangeSignupFormValues,
    handleSubmitSignupForm,
    signupFormErrors,
    setSignupFormErrors
  ] = useSignupForm(signup, setResponseStatus);
  const [
    loginFormValues,
    handleChangeLoginFormValues,
    handleSubmitLoginForm,
    loginFormErrors,
    setLoginFormErrors
  ] = useLoginForm(login, setResponseStatus);
  const [
    relativeFormValues,
    handleChangeRelativeFormValues,
    setRelativeFormValues,
    handleSubmitRelativeForm,
    relativeFormErrors,
    handleRelativeFormRecipientChange,
    showOtherRelationInput,
  ] = useRelativeForm(pay);
  const [t] = useTranslate();

  const user = typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem('user')) : {};
  const eventEmitter = new EventEmitter();

  useEffect(() => {
    initCart();
    eventEmitter.listen('editCart', initCart);
  }, []);

  useEffect(() => {
    if (relativeFormRecipientIndex !== -1 && !!user && !!user.recipients.length) {
      const newFormValues = user.recipients[relativeFormRecipientIndex];

      setRelativeFormValues({ ...newFormValues });
    }
  }, [relativeFormRecipientIndex]);

  useEffect(() => {
    updateBasketsPriceAndNumber();
  }, [cart]);

  useEffect(() => {
    if (step === 3) {
      checkEmailIsConfirmed();
    }
  }, [step]);

  const handleRecipientChange = (e) => {
    setRelativeFormRecipientIndex(Number(e.target.value));
    handleRelativeFormRecipientChange(e);
  };

  const checkEmailIsConfirmed = async () => {
    const user = await fetchUser();

    if (!!user.emailConfirmed) {
      setIsEmailConfirmed(true);
    } else {
      setIsEmailConfirmed(false);
    }
  };

  const initCart = () => {
    if (typeof window !== 'undefined') {
      let newCart = JSON.parse(window.localStorage.getItem('cart'));

      if (!!newCart) {
        let enhancedCart = {};

        enhancedCart.baskets = newCart.reduce((acc, cur) => {
          if (!acc[cur.type]) {
            acc[cur.type] = {
              ...cur,
              price: 0,
              qty: 0,
              singlePrice: cur.price,
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

      setIsFetching(false);
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

  const responseFacebook = async (response) => {
    const { name, email } = response;

    try {
      if (!!name) {
        let user = {
          firstname: name.split(' ')[0],
          lastname: name.split(' ')[1],
          email,
          cgu: true,
          fbToken: response.accessToken,
        };

        await loginFBUser(user);
        eventEmitter.emit('login');
        setRelativeFormRecipientIndex(0);
        nextStep();
      } else {
        // @TODO: deal with error
        console.log(response);
      }
    } catch(e) {
      console.log(e);
    }
  };

  const responseGoogle = async (response) => {
    try {
      const { givenName, familyName, email } = response.profileObj;

      if (!!email) {
        let user = {
          firstname: givenName,
          lastname: familyName,
          email,
          cgu: true,
          googleToken: response.accessToken,
        };

        await loginGoogleUser(user);
        eventEmitter.emit('login');
        setRelativeFormRecipientIndex(0);
        nextStep();
      } else {
        // @TODO: deal with error
        console.log(response);
      }
    } catch(e) {
      console.log(e);
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

    const promises = [stripeService.createPayment(cart, user.email)];

    if (!some(user.recipients, relativeFormValues)) {
      promises.push(addRecipient(relativeFormValues));
    }

    await Promise.all(promises);

    emptyStoredCart();
    setIsLoading(false);
  };

  const emptyStoredCart = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('cart');
    }
  };

  const handleChangeRelativeForm = (e) => {
    setRelativeFormRecipientIndex(-1);
    handleChangeRelativeFormValues(e);
  }

  async function signup() {
    try {
      setIsLoading(true);
      await saveUser({ ...signupFormValues, recipients: [] });
      setRelativeFormRecipientIndex(0);
      nextStep();
    } catch(e) {
      if (e.response.status === 409) {
        signupFormErrors.email = true;
        setSignupFormErrors({ ...signupFormErrors });
        setResponseStatus(e.response.status);
      }
    } finally {
      setIsLoading(false);
    }
  };

  async function login() {
    try {
      setIsLoading(true);
      await loginUser(loginFormValues);
      eventEmitter.emit('login');
      setRelativeFormRecipientIndex(0);
      nextStep();
    } catch(e) {
      console.log(e);
      if (e.response.status === 404) {
        loginFormErrors.email = true;
        setLoginFormErrors({ ...loginFormErrors });
        setResponseStatus(e.response.status);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id='cart'>
      {!isFetching ?
        cart && cart.baskets && Object.keys(cart.baskets).length ?
          <Row>
            <Col md='8'>
              {step === 1 ? <CartItems cart={cart} basketsPrice={basketsPrice} editItems={editItems} removeBaskets={removeBaskets} /> : null}
              {step === 2 ?
                <>
                  <PersonalInfo
                    signupErrors={signupFormErrors}
                    signupForm={signupFormValues}
                    responseStatus={responseStatus}
                    handleChangeSignupFormValue={handleChangeSignupFormValues}
                    loginErrors={loginFormErrors}
                    isLoading={isLoading}
                    loginForm={loginFormValues}
                    handleChangeLoginFormValue={handleChangeLoginFormValues}
                    identificationPath={identificationPath}
                    setIdentificationPath={setIdentificationPath}
                    responseFacebook={responseFacebook}
                    responseGoogle={responseGoogle}
                  />
                  <div className='disabled-section relative-info'>
                    <h2>{t('cart.relative_info_title')}</h2>
                  </div>
                </> : null
              }
              {step === 3 ?
                <>
                  <div className='disabled-section signup-to-order'>
                    <h2>{t('cart.self_info_title')}</h2>
                  </div>
                  <RelativeInfo
                    errors={relativeFormErrors}
                    form={relativeFormValues}
                    handleChangeFormValue={handleChangeRelativeForm}
                    recipientIndex={relativeFormRecipientIndex}
                    handleRecipientChange={handleRecipientChange}
                    showOtherRelationInput={showOtherRelationInput}
                  />
                </>: null
              }
            </Col>
            <Col md='4'>
              <div className='price-container'>
                <h2>{t('cart.price_container.total')}</h2>

                <Divider variant='middle' />

                <div className='content-container'>
                  <p>{basketsNumber} {t('cart.price_container.baskets')} : {basketsPrice.toFixed(2)} €</p>
                  <p>{t('cart.price_container.grand_total')} : {basketsPrice.toFixed(2)} €</p>
                </div>

                <Divider variant='middle' />

                {step === 1 ?
                  <button className='next-button' onClick={nextStep}>{t('cart.price_container.next')}</button> :
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
                    <button className='next-button' onClick={identificationPath === 'signup' ? handleSubmitSignupForm : handleSubmitLoginForm}>{t('cart.price_container.next')}</button>
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
                    <>
                      <button className={`next-button ${!!isEmailConfirmed ? '' : 'disabled'}`} onClick={handleSubmitRelativeForm} disabled={!isEmailConfirmed}>
                        {t('cart.price_container.checkout')}
                      </button>
                      {isEmailConfirmed === false ?
                        <p className='email-not-confirmed'>{t('cart.price_container.email_not_confirmed')}</p>:
                        null
                      }
                      {typeof isEmailConfirmed === 'undefined' ?
                        <ClipLoader
                          css={spinnerStyle}
                          sizeUnit={'px'}
                          size={25}
                          color={'#f00'}
                          loading={true}
                        />
                        : null
                      }
                    </>
                  ) : null
                }
              </div>
            </Col>
          </Row> :
          <div className='empty-cart-container'>
            <p>{t('cart.empty_cart')}</p>
            <a href='/#baskets' className='discover-baskets-button'>{t('cart.discover_baskets')}</a>
          </div> :
      null}
    </section>
  );
};

export default Cart;
