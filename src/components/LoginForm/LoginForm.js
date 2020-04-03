import React, { useState } from 'react';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';
import TextField from '@material-ui/core/TextField';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { FaFacebook } from 'react-icons/fa';
import GoogleLogin from 'react-google-login';

import useTranslate from '../../hooks/useTranslate';
import { loginUser, loginFBUser, loginGoogleUser } from '../../services/users';
import useLoginForm from '../../hooks/useLoginForm';

import googleLogoSrc from '../../images/google_logo.svg';
import './LoginForm.scss';


const spinnerStyle = css`
  display: block;
  margin: 0 auto;
`;

const FB_APP_ID = process.env.GATSBY_FB_APP_ID;
const GOOGLE_CLIENT_ID = process.env.GATSBY_GOOGLE_CLIENT_ID;

const LoginForm = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFBLoading, setIsFBLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [responseStatus, setResponseStatus] = useState(null);
  const [
    loginFormValues,
    handleChangeLoginFormValues,
    handleLoginFormSubmit,
    loginFormErrors,
    setLoginFormErrors,
  ] = useLoginForm(login, setResponseStatus);
  const [t, locale] = useTranslate();

  async function login() {
    try {
      setIsLoading(true);
      await loginUser(loginFormValues);
      onLogin();
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
      <form onSubmit={handleLoginFormSubmit} noValidate>
        <TextField
          type='email'
          required
          className='full-width form-input'
          variant='outlined'
          error={loginFormErrors.email || responseStatus === 404}
          label='Email'
          name='email'
          value={loginFormValues.email}
          onChange={handleChangeLoginFormValues}
          disabled={isLoading}
        />

        <TextField
          type='password'
          error={loginFormErrors.password || responseStatus === 404}
          label={t('login_form.password')}
          required
          variant='outlined'
          name='password'
          className='full-width password-field form-input'
          value={loginFormValues.password}
          onChange={handleChangeLoginFormValues}
          helperText={t('login_form.password_helper_text')}
          disabled={isLoading}
        />

        {responseStatus === 404 ? <p className='wrong-user-password'>{t('login_form.unknown_user')}</p> : null}

        <a className='forgot-password' href={`/${locale}/reset_password/email`}>{t('login_form.forgot_password')}</a>

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
          <button type='submit' className='login-button'>{t('login_form.login')}</button>
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
                <span>{t('login_form.continue_with_fb')}</span>
                </>
              }
            </button>
          )}
        />

        <GoogleLogin
          clientId={`${GOOGLE_CLIENT_ID}.apps.googleusercontent.com`}
          buttonText='Login'
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
                  <img src={googleLogoSrc} />
                  <span>{t('login_form.continue_with_google')}</span>
                </>
              }
            </button>
          )}
        />

        <p className='cgu-cgv-accept'>
          {t('login_form.when_login_part_1')} <a href={`/${locale}/cgv_${locale}`} target='_blank'>{t('login_form.cgv')}</a> {t('login_form.and')} <a href={`/${locale}/cgu_${locale}`} target='_blank'>{t('login_form.cgu')}</a>.
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
