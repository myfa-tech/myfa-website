import React, { useEffect, useState } from 'react';
import Divider from '@material-ui/core/Divider';
import { css } from '@emotion/core';
import { Row, Col } from 'react-bootstrap';

import PersonalInfo from './PersonalInfo';
import RelativeInfo from './RelativeInfo';
import CartItems from './CartItems';
import MessageToRelative from './MessageToRelative';
import ButtonWithLoader from '../ButtonWithLoader';

import { addRecipient, loginUser, loginFBUser, loginGoogleUser } from '../../services/users';
import stripeService from '../../services/stripe';
import { saveUser } from '../../services/users';
import EventEmitter from '../../services/EventEmitter';
import useSignupForm from '../../hooks/useSignupForm';
import useLoginForm from '../../hooks/useLoginForm';
import useRelativeForm from '../../hooks/useRelativeForm';
import useTranslate from '../../hooks/useTranslate';
import UserStorage from '../../services/UserStorage';
import CartStorage from '../../services/CartStorage';
import mobileMoney from '../../services/mobileMoney';
import some from '../../utils/some';

import './Cart.scss';

const spinnerStyle = css`
  display: block;
  margin: 0 auto;
`;

const NODE_ENV = process.env.NODE_ENV;

const Cart = () => {
  const [cart, setCart] = useState({});
  const [basketsPrice, setBasketsPrice] = useState(0);
  const [basketsNumber, setBasketsNumber] = useState(0);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
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
  ] = useRelativeForm(nextStep);
  const [t] = useTranslate();

  const user = UserStorage.getUser();
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

  const handleRecipientChange = (e) => {
    setRelativeFormRecipientIndex(Number(e.target.value));
    handleRelativeFormRecipientChange(e);
  };

  const initCart = async () => {
    let newCart = await CartStorage.getCartFromStorage();

    if (!!newCart) {
      let enhancedCart = {};

      enhancedCart.baskets = newCart.baskets.reduce((acc, cur) => {
        if (!acc[cur.type]) {
          acc[cur.type] = {
            ...cur,
            price: 0,
            qty: 0,
            singlePrice: cur.price,
            items: cur.items || {},
          };

          delete acc[cur.type].img;
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
    } else {
      setCart({});
      setBasketsNumber(0);
      setBasketsPrice(0);
    }

    setIsFetching(false);
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

  const goToStep = (stepId) => {
    if ((stepId === 2 && !!user) ||
      ((stepId === 3 || stepId === 4) && !user)) {
      return;
    }


    setStep(stepId);
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

  const handleNext = (e) => {
    const user = UserStorage.getUser();
    let increment = 1;

    if (user && step === 1) {
      increment = 2;
      nextStep(increment);
    } else if (step === 2) {
      if (identificationPath === 'signup') {
        handleSubmitSignupForm(e);
      } else {
        handleSubmitLoginForm(e);
      }
    } else if (step === 3) {
      handleSubmitRelativeForm(e);
    } else if (step === 4) {
      pay();
    } else {
      nextStep();
    }
  };

  function nextStep(increment = 1) {
    setStep(step + increment);
    scrollToTop();
  };

  const handleChangeMessageToRelative = (message) => {
    setCart({ ...cart, message });
  };

  const removeBaskets = (basketTypeToRemove) => {
    CartStorage.deleteBasketsByType(basketTypeToRemove);

    delete cart.baskets[basketTypeToRemove];
    setCart({ ...cart });
  };

  async function pay() {
    const user = UserStorage.getUser();

    setIsLoading(true);

    cart.recipient = relativeFormValues;
    cart.price = basketsPrice;

    const promises = [];

    if (NODE_ENV === 'development') {
      cart.isTest = true;
    }

    promises.push(stripeService.createPayment(cart, user));

    if (!some(user.recipients, relativeFormValues)) {
      promises.push(addRecipient(relativeFormValues));
    }

    await Promise.all(promises);

    emptyStoredCart();
    setIsLoading(false);
  };

  async function checkoutWithMTNOrangeMoney() {
    const user = UserStorage.getUser();

    setIsLoading(true);

    cart.recipient = relativeFormValues;
    cart.price = basketsPrice;

    const promises = [];

    if (NODE_ENV === 'development') {
      cart.isTest = true;
    }

    promises.push(mobileMoney.createPayment(cart, user));

    if (!some(user.recipients, relativeFormValues)) {
      promises.push(addRecipient(relativeFormValues));
    }

    await Promise.all(promises);

    emptyStoredCart();
    setIsLoading(false);
  };

  const emptyStoredCart = async () => {
    await CartStorage.deleteCart();
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
              {step === 1 ?
                <CartItems
                  cart={cart}
                  basketsPrice={basketsPrice}
                  editItems={editItems}
                  removeBaskets={removeBaskets}
                /> :
                <div className='disabled-section' onClick={() => goToStep(1)}>
                  <h2>{t('cart.items.title')}</h2>
                </div>
              }
              {step === 2 ?
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
                /> :
                <div className={`disabled-section signup-to-order ${!!user ? 'cannot-click' : ''}`} onClick={() => goToStep(2)}>
                  <h2>{t('cart.self_info_title')}</h2>
                </div>
              }
              {step === 3 ?
                <RelativeInfo
                  errors={relativeFormErrors}
                  form={relativeFormValues}
                  handleChangeFormValue={handleChangeRelativeForm}
                  recipientIndex={relativeFormRecipientIndex}
                  handleRecipientChange={handleRecipientChange}
                  showOtherRelationInput={showOtherRelationInput}
                /> :
                <div className={`disabled-section relative-info ${!user ? 'cannot-click' : ''}`} onClick={() => goToStep(3)}>
                  <h2>{t('cart.relative_info_title')}</h2>
                </div>
              }
              {step === 4 ?
                <MessageToRelative
                  message={cart.message}
                  handleChangeMessage={handleChangeMessageToRelative}
                /> :
                <div className={`disabled-section message-to-relative ${!user ? 'cannot-click' : ''}`} onClick={() => goToStep(4)}>
                  <h2>{t('cart.message_to_relative_title')}</h2>
                </div>
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

                <Divider variant='middle' className='second-divider' />

                {(step <= 3) ?
                  <ButtonWithLoader
                    isLoading={isLoading}
                    label={t('cart.price_container.next')}
                    onClick={handleNext}
                    className='next-button'
                  /> :
                  <>
                    <ButtonWithLoader
                      isLoading={isLoading}
                      label={t('cart.price_container.pay_by_card')}
                      onClick={handleNext}
                      className='next-button pay-by-card-btn'
                    />
                    <ButtonWithLoader
                      isLoading={isLoading}
                      label={t('cart.price_container.orange_mtn_button')}
                      onClick={checkoutWithMTNOrangeMoney}
                      className='next-button'
                    />
                  </>
                }

                <p className='covid19-warning'>{t('cart.price_container.covid19_warning')}</p>
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
