import React from 'react';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Row, Col } from 'react-bootstrap';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { FaFacebook } from 'react-icons/fa';
import GoogleLogin from 'react-google-login';

import './PersonalInfo.scss';

import googleLogoSrc from '../../../images/google_logo.svg';
import useTranslate from '../../../hooks/useTranslate';

const FB_APP_ID = process.env.FB_APP_ID;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const PersonalInfo = ({
  signupErrors,
  signupForm,
  responseStatus,
  handleChangeSignupFormValue,
  loginErrors,
  isLoading,
  loginForm,
  handleChangeLoginFormValue,
  identificationPath,
  setIdentificationPath,
  responseFacebook,
  responseGoogle,
}) => {
  const [t] = useTranslate();

  return (
    <div className='personal-container'>
      <Row>
        <Col xs={6} className='first-title'>
          <h2 onClick={() => setIdentificationPath('signup')}>{t('cart.personal_info.signup')}</h2>
        </Col>
        <Col xs={6}>
          <h2 onClick={() => setIdentificationPath('login')}>{t('cart.personal_info.login')}</h2>
        </Col>
      </Row>

      <Divider variant='middle' />

      {identificationPath === 'signup' ?
        <SignupPath
          signupErrors={signupErrors}
          signupForm={signupForm}
          responseStatus={responseStatus}
          handleChangeSignupFormValue={handleChangeSignupFormValue}
        /> :
        <LoginPath
          loginErrors={loginErrors}
          loginForm={loginForm}
          handleChangeLoginFormValue={handleChangeLoginFormValue}
          responseStatus={responseStatus}
          isLoading={isLoading}
          responseFacebook={responseFacebook}
          responseGoogle={responseGoogle}
        />
      }
    </div>
  );
};

const LoginPath = ({
  loginErrors,
  loginForm,
  handleChangeLoginFormValue,
  responseStatus,
  isLoading,
  responseFacebook,
  responseGoogle,
}) => {
  const [t, locale] = useTranslate();

  return (
    <>
      <form className='personal-form' noValidate>
        <TextField
          type='email'
          required
          className='full-width form-input'
          variant='outlined'
          error={loginErrors.email || responseStatus === 404}
          label='Email'
          name='email'
          value={loginForm.email}
          onChange={handleChangeLoginFormValue}
          disabled={isLoading}
        />

        <TextField
          type='password'
          error={loginErrors.password || responseStatus === 404}
          label='Mot de passe'
          required
          variant='outlined'
          name='password'
          className='full-width password-field form-input'
          value={loginForm.password}
          onChange={handleChangeLoginFormValue}
          helperText='8 caractères, 1 minuscule, 1 majuscule, 1 chiffre'
          disabled={isLoading}
        />

        {responseStatus === 404 ? <p className='wrong-user-password'>{t('cart.personal_info.unknown_user')}</p> : null}

        <FacebookLogin
          appId={FB_APP_ID}
          autoLoad={false}
          fields='name, email'
          callback={responseFacebook}
          onClick={() => {}}
          render={renderProps => (
            <button type='button' className='facebook-button' onClick={renderProps.onClick}>
              <FaFacebook />
              <span>{t('cart.personal_info.continue_with_fb')}</span>
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
              <img src={googleLogoSrc} />
              <span>{t('cart.personal_info.continue_with_google')}</span>
            </button>
          )}
        />

        <p className='cgu-cgv-accept'>
          {t('cart.personal_info.when_login_part_1')} <a href={`/cgv_${locale}`} target='_blank'>{t('cart.personal_info.cgv')}</a> {t('cart.personal_info.and')} <a href={`/cgu_${locale}`} target='_blank'>{t('cart.personal_info.cgu')}</a>.</p>
      </form>
    </>
  );
};

const SignupPath = ({ signupErrors, signupForm, responseStatus, handleChangeSignupFormValue }) => {
  const [t, locale] = useTranslate();

  return (
    <>
      <form className='personal-form'>
        <Row>
          <Col xs='6' className='left-input'>
            <TextField
              type='text'
              required
              error={signupErrors['firstname']}
              label={t('cart.personal_info.firstname')}
              variant='outlined'
              className='full-width form-input'
              name='firstname'
              value={signupForm.firstname}
              onChange={handleChangeSignupFormValue}
            />
          </Col>
          <Col xs='6' className='right-input'>
            <TextField
              type='text'
              required
              variant='outlined'
              className='full-width form-input'
              error={signupErrors['lastname']}
              label={t('cart.personal_info.lastname')}
              name='lastname'
              value={signupForm.lastname}
              onChange={handleChangeSignupFormValue}
            />
          </Col>
        </Row>
        <TextField
          type='email'
          className='full-width form-input'
          variant='outlined'
          required
          helperText={responseStatus === 409 ? 'Utilisateur déja existant' : null}
          error={signupErrors['email']}
          label='Email'
          name='email'
          value={signupForm.email}
          onChange={handleChangeSignupFormValue}
        />

        <div className='phone-container form-input'>
          <TextField
            select
            label={t('cart.personal_info.country_code')}
            name='country'
            variant='outlined'
            className='country-code'
            value={signupForm.country}
            onChange={handleChangeSignupFormValue}
          >
            <MenuItem value='+225'>🇨🇮 +225</MenuItem>
            <MenuItem value='+33'>🇫🇷 +33</MenuItem>
            <MenuItem value='+1'>🇺🇸 +1</MenuItem>
          </TextField>
          <TextField
            type='tel'
            error={signupErrors['phone']}
            label={t('cart.personal_info.phone')}
            variant='outlined'
            name='phone'
            className='phone-input'
            value={signupForm.phone}
            onChange={handleChangeSignupFormValue}
          />
        </div>

        <TextField
          type='password'
          error={signupErrors['password']}
          label={t('cart.personal_info.password')}
          required
          name='password'
          variant='outlined'
          className='full-width'
          value={signupForm.password}
          onChange={handleChangeSignupFormValue}
          helperText={t('cart.personal_info.password_helper_text')}
        />

        <FormControlLabel
          className={`full-width cgu-cgv ${signupErrors['cgu'] ? 'error' : ''}`}
          control={
            <Checkbox
              checked={signupForm.cgu}
              name='cgu'
              required
              onChange={handleChangeSignupFormValue}
              value={signupForm.cgu}
              color='primary'
            />
          }
          label={<p className='cgu-cgv-label'>{t('cart.personal_info.accept_cgu_cgv_part_1')} <a href={`/cgv_${locale}`} target='_blank'>{t('cart.personal_info.cgv')}</a> {t('cart.personal_info.and')} <a href={`/cgu_${locale}`} target='_blank'>{t('cart.personal_info.cgu')}</a></p>}
        />
      </form>
    </>
  );
};

export default PersonalInfo;
