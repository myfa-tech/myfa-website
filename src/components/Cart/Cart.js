import React, { useEffect, useState } from 'react';
import Divider from '@material-ui/core/Divider';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';
import { some } from 'lodash';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { Row, Col } from 'react-bootstrap';

import PersonalInfo from './PersonalInfo';
import RelativeInfo from './RelativeInfo';
import CartItems from './CartItems';

import { addRecipient } from '../../services/users';
import lydiaService from '../../services/lydia';
import { saveUser } from '../../services/users';
import EventEmitter from '../../services/EventEmitter';

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
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    relation: '',
    email: '',
    country: '+225',
    zone: '',
    phone: '',
  });
  const [errors, setErrors] = useState({
    email: false,
    phone: false,
    zone: false,
    firstname: false,
    lastname: false,
  });
  const [personalForm, setPersonalForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    country: '+33',
    phone: '',
    cgu: false,
  });
  const [personalFormErrors, setPersonalFormErrors] = useState({
    email: false,
    phone: false,
    zone: false,
    firstname: false,
    lastname: false,
    cgu: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [responseStatus, setResponseStatus] = useState(null);

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

  const verifyFirstname = (type, name) => {
    if (name !== '') {
      return true;
    }

    if (type === 'personal') {
      personalFormErrors['firstname'] = true;
      setPersonalFormErrors({ ...personalFormErrors });
    } else {
      errors['firstname'] = true;
      setErrors({ ...errors });
    }

    return false;
  };

  const verifyLastname = (type, name) => {
    if (name !== '') {
      return true;
    }

    if (type === 'personal') {
      personalFormErrors['lastname'] = true;
      setPersonalFormErrors({ ...personalFormErrors });
    } else {
      errors['lastname'] = true;
      setErrors({ ...errors });
    }

    return false;
  };

  const verifyEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
			return true;
		}

    personalFormErrors['email'] = true;
    setPersonalFormErrors({ ...personalFormErrors });

    return false;
  };

	const verifyPhone = (phone) => {
    const countryCodes = { '+225': 'CI', '+33': 'FR' };
		const phoneNumber = parsePhoneNumberFromString(phone, countryCodes[form.country]);

		if (phoneNumber && phoneNumber.isValid()) {
      return true;
    }

    errors['phone'] = true;
    setErrors({ ...errors });

    return false;
  };

	const verifyZone = (zone) => {
		if (zone !== '') {
			return true;
    }

    errors['zone'] = true;
    setErrors({ ...errors });

    return false;
  };

  const verifyCGU = (cgu) => {
    if (cgu) {
      return true;
    }

    personalFormErrors['cgu'] = true;
    setPersonalFormErrors({ ...personalFormErrors });

    return false;
  };

  const verifyPassword = (password) => {
    if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/.test(password)) {
      return true;
    }

    personalFormErrors['password'] = true;
    setPersonalFormErrors({ ...personalFormErrors });

    return false;
  }

  const verifyForm = (type) => {
    let formToCheck = (type === 'personal') ? personalForm : form;

    return verifyFirstname(type, formToCheck.firstname)
      && verifyLastname(type, formToCheck.lastname)
      && (step !== 2 || verifyEmail(formToCheck.email))
      && (step !== 2 || verifyPassword(personalForm.password))
      && verifyZone(formToCheck.zone)
      && (step === 2 || verifyPhone(formToCheck.phone))
      && (step !== 2 || verifyCGU(personalForm.cgu));
  }

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
      if (verifyForm('relative')) {
        pay();
      } else {
        scrollToTop();
      }
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

  const pay = async () => {
    const user = JSON.parse(window.localStorage.getItem('user'));

    setIsLoading(true);

    cart.recipient = form;
    cart.price = basketsPrice;

    const promises = [lydiaService.requestPayment(cart, user.email)];

    if (!some(user.recipients, form)) {
      promises.push(addRecipient(form));
    }

    await Promise.all(promises);
    setIsLoading(false);
  };

  const signup = async () => {
    if (verifyForm('personal')) {
      try {
        setIsLoading(true);
        await saveUser({ ...personalForm, recipients: [] });
        nextStep();
      } catch(e) {
        if (e.response.status === 409) {
          personalFormErrors['email'] = true;
          setPersonalFormErrors({ ...personalFormErrors });
          setResponseStatus(e.response.status);
          scrollToTop();
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      scrollToTop();
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
                  form={personalForm}
                  responseStatus={responseStatus}
                  setErrors={setPersonalFormErrors}
                  setForm={setPersonalForm}
                  setResponseStatus={setResponseStatus}
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
                  errors={errors}
                  form={form}
                  setErrors={setErrors}
                  setForm={setForm}
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
                  <button className='next-button' onClick={signup}>Suivant</button>
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
                  <button className='next-button' onClick={nextStep}>Commander</button>
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
