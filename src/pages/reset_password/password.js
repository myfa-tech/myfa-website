import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';

import SEO from '../../components/seo';
import Layout from '../../components/layout';
import Button from '../../components/ButtonWithLoader';
import Banner from '../../components/Banner';
import { resetPassword } from '../../services/users';
import './reset_password.scss';
import useTranslate from '../../hooks/useTranslate';

const ResetPasswordPassword = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState();
  const [t, locale] = useTranslate();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (error) {
      setError(null);
    }

    if (success) {
      setSuccess(false);
    }
  }, [password]);

  const changePassword = async (e) => {
    e.preventDefault();

    const response = await resetPassword(password);

    if (response.updated) {
      setSuccess(true);
    } else {
      setError(t('reset_password.something_wrong'));
    }
  };

  return (
    <Layout className='reset-password password'>
      <SEO title='Reset password' />

      <Banner show={success} type='success' text={t('reset_password.password_reset')} onClose={() => setSuccess(false)} />

      <h1>{t('reset_password.title')}</h1>

      <h2>{t('reset_password.password_subtitle')}</h2>

      <form onSubmit={changePassword} noValidate>
        <TextField
          type='password'
          required
          className='form-input'
          variant='outlined'
          error={!!error}
          label={t('reset_password.password')}
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          label={t('reset_password.validate')}
          onClick={() => {}}
          className='validate-button'
        />

      {error ? <p className='error_message'>{error}</p> : null}
      </form>
    </Layout>
  );
};

export default ResetPasswordPassword;
