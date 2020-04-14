import React from 'react';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Row, Col } from 'react-bootstrap';
import useTranslate from '../../../hooks/useTranslate';

import './RelativeInfo.scss';

const RelativeInfo = ({ errors, form, handleChangeFormValue, recipientIndex, handleRecipientChange, showOtherRelationInput }) => {
  const user = JSON.parse(window.localStorage.getItem('user'));
  const [t] = useTranslate();

  return (
    <div className='relative-container'>
      <h2>{t('cart.relative_info_title')}</h2>

      <Divider variant='middle' />

      <form className='relative-form'>
        <TextField
          select
          label={t('cart.relative_info.saved_relatives')}
          name='relation'
          variant='outlined'
          className='full-width form-input'
          value={recipientIndex}
          onChange={handleRecipientChange}
        >
          {user && user.recipients && user.recipients.map((rec, index) => (
            <MenuItem key={index} value={index}>{rec.firstname} {rec.lastname}</MenuItem>
          ))}
          <MenuItem value={-1}>--</MenuItem>
        </TextField>

        <Row>
          <Col xs='6'>
            <TextField
              type='text'
              required
              error={errors['firstname']}
              label={t('cart.relative_info.firstname')}
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
              label={t('cart.relative_info.lastname')}
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
          error={errors['email']}
          label='Email'
          name='email'
          value={form.email}
          onChange={handleChangeFormValue}
        />
        <TextField
          select
          label={t('cart.relative_info.relationship')}
          name='relation'
          variant='outlined'
          className='full-width form-input'
          value={form.relation}
          onChange={handleChangeFormValue}
          helperText={t('cart.relative_info.relationship_type')}
        >
          <MenuItem value='AM'>{t('relationship_types.AM')}</MenuItem>
          <MenuItem value='CO'>{t('relationship_types.CO')}</MenuItem>
          <MenuItem value='EN'>{t('relationship_types.EN')}</MenuItem>
          <MenuItem value='FR'>{t('relationship_types.FR')}</MenuItem>
          <MenuItem value='GM'>{t('relationship_types.GM')}</MenuItem>
          <MenuItem value='GP'>{t('relationship_types.GP')}</MenuItem>
          <MenuItem value='ME'>{t('relationship_types.ME')}</MenuItem>
          <MenuItem value='NE'>{t('relationship_types.NE')}</MenuItem>
          <MenuItem value='NI'>{t('relationship_types.NI')}</MenuItem>
          <MenuItem value='ON'>{t('relationship_types.ON')}</MenuItem>
          <MenuItem value='PE'>{t('relationship_types.PE')}</MenuItem>
          <MenuItem value='SO'>{t('relationship_types.SO')}</MenuItem>
          <MenuItem value='TA'>{t('relationship_types.TA')}</MenuItem>
          <MenuItem value='AU'>{t('relationship_types.AU')}</MenuItem>
        </TextField>

        {showOtherRelationInput ?
          <TextField
            type='text'
            className='full-width form-input'
            variant='outlined'
            error={errors['otherRelation']}
            label={t('cart.relative_info.relationship_type')}
            name='otherRelation'
            value={form.otherRelation}
            onChange={handleChangeFormValue}
          /> : null
        }

        <TextField
          select
          label={t('cart.relative_info.delivery_zone')}
          required
          name='zone'
          error={errors['zone']}
          variant='outlined'
          placeholder={t('cart.relative_info.delivery_zone_placeholder')}
          value={form.zone}
          className='full-width form-input'
          onChange={handleChangeFormValue}
        >
          <MenuItem value='2PL'>2 Plateaux</MenuItem>
          <MenuItem value='AB'>Abobo</MenuItem>
          <MenuItem value='AD'>Adjamé</MenuItem>
          <MenuItem value='AT'>Attécoubé</MenuItem>
          <MenuItem value='CO'>Cocody</MenuItem>
          <MenuItem value='KO'>Koumassi</MenuItem>
          <MenuItem value='MA'>Marcory</MenuItem>
          <MenuItem value='PL'>Plateau</MenuItem>
          <MenuItem value='PB'>Port-Bouët</MenuItem>
          <MenuItem value='RI'>Riviera</MenuItem>
          <MenuItem value='TR'>Treichville</MenuItem>
          <MenuItem value='YO'>Yopougon</MenuItem>
        </TextField>
        <div className='phone-container form-input'>
          <TextField
            select
            label={t('cart.relative_info.country_code')}
            name='country'
            variant='outlined'
            className='country-code'
            value={form.country}
            onChange={handleChangeFormValue}
          >
            <MenuItem value='+225'>🇨🇮 +225</MenuItem>
            <MenuItem value='+33'>🇫🇷 +33</MenuItem>
            <MenuItem value='+1'>🇺🇸 +1</MenuItem>
          </TextField>
          <TextField
            type='tel'
            error={errors['phone']}
            label={t('cart.relative_info.phone')}
            variant='outlined'
            name='phone'
            required
            className='phone-input'
            value={form.phone}
            onChange={handleChangeFormValue}
          />
        </div>
      </form>
    </div>
  );
};

export default RelativeInfo;
