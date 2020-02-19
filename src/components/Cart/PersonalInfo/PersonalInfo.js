import React from 'react';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Row, Col } from 'react-bootstrap';

import './PersonalInfo.scss';

const PersonalInfo = ({ errors, form, responseStatus, setErrors, setForm, setResponseStatus }) => {
  const handleChangeFormValue = (e) => {
		const targetName = e.target.name;

    if (e.target.type === 'checkbox') {
      form[targetName] = e.target.checked;
    } else if (targetName === 'email') {
      form[targetName] = e.target.value;
      setResponseStatus(null);
    } else {
      form[targetName] = e.target.value;
    }

    errors[targetName] = false;

    setForm({ ...form });
		setErrors({ ...errors });
  };

  return (
    <div className='personal-container'>
      <h2>Je m'inscris pour commander</h2>

      <Divider variant='middle' />

      <form className='personal-form'>
        <Row>
          <Col xs='6'>
            <TextField
              type='text'
              required
              error={errors['firstname']}
              label='Prénom'
              variant='outlined'
              className='full-width form-input'
              name='firstname'
              value={form.firstname}
              onChange={handleChangeFormValue}
            />
          </Col>
          <Col xs='6'>
            <TextField
              type='text'
              required
              variant='outlined'
              className='full-width form-input'
              error={errors['lastname']}
              label='Nom'
              name='lastname'
              value={form.lastname}
              onChange={handleChangeFormValue}
            />
          </Col>
        </Row>
        <TextField
          type='email'
          className='full-width form-input'
          variant='outlined'
          required
          helperText={responseStatus === 409 ? 'Utilisateur déja existant' : null}
          error={errors['email']}
          label='Email'
          name='email'
          value={form.email}
          onChange={handleChangeFormValue}
        />

        <div className='phone-container form-input'>
          <TextField
            select
            label='Indicatif'
            name='country'
            variant='outlined'
            className='country-code'
            value={form.country}
            onChange={handleChangeFormValue}
          >
            <MenuItem value='+225'>🇨🇮 +225</MenuItem>
            <MenuItem value='+33'>🇫🇷 +33</MenuItem>
          </TextField>
          <TextField
            type='tel'
            error={errors['phone']}
            label='Téléphone'
            variant='outlined'
            name='phone'
            className='phone-input'
            value={form.phone}
            onChange={handleChangeFormValue}
          />
        </div>

        <TextField
          type='password'
          error={errors['password']}
          label='Mot de passe'
          required
          name='password'
          className='full-width'
          value={form.password}
          onChange={handleChangeFormValue}
          helperText='8 caractères, 1 minuscule, 1 majuscule, 1 chiffre'
        />

        <FormControlLabel
          className={`full-width cgu-cgv ${errors['cgu'] ? 'error' : ''}`}
          control={
            <Checkbox
              checked={form.cgu}
              name='cgu'
              required
              onChange={handleChangeFormValue}
              value={form.cgu}
              color='primary'
            />
          }
          label={<p className='cgu-cgv-label'>J'accepte les <a href='/cgv' target='_blank'>CGV</a> et <a href='/cgu' target='_blank'>CGU</a></p>}
        />
      </form>
    </div>
  );
};

export default PersonalInfo;
