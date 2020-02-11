import React, { useEffect, useState } from 'react';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';
import { isEqual, some } from 'lodash';
import { FaRegTrashAlt } from 'react-icons/fa';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

import { addRecipient } from '../../services/users';
import lydiaService from '../../services/lydia';
import { saveUser } from '../../services/users';
import EventEmitter from '../../services/EventEmitter';

import './Cart.scss';
import { Row, Col } from 'react-bootstrap';

import baskets from '../../assets/baskets';
import { customBasketDetails } from '../../assets/customBasket';

const basketsDetails = [
  ...baskets,
  customBasketDetails,
];

const spinnerStyle = css`
  display: block;
  margin: 0 auto;
`;

const CartItems = ({ basketsPrice, cart, editItems, removeBaskets }) => {
  return (
    <div className='cart-container'>
      <h2>Mon panier</h2>

      <Divider variant='middle' />

      <ul className='baskets-container'>
        {Object.keys(cart.baskets).map((basketKey, index) => (
            <li key={index}>
              <Row>
                <Col xs={0} sm={2} className='image-container d-none d-sm-block'>
                  <img src={cart.baskets[basketKey].img} />
                </Col>
                <Col xs={7} sm={6} className='label-container'>
                  <h3>{cart.baskets[basketKey].label}</h3>
                  <p>{cart.baskets[basketKey].price.toFixed(2)} €</p>
                </Col>
                <Col xs={5} sm={4} className='qty-container'>
                  <div className='qty'>
                    <p>Qté</p>
                    <p>
                      <button className='minus-button' onClick={() => editItems(cart.baskets[basketKey].type, -1)}>-</button>
                      <span>{cart.baskets[basketKey].qty}</span>
                      <button className='plus-button' onClick={() => editItems(cart.baskets[basketKey].type, 1)}>+</button>
                    </p>
                  </div>
                  <div className='trash-container'>
                    <FaRegTrashAlt className='trash-icon' onClick={() => removeBaskets(basketKey)} />
                  </div>
                </Col>
                <Col></Col>
              </Row>
            </li>
          ))}
      </ul>

      <div className='subtotal-container'>
        <p className='subtotal'>Sous-total : {basketsPrice.toFixed(2)} €</p>
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
          label='Mes proches enregistrés'
          name='relation'
          variant='outlined'
          className='full-width form-input'
          value={recipientIndex}
          onChange={handleRecipientChange}
        >
          {user && user.recipients.map((rec, index) => (
            <MenuItem key={index} value={index}>{rec.firstname} {rec.lastname}</MenuItem>
          ))}
          <MenuItem value={-1}>--</MenuItem>
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
          error={errors['zone']}
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

const PersonalInfo = ({ errors, form, responseStatus, setErrors, setForm, setResponseStatus }) => {
  const handleChangeFormValue = (e) => {
		const targetName = e.target.name;

    if (e.target.type === 'checkbox') {
      form[targetName] = e.target.checked;
    } else if (targetName === 'email') {
      form[targetName] = e.target.value;
      setResponseStatus(null);
    } else {
      form[targetName] = e.target.value;
    }

    errors[targetName] = false;

    setForm({ ...form });
		setErrors({ ...errors });
  };

  return (
    <div className='personal-container'>
      <h2>Je m'inscris pour commander</h2>

      <Divider variant='middle' />

      <form className='personal-form'>
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
          required
          helperText={responseStatus === 409 ? 'Utilisateur déja existant' : null}
          error={errors['email']}
          label='Email'
          name='email'
          value={form.email}
          onChange={handleChangeFormValue}
        />

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
            className='phone-input'
            value={form.phone}
            onChange={handleChangeFormValue}
          />
        </div>

        <TextField
          type='password'
          error={errors['password']}
          label='Mot de passe'
          required
          name='password'
          className='full-width'
          value={form.password}
          onChange={handleChangeFormValue}
          helperText='8 caractères, 1 minuscule, 1 majuscule, 1 chiffre'
        />

        <FormControlLabel
          className={`full-width cgu-cgv ${errors['cgu'] ? 'error' : ''}`}
          control={
            <Checkbox
              checked={form.cgu}
              name='cgu'
              required
              onChange={handleChangeFormValue}
              value={form.cgu}
              color='primary'
            />
          }
          label={<p className='cgu-cgv-label'>J'accepte les <a href='/cgv' target='_blank'>CGV</a> et <a href='/cgu' target='_blank'>CGU</a></p>}
        />
      </form>
    </div>
  );
};

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
  }, []);

  useEffect(() => {
    updateBasketsPriceAndNumber();
  }, [cart]);

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
