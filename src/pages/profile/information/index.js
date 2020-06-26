import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { css } from '@emotion/core';

import { ClipLoader } from 'react-spinners';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import TextField from '@material-ui/core/TextField';
import useTranslate from '../../../hooks/useTranslate';
import SEO from '../../../components/seo';
import Layout from '../../../components/layout';
import ProfileGreeting from '../../../components/Profile/ProfileGreeting';
import ProfileMenu from '../../../components/Profile/ProfileMenu';

import { updateUser } from '../../../services/users';
import UserStorage from '../../../services/UserStorage';
import { useAuthentication } from '../../../hooks/useAuthentication';

import '../index.scss';
import './information.scss';

const spinnerStyle = css`
  display: block;
  margin: 0 auto;
`;

const ProfileInformationPage = () => {
  const user = UserStorage.getUser();
  const [t] = useTranslate();
  const [errors, setErrors] = useState({
    firstname: false,
    lastname: false,
    phone: false,
  });
  const [form, setForm] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    country: user.country,
    phone: user.phone,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { loading } = useAuthentication({ redirect: '/' });

  const handleChangeFormValue = (e) => {
		const targetName = e.target.name;

    form[targetName] = e.target.value;
    errors[targetName] = false;

    setForm({ ...form });
		setErrors({ ...errors });
  };

  const verifyFirstname = (name) => {
    if (name !== '') {
      return true;
    }

    errors['firstname'] = true;
    setErrors({ ...errors });

    return false;
  };

	const verifyPhone = (phone) => {
    const countryCodes = { '+225': 'CI', '+33': 'FR', '+1': 'US' };
		const phoneNumber = parsePhoneNumberFromString(phone, countryCodes[form.country]);

		if (phoneNumber && phoneNumber.isValid()) {
      return true;
    }

    errors['phone'] = true;
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

  const verifyForm = () => {
    return verifyFirstname(form.firstname)
      && verifyLastname(form.lastname)
      && verifyPhone(form.phone);
  }

  const updateInfo = async (e) => {
    e.preventDefault();

    if (verifyForm()) {
      try {
        setIsLoading(true);
        await updateUser({ ...form });
        window.location.reload();
      } catch(e) {
        // @TODO: deal with error
        console.log('error');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return loading ? null : (
    <Layout className='profile-background profile'>
      <SEO title='Profil' />

      <ProfileGreeting />

      <Row className='information-container'>
        <Col sm={4} className='left-column'>
          <ProfileMenu pageName='information' />
        </Col>
        <Col sm={8} className='right-column'>
          <div id='profile-information'>
            <h2>{t('profile.info.keep_up_to_date')}</h2>

            <form onSubmit={updateInfo}>
              <Row>
                <Col xs='6' className='left-input'>
                  <TextField
                    type='text'
                    className='full-width form-input'
                    required
                    error={errors['firstname']}
                    label={t('profile.info.firstname')}
                    name='firstname'
                    value={form.firstname}
                    variant='outlined'
                    onChange={handleChangeFormValue}
                    disabled={isLoading}
                  />
                </Col>
                <Col xs='6' className='right-input'>
                  <TextField
                    type='text'
                    className='full-width form-input'
                    required
                    error={errors['lastname']}
                    label={t('profile.info.lastname')}
                    name='lastname'
                    value={form.lastname}
                    variant='outlined'
                    onChange={handleChangeFormValue}
                    disabled={isLoading}
                  />
                </Col>
              </Row>

              <div className='phone-container'>
                <TextField
                  select
                  SelectProps={{
                    native: true,
                  }}
                  label={t('profile.info.country_code')}
                  name='country'
                  className='country-code form-input'
                  disabled={isLoading}
                  value={form.country}
                  variant='outlined'
                  onChange={handleChangeFormValue}
                >
                  <option value='+33'>🇫🇷 +33</option>
                  <option value='+225'>🇨🇮 +225</option>
                  <option value='+1'>🇺🇸 +1</option>
                </TextField>
                <TextField
                  type='tel'
                  error={errors['phone']}
                  label={t('profile.info.phone')}
                  name='phone'
                  className='phone-input form-input'
                  value={form.phone}
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
                <button type='submit' className='update-user-button'>{t('profile.info.save')}</button>
              }
            </form>
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default ProfileInformationPage;
