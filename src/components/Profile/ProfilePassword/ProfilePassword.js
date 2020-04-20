import React, { useState } from 'react';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';
import TextField from '@material-ui/core/TextField';
import useTranslate from '../../../hooks/useTranslate';
import { updatePassword } from '../../../services/users';

import './ProfilePassword.scss';

const spinnerStyle = css`
  display: block;
  margin: 0 auto;
`;

const ProfilePassword = () => {
  const [errors, setErrors] = useState({
    actualPassword: false,
    newPassword: false,
  });
  const [form, setForm] = useState({
    actualPassword: '',
    newPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [t] = useTranslate();

  const handleChangeFormValue = (e) => {
		const targetName = e.target.name;

    form[targetName] = e.target.value;
    errors[targetName] = false;

    setForm({ ...form });
		setErrors({ ...errors });
  };

  const verifyNewPassword = (password) => {
    if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/.test(password)) {
      return true;
    }

    errors['newPassword'] = true;
    setErrors({ ...errors });

    return false;
  }

  const verifyForm = () => {
    return verifyNewPassword(form.newPassword);
  }

  const updateInfo = async (e) => {
    e.preventDefault();

    if (verifyForm()) {
      try {
        setIsLoading(true);
        await updatePassword({ ...form });
        window.location.reload();
      } catch(e) {
        // @TODO: deal with error
        console.log('error');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div id='profile-password'>
      <h2>{t('profile.password.headline')}</h2>

      <form onSubmit={updateInfo}>
        <div>
          <TextField
            type='password'
            className='full-width form-input'
            required
            error={errors['actualPassword']}
            label={t('profile.password.current_password')}
            name='actualPassword'
            value={form.actualPassword}
            variant='outlined'
            onChange={handleChangeFormValue}
            disabled={isLoading}
          />
        </div>
        <div>
          <TextField
            type='password'
            className='full-width form-input'
            required
            error={errors['newPassword']}
            label={t('profile.password.new_password')}
            name='newPassword'
            value={form.newPassword}
            variant='outlined'
            onChange={handleChangeFormValue}
            disabled={isLoading}
          />
        </div>

        {isLoading ?
          <span className='update-user-button'>
            <ClipLoader
              css={spinnerStyle}
              sizeUnit={'px'}
              size={25}
              color={'#000'}
              loading={true}
            />
          </span> :
          <button type='submit' className='update-user-button'>
            {t('profile.password.save')}
          </button>
        }
      </form>
    </div>
  );
};

export default ProfilePassword;
