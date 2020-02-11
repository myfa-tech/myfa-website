import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { isEqual, some } from 'lodash';

import { addRecipient } from '../../services/users';
import lydiaService from '../../services/lydia';

import './PayForm.scss';

const spinnerStyle = css`
  display: block;
  margin: 0 auto;
`;

const PayForm = ({
  basket,
  isLoading,
  setIsLoading,
}) => {
  const [errors, setErrors] = useState({
    email: false,
    phone: false,
    zone: false,
    firstname: false,
    lastname: false,
  });
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    relation: '',
    email: '',
    country: '+225',
    zone: '',
    phone: '',
  });
  const [recipientIndex, setRecipientIndex] = useState(0);
  const [isFirstUpdate, setIsFirstUpdate] = useState(true);
  const user = JSON.parse(window.localStorage.getItem('user'));

  useEffect(() => {
    setIsFirstUpdate(false);
  }, []);

  useEffect(() => {
    if (recipientIndex !== -1 && !isEqual(user.recipients[recipientIndex], form) && !isFirstUpdate) {
      setRecipientIndex(-1);
    }
  }, [form]);

  useEffect(() => {
    if (recipientIndex !== -1 && !!user.recipients.length) {
      const newFormValues = user.recipients[recipientIndex];
      setForm({ ...newFormValues });
    }
  }, [recipientIndex]);

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
  }

  const verifyForm = () => {
    return verifyFirstname(form.firstname)
      && verifyLastname(form.lastname)
      && verifyEmail(form.email)
      && verifyZone(form.zone)
      && verifyPhone(form.phone);
  }

  const pay = async () => {
    const user = JSON.parse(window.localStorage.getItem('user'));

		if (verifyForm()) {
      setIsLoading(true);
      const promises = [lydiaService.requestPayment(basket, {
        recipient: form,
        userEmail: user.email,
        zone: form.zone
      })];

      if (!some(user.recipients, form)) {
        promises.push(addRecipient(form));
      }

      await Promise.all(promises);
			setIsLoading(false);
		} else {
			console.log('wrong form info');
		}
  };

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

  const	verifyEmail = (email) => {
		if (email === '' || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
			return true;
		}

    errors['email'] = true;
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

  return (
    <form id='pay-form'>
      <p className='important-text'>Informations sur votre proche</p>
      <select name='relation' className='form-input relation-select' value={recipientIndex} onChange={handleRecipientChange} disabled={isLoading}>
        {user.recipients.map((rec, index) => (
          <option key={index} value={index}>{rec.firstname} {rec.lastname}</option>
        ))}
        <option value={-1}>Autre</option>
      </select>

      <Row>
        <Col xs='6'>
          <TextField
            type='text'
            required
            error={errors['firstname']}
            label='Prénom'
            className='full-width'
            name='firstname'
            value={form.firstname}
            onChange={handleChangeFormValue}
            disabled={isLoading}
          />
        </Col>
        <Col xs='6'>
          <TextField
            type='text'
            required
            className='full-width'
            error={errors['lastname']}
            label='Nom'
            name='lastname'
            value={form.lastname}
            onChange={handleChangeFormValue}
            disabled={isLoading}
          />
        </Col>
      </Row>
      <TextField type='email' className='full-width' error={errors['email']} label='Email' name='email' value={form.email} onChange={handleChangeFormValue} disabled={isLoading} />
      <TextField
        select
        label='Relation'
        name='relation'
        className='full-width'
        disabled={isLoading}
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
        disabled={isLoading}
        placeholder='Quartier de la livraison'
        value={form.zone}
        className='full-width'
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
      <div className='phone-container'>
        <TextField
          select
          label='Indicatif'
          name='country'
          className='country-code'
          disabled={isLoading}
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
          name='phone'
          required
          className='phone-input'
          value={form.phone}
          onChange={handleChangeFormValue}
          disabled={isLoading}
        />
      </div>

      {isLoading ?
        <span className='order-button modal-order'>
          <ClipLoader
            css={spinnerStyle}
            sizeUnit={'px'}
            size={25}
            color={'#fff'}
            loading={true}
          />
        </span> :
        <button type='button' className='order-button modal-order' onClick={pay}>Commander</button>
      }
    </form>
  )
}

export default PayForm;
