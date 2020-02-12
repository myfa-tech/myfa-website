import React, { useState } from 'react';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';
import TextField from '@material-ui/core/TextField';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import GoogleLogin from 'react-google-login';

import { loginUser, loginFBUser, loginGoogleUser } from '../../services/users';

import './LoginForm.scss';

const spinnerStyle = css`
  display: block;
  margin: 0 auto;
`;

const FB_APP_ID = process.env.GATSBY_FB_APP_ID;
const GOOGLE_CLIENT_ID = process.env.GATSBY_GOOGLE_CLIENT_ID;

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
  const [isFBLoading, setIsFBLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
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

  const login = async (e) => {
    e.preventDefault();

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

        setIsFBLoading(true);
        await loginFBUser(user);
        onLogin();
      } else {
        // @TODO: deal with error
        console.log(response);
      }
    } catch(e) {
      console.log(e);
    } finally {
      setIsFBLoading(false);
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

        setIsGoogleLoading(true);
        await loginGoogleUser(user);
        onLogin();
      } else {
        // @TODO: deal with error
        console.log(response);
      }
    } catch(e) {
      console.log(e);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const componentClicked = () => {};

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
          <button type='submit' className='login-button'>Se connecter</button>
        }
        <FacebookLogin
          appId={FB_APP_ID}
          autoLoad={false}
          fields='name, email'
          callback={responseFacebook}
          onClick={componentClicked}
          render={renderProps => (
            <button type='button' className='facebook-button' onClick={renderProps.onClick}>
              {isFBLoading ?
                <ClipLoader
                  css={spinnerStyle}
                  sizeUnit={'px'}
                  size={25}
                  color={'#fff'}
                  loading={true}
                /> :
                <>
                  <FaFacebook />
                  <span>Continuer avec Facebook</span>
                </>
              }
            </button>
          )}
        />

        <GoogleLogin
          clientId={`${GOOGLE_CLIENT_ID}.apps.googleusercontent.com`}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
          render={renderProps => (
            <button type='button' className='google-button' onClick={renderProps.onClick}>
              {isGoogleLoading ?
                <ClipLoader
                  css={spinnerStyle}
                  sizeUnit={'px'}
                  size={25}
                  color={'#fff'}
                  loading={true}
                /> :
                <>
                  <FaGoogle />
                  <span>Continuer avec Google</span>
                </>
              }
            </button>
          )}
        />

        <p className='cgu-cgv-accept'>En vous connectant, vous acceptez nos <a href='/cgv' target='_blank'>CGV</a> et <a href='/cgu' target='_blank'>CGU</a>.</p>
      </form>
    </div>
  );
};

export default LoginForm;
