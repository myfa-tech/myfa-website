import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { saveUser } from '../../services/users';
import useSignupForm from '../../hooks/useSignupForm';
import useTranslate from '../../hooks/useTranslate';

import ButtonWithLoader from '../ButtonWithLoader';

import './SignupForm.scss';

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
  const [t, locale] = useTranslate();

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
        <Col xs='6' className='left-half-col'>
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
        <Col xs='6' className='right-half-col'>
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
            SelectProps={{
              native: true,
            }}
            variant='outlined'
            className='country-code form-input'
            disabled={isLoading}
            value={signupFormValues.country}
            onChange={handleChangeSignupFormValues}
          >
            <option value='+33'>🇫🇷 +33</option>
            <option value='+225'>🇨🇮 +225</option>
            <option value='+1'>🇺🇸 +1</option>
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
        className='full-width checkbox'
        control={
          <Checkbox
            checked={signupFormValues.newsletter}
            name='newsletter'
            variant='outlined'
            required
            onChange={handleChangeSignupFormValues}
            value={signupFormValues.newsletter}
            color='primary'
          />
        }
        label={
          <p className='checkbox-label'>
            {t('signup_form.accept_newsletter')}
          </p>
        }
      />

      <FormControlLabel
        className={`full-width checkbox ${signupFormErrors.cgu ? 'error' : ''}`}
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
          <p className='checkbox-label'>
            {t('signup_form.accept_cgu_cgv_part_1')} <a href={`/cgv_${locale}`} target='_blank'>{t('signup_form.cgv')}</a> {t('signup_form.and')} <a href={`/cgu_${locale}`} target='_blank'>{t('signup_form.cgu')}</a>
          </p>
        }
      />

      <ButtonWithLoader type='button' label={t('signup_form.signup_button')} onClick={handleSubmitSignupForm} className='signup-button' isLoading={isLoading} />
    </form>
  )
}

export default SignupForm;
