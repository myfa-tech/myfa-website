import React, { useEffect, useState } from 'react';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';
import { isEqual, some } from 'lodash';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

import { addRecipient } from '../../services/users';
import lydiaService from '../../services/lydia';

import './Cart.scss';
import { Row, Col } from 'react-bootstrap';

import baskets from '../../assets/baskets';

const spinnerStyle = css`
  display: block;
  margin: 0 auto;
`;

const CartItems = ({ basketsPrice, cart }) => {
  return (
    <div className='cart-container'>
      <h2>Mon panier</h2>

      <Divider variant='middle' />

      <ul className='baskets-container'>
        {Object.keys(cart.baskets).map((basketKey, index) => {
          return (
            <li key={index}>
              <Row>
                <Col xs={2} sm={2} className='image-container'>
                  <img src={cart.baskets[basketKey].img} />
                </Col>
                <Col xs={7} sm={6} className='label-container'>
                  <h3>{(baskets.find(b => b.type === basketKey) || {}).label}</h3>
                  <p>{(baskets.find(b => b.type === basketKey) || {}).price} €</p>
                </Col>
                <Col xs={3} sm={4} className='qty-container'>
                  <p>Qté : {cart.baskets[basketKey].qty}</p>
                </Col>
                <Col></Col>
              </Row>
            </li>
          );
        })}
      </ul>

      <div className='subtotal-container'>
        <p className='subtotal'>Sous-total : {basketsPrice} €</p>
      </div>
    </div>
  );
}

const RelativeInfo = ({ errors, form, setErrors, setForm }) => {
  const user = JSON.parse(window.localStorage.getItem('user'));
  const [recipientIndex, setRecipientIndex] = useState(0);
  const [isFirstUpdate, setIsFirstUpdate] = useState(true);

  useEffect(() => {
    setIsFirstUpdate(false);
  }, []);

  useEffect(() => {
    if (recipientIndex !== -1 && !!user.recipients.length) {
      const newFormValues = user.recipients[recipientIndex];
      setForm({ ...newFormValues });
    }
  }, [recipientIndex]);

  useEffect(() => {
    if (recipientIndex !== -1 && !isEqual(user.recipients[recipientIndex], form) && !isFirstUpdate) {
      setRecipientIndex(-1);
    }
  }, [form]);

  const handleChangeFormValue = (e) => {
		const targetName = e.target.name;

    form[targetName] = e.target.value;
    errors[targetName] = false;

    setForm({ ...form });
		setErrors({ ...errors });
  };

  const handleRecipientChange = (e) => {
    setForm({
      firstname: '',
      lastname: '',
      relation: '',
      email: '',
      country: '+225',
      zone: '',
      phone: '',
    });
    setRecipientIndex(Number(e.target.value));
  };

  return (
    <div className='relative-container'>
      <h2>Informations sur mon proche</h2>

      <Divider variant='middle' />

      <form className='relative-form'>
        <TextField
          select
          label='Proche'
          name='relation'
          variant='outlined'
          className='full-width form-input'
          value={recipientIndex}
          onChange={handleRecipientChange}
        >
          {user && user.recipients.map((rec, index) => (
            <MenuItem key={index} value={index}>{rec.firstname} {rec.lastname}</MenuItem>
          ))}
          <MenuItem value={-1}>Autre</MenuItem>
        </TextField>

        <Row>
          <Col xs='6'>
            <TextField
              type='text'
              required
              error={errors['firstname']}
              label='Prénom'
              variant='outlined'
              className='full-width form-input'
              name='firstname'
              value={form.firstname}
              onChange={handleChangeFormValue}
            />
          </Col>
          <Col xs='6'>
            <TextField
              type='text'
              required
              variant='outlined'
              className='full-width form-input'
              error={errors['lastname']}
              label='Nom'
              name='lastname'
              value={form.lastname}
              onChange={handleChangeFormValue}
            />
          </Col>
        </Row>
        <TextField
          type='email'
          className='full-width form-input'
          variant='outlined'
          error={errors['email']}
          label='Email'
          name='email'
          value={form.email}
          onChange={handleChangeFormValue}
        />
        <TextField
          select
          label='Relation'
          name='relation'
          variant='outlined'
          className='full-width form-input'
          value={form.relation}
          onChange={handleChangeFormValue}
          helperText='Quelle relation avez-vous avec votre proche ?'
        >
          <MenuItem value='AM'>Ami(e)</MenuItem>
          <MenuItem value='CO'>Conjoint(e)</MenuItem>
          <MenuItem value='EN'>Enfant</MenuItem>
          <MenuItem value='FR'>Frère</MenuItem>
          <MenuItem value='GM'>Grand-mère</MenuItem>
          <MenuItem value='GP'>Grand-père</MenuItem>
          <MenuItem value='ME'>Mère</MenuItem>
          <MenuItem value='NE'>Neveu</MenuItem>
          <MenuItem value='NI'>Nièce</MenuItem>
          <MenuItem value='ON'>Oncle</MenuItem>
          <MenuItem value='PE'>Père</MenuItem>
          <MenuItem value='SO'>Soeur</MenuItem>
          <MenuItem value='TA'>Tante</MenuItem>
          <MenuItem value='AU'>Autre</MenuItem>
        </TextField>
        <TextField
          select
          label='Zone de livraison'
          required
          name='zone'
          variant='outlined'
          placeholder='Quartier de la livraison'
          value={form.zone}
          className='full-width form-input'
          onChange={handleChangeFormValue}
        >
          <MenuItem value='2PL'>2 Plateaux</MenuItem>
          <MenuItem value='AB'>Abobo</MenuItem>
          <MenuItem value='AD'>Adjamé</MenuItem>
          <MenuItem value='AT'>Attécoubé</MenuItem>
          <MenuItem value='CO'>Cocody</MenuItem>
          <MenuItem value='KO'>Koumassi</MenuItem>
          <MenuItem value='MA'>Marcory</MenuItem>
          <MenuItem value='PL'>Plateau</MenuItem>
          <MenuItem value='PB'>Port-Bouët</MenuItem>
          <MenuItem value='RI'>Riviera</MenuItem>
          <MenuItem value='TR'>Treichville</MenuItem>
          <MenuItem value='YO'>Yopougon</MenuItem>
        </TextField>
        <div className='phone-container form-input'>
          <TextField
            select
            label='Indicatif'
            name='country'
            variant='outlined'
            className='country-code'
            value={form.country}
            onChange={handleChangeFormValue}
          >
            <MenuItem value='+225'>🇨🇮 +225</MenuItem>
            <MenuItem value='+33'>🇫🇷 +33</MenuItem>
          </TextField>
          <TextField
            type='tel'
            error={errors['phone']}
            label='Téléphone'
            variant='outlined'
            name='phone'
            required
            className='phone-input'
            value={form.phone}
            onChange={handleChangeFormValue}
          />
        </div>
      </form>
    </div>
  );
};

const Cart = () => {
  const [cart, setCart] = useState({});
  const [basketsPrice, setBasketPrice] = useState(0);
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let newCart = JSON.parse(window.localStorage.getItem('cart'));

      if (!!newCart) {
        let enhancedCart = {};

        enhancedCart.baskets = newCart.reduce((acc, cur) => {
          if (!acc[cur.type]) {
            acc[cur.type] = {
              price: 0,
              qty: 0,
              img: cur.img,
            };
          }

          acc[cur.type].qty = acc[cur.type].qty + 1;
          acc[cur.type].price = acc[cur.type].price + cur.price;

          return acc;
        }, {});

        let newBasketsNumber = Object.values(enhancedCart.baskets).map(v => v.qty).reduce((acc, cur) => acc + cur, 0);
        let newBasketsPrice = Object.values(enhancedCart.baskets).map(v => v.price).reduce((acc, cur) => acc + cur, 0);

        enhancedCart.price = newBasketsPrice;

        setCart(enhancedCart);
        setBasketsNumber(newBasketsNumber);
        setBasketPrice(newBasketsPrice);
      }
    }
  }, []);

  const verifyFirstname = (name) => {
    if (name !== '') {
      return true;
    }

    errors['firstname'] = true;
    setErrors({ ...errors });

    return false;
  };

  const verifyLastname = (name) => {
    if (name !== '') {
      return true;
    }

    errors['lastname'] = true;
    setErrors({ ...errors });

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

  const verifyForm = () => {
    return verifyFirstname(form.firstname)
      && verifyLastname(form.lastname)
      && verifyZone(form.zone)
      && verifyPhone(form.phone);
  }

  const nextStep = () => {
    if (step === 2) {
      if (verifyForm()) {
        setStep(step + 1);
      }
    } else {
      setStep(step + 1);
    }
  }

  const pay = async () => {
    const user = JSON.parse(window.localStorage.getItem('user'));

		if (verifyForm()) {
      setIsLoading(true);
      const promises = [lydiaService.requestPayment(cart, user.email)];

      if (!some(user.recipients, form)) {
        promises.push(addRecipient(form));
      }

      await Promise.all(promises);
			setIsLoading(false);
		} else {
			console.log('wrong form info');
		}
  };

  return (
    <section id='cart'>
      {cart && cart.baskets && Object.keys(cart.baskets).length ?
        <Row>
          <Col md='8'>
            {step === 1 ? <CartItems cart={cart} basketsPrice={basketsPrice} /> : null}
            {step === 2 ? <RelativeInfo errors={errors} form={form} setErrors={setErrors} setForm={setForm} /> : null}
          </Col>
          <Col md='4'>
            <div className='price-container'>
              <h2>Total</h2>

              <Divider variant='middle' />

              <div className='content-container'>
                <p>{basketsNumber} paniers : {basketsPrice} €</p>
                <p>Total TTC : {cart.price} €</p>
              </div>

              <Divider variant='middle' />

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
                  <button className='next-button' onClick={pay}>Commander</button>) :
                <button className='next-button' onClick={nextStep}>Suivant</button>
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
