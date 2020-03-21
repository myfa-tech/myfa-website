import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { saveUser } from '../../services/users';
import useSignupForm from '../../hooks/useSignupForm';
import useTranslate from '../../hooks/useTranslate';

import './SignupForm.scss';

const spinnerStyle = css`
  display: block;
  margin: 0 auto;
`;

const SignupForm = ({ onSignup }) => {
  const [responseStatus, setResponseStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [
    signupFormValues,
    handleChangeSignupFormValues,
    handleSubmitSignupForm,
    signupFormErrors,
    setSignupFormErrors
  ] = useSignupForm(signup, setResponseStatus);
  const [t] = useTranslate();

  async function signup() {
    try {
      setIsLoading(true);
      await saveUser({ ...signupFormValues, recipients: [] });
      onSignup()
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

  return (
    <form id='signup-form'>
      <Row>
        <Col xs='6'>
          <TextField
            type='text'
            className='full-width form-input'
            required
            variant='outlined'
            error={signupFormErrors.firstname}
            label={t('signup_form.firstname')}
            name='firstname'
            value={signupFormValues.firstname}
            onChange={handleChangeSignupFormValues}
            disabled={isLoading}
          />
        </Col>
        <Col xs='6'>
          <TextField
            type='text'
            className='full-width form-input'
            required
            variant='outlined'
            error={signupFormErrors.lastname}
            label={t('signup_form.lastname')}
            name='lastname'
            value={signupFormValues.lastname}
            onChange={handleChangeSignupFormValues}
            disabled={isLoading}
          />
        </Col>
      </Row>

      <TextField
        type='email'
        helperText={responseStatus === 409 ? t('signup_form.existing_user') : null}
        required
        variant='outlined'
        className='full-width form-input'
        error={signupFormErrors.email}
        label='Email'
        name='email'
        value={signupFormValues.email}
        onChange={handleChangeSignupFormValues}
        disabled={isLoading}
      />

      <div className='phone-container'>
          <TextField
            select
            label={t('signup_form.country_code')}
            name='country'
            variant='outlined'
            className='country-code form-input'
            disabled={isLoading}
            value={signupFormValues.country}
            onChange={handleChangeSignupFormValues}
          >
            <MenuItem value='+33'>🇫🇷 +33</MenuItem>
            <MenuItem value='+225'>🇨🇮 +225</MenuItem>
            <MenuItem value='+1'>🇺🇸 +1</MenuItem>
          </TextField>
          <TextField
            type='tel'
            error={signupFormErrors.phone}
            label={t('signup_form.phone')}
            variant='outlined'
            name='phone'
            className='phone-input form-input'
            value={signupFormValues.phone}
            onChange={handleChangeSignupFormValues}
            disabled={isLoading}
          />
        </div>

      <TextField
        type='password'
        error={signupFormErrors.password}
        label={t('signup_form.password')}
        required
        variant='outlined'
        name='password'
        className='full-width form-input'
        value={signupFormValues.password}
        onChange={handleChangeSignupFormValues}
        helperText={t('signup_form.password_helper_text')}
        disabled={isLoading}
      />

      <FormControlLabel
        className={`full-width cgu-cgv ${signupFormErrors.cgu ? 'error' : ''}`}
        control={
          <Checkbox
            checked={signupFormValues.cgu}
            name='cgu'
            variant='outlined'
            required
            onChange={handleChangeSignupFormValues}
            value={signupFormValues.cgu}
            color='primary'
          />
        }
        label={
          <p className='cgu-cgv-label'>
            {t('signup_form.accept_cgu_cgv_part_1')} <a href='/cgv' target='_blank'>{t('signup_form.cgv')}</a> {t('signup_form.and')} <a href='/cgu' target='_blank'>{t('signup_form.cgu')}</a>
          </p>
        }
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
        <button type='button' onClick={handleSubmitSignupForm} className='signup-button'>
          {t('signup_form.signup_button')}
        </button>
      }
    </form>
  )
}

export default SignupForm;
