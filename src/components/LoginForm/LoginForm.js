import React, { useState } from 'react';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';
import TextField from '@material-ui/core/TextField';

import { loginUser } from '../../services/users';

import './LoginForm.scss';

const spinnerStyle = css`
  display: block;
  margin: 0 auto;
`;

const LoginForm = ({ onLogin }) => {
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [responseStatus, setResponseStatus] = useState(null);

  const handleChangeFormValue = (e) => {
		const targetName = e.target.name;

    form[targetName] = e.target.value;
    errors[targetName] = false;

    setResponseStatus(null);
    setForm({ ...form });
		setErrors({ ...errors });
  };

  const	verifyEmail = (email) => {
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
			return true;
		}

    errors['email'] = true;
    setErrors({ ...errors });

    return false;
	};

  const verifyPassword = (password) => {
    if (password !== '') {
      return true;
    }

    errors['password'] = true;
    setErrors({ ...errors });

    return false;
  }

  const verifyForm = () => verifyEmail(form.email) && verifyPassword(form.password);

  const login = async () => {
    if (verifyForm()) {
      try {
        setIsLoading(true);
        await loginUser(form);
        onLogin();
      } catch(e) {
        console.log(e);
        if (e.response.status === 404) {
          errors['email'] = true;
          setErrors({ ...errors });
          setResponseStatus(e.response.status);
        }
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <div id='login-form'>
      <form onSubmit={login}>
        <TextField
          type='email'
          required
          className='full-width'
          error={errors['email'] || responseStatus === 404}
          label='Email'
          name='email'
          value={form.email}
          onChange={handleChangeFormValue}
          disabled={isLoading}
        />

        <TextField
          type='password'
          error={errors['password'] || responseStatus === 404}
          label='Mot de passe'
          required
          name='password'
          className='full-width password-field'
          value={form.password}
          onChange={handleChangeFormValue}
          helperText='8 caractères, 1 minuscule, 1 majuscule, 1 chiffre'
          disabled={isLoading}
        />

        {responseStatus === 404 ? <p className='wrong-user-password'>Utilisateur inconnu</p> : null}

        {isLoading ?
          <span className='login-button'>
            <ClipLoader
              css={spinnerStyle}
              sizeUnit={'px'}
              size={25}
              color={'#fff'}
              loading={true}
            />
          </span> :
          <button type='submit' className='login-button' onClick={login}>Se connecter</button>
        }
      </form>
    </div>
  );
};

export default LoginForm;
