import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { saveUser } from '../../services/users';

import './SignupForm.scss';

const spinnerStyle = css`
  display: block;
  margin: 0 auto;
`;

const SignupForm = ({ onSignup }) => {
  const [errors, setErrors] = useState({
    firstname: false,
    lastname: false,
    phone: false,
    password: false,
    passwordConfirm: false,
    cgu: false,
  });
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    country: '+33',
    password: '',
    phone: '',
    cgu: false,
  });
  const [responseStatus, setResponseStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const verifyForm = () => {
    return verifyFirstname(form.firstname)
      && verifyLastname(form.lastname)
      && verifyEmail(form.email)
      && verifyPhone(form.phone)
      && verifyPassword(form.password)
      && verifyCGU(form.cgu);
  }

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

  const verifyCGU = (cgu) => {
    if (cgu) {
      return true;
    }

    errors['cgu'] = true;
    setErrors({ ...errors });

    return false;
  };

  const	verifyEmail = (email) => {
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
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

  const verifyPassword = (password) => {
    if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/.test(password)) {
      return true;
    }

    errors['password'] = true;
    setErrors({ ...errors });

    return false;
  }

  const signup = async (e) => {
    e.preventDefault();

    if (verifyForm()) {
      try {
        setIsLoading(true);
        await saveUser({ ...form, recipients: [] });
        onSignup()
      } catch(e) {
        if (e.response.status === 409) {
          errors['email'] = true;
          setErrors({ ...errors });
          setResponseStatus(e.response.status);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <form id='signup-form' onSubmit={signup}>
      <Row>
        <Col xs='6'>
          <TextField type='text' className='full-width' required error={errors['firstname']} label='Prénom' name='firstname' value={form.firstname} onChange={handleChangeFormValue} disabled={isLoading} />
        </Col>
        <Col xs='6'>
          <TextField type='text' className='full-width' required error={errors['lastname']} label='Nom' name='lastname' value={form.lastname} onChange={handleChangeFormValue} disabled={isLoading} />
        </Col>
      </Row>

      <TextField type='email' helperText={responseStatus === 409 ? 'Utilisateur déja existant' : null} required className='full-width' error={errors['email']} label='Email' name='email' value={form.email} onChange={handleChangeFormValue} disabled={isLoading} />

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
            <MenuItem value='+33'>🇫🇷 +33</MenuItem>
            <MenuItem value='+225'>🇨🇮 +225</MenuItem>
          </TextField>
          <TextField
            type='tel'
            error={errors['phone']}
            label='Téléphone'
            name='phone'
            className='phone-input'
            value={form.phone}
            onChange={handleChangeFormValue}
            disabled={isLoading}
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
        disabled={isLoading}
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

      {isLoading ?
        <span className='signup-button'>
          <ClipLoader
            css={spinnerStyle}
            sizeUnit={'px'}
            size={25}
            color={'#fff'}
            loading={true}
          />
        </span> :
        <button type='submit' className='signup-button'>S'inscrire</button>
      }
    </form>
  )
}

export default SignupForm;
