import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';

import SEO from '../../components/seo';
import Layout from '../../components/layout';
import Button from '../../components/ButtonWithLoader';
import Banner from '../../components/Banner';
import useTranslate from '../../hooks/useTranslate';

import './reset_password.scss';
import { resetPasswordSendMagicLink } from '../../services/users';

const ResetPasswordEmail = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [t] = useTranslate();

  useEffect(() => {
    if (error) {
      setError(null);
    }

    if (success) {
      setSuccess(false);
    }
  }, [email]);

  const sendEmail = async (e) => {
    e.preventDefault();
    const response = await resetPasswordSendMagicLink(email);

    if (response.error === 404) {
      setError(t('reset_password.user_unknown'));
    } else if (response.success && typeof window !== 'undefined') {
      setSuccess(true);
      window.scrollTo(0, 0);
    } else {
      setError(t('reset_password.error500'));
    }
  };

  return (
    <Layout className='reset-password email'>
      <SEO title='Reset password' />

      <Banner show={success} type='success' text={t('reset_password.email_sent')} />

      <h1>{t('reset_password.title')}</h1>

      <h2>{t('reset_password.email_subtitle')}</h2>

      <p className='description'>{t('reset_password.description')}</p>

      <form onSubmit={sendEmail} noValidate>
        <TextField
          type='email'
          required
          className='form-input'
          variant='outlined'
          error={!!error}
          label='Email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button
          label={t('reset_password.send')}
          onClick={() => {}}
          className='send-button'
        />

      {error ? <p className='error_message'>{error}</p> : null}
      </form>
    </Layout>
  );
};

export default ResetPasswordEmail;
