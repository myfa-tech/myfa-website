
import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';
import TextField from '@material-ui/core/TextField';
import useTranslate from '../../../../hooks/useTranslate';
import { updateUser } from '../../../../services/users';
import useRelativeForm from '../../../../hooks/useRelativeForm';

import './ModifyRelativeForm.scss';

const spinnerStyle = css`
display: block;
margin: 0 auto;
`;

const ModifyRelativeForm = ({ relatives, relative, relativeIndex }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [
    relativeFormValues,
    handleChangeRelativeFormValues,
    setRelativeFormValues,
    handleSubmitRelativeForm,
    relativeFormErrors,
    handleRelativeFormRecipientChange,
    showOtherRelationInput,
  ] = useRelativeForm(update, relative);
  const [t] = useTranslate();

  async function update() {
    try {
      setIsLoading(true);

      if (relativeFormValues.relation !== 'AU') {
        delete relativeFormValues.otherRelation;
      }

      if (relativeIndex === -1) {
        relatives.push({ ...relativeFormValues });
      } else {
        relatives[relativeIndex] = { ...relativeFormValues };
      }
      await updateUser({ recipients: relatives });
      window.location.assign('/profile/relatives');
    } catch(e) {
      // @TODO: deal with error
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form id='relative-form' onSubmit={handleSubmitRelativeForm}>
      <h2>{t('profile.relatives.headline')}</h2>

      <Row>
        <Col xs='6' className='left-input'>
          <TextField
            type='text'
            required
            error={relativeFormErrors['firstname']}
            label={t('profile.relatives.firstname')}
            className='full-width input'
            variant='outlined'
            name='firstname'
            value={relativeFormValues.firstname}
            onChange={handleChangeRelativeFormValues}
            disabled={isLoading}
          />
        </Col>
        <Col xs='6' className='right-input'>
          <TextField
            type='text'
            required
            className='full-width input'
            error={relativeFormErrors['lastname']}
            variant='outlined'
            label={t('profile.relatives.lastname')}
            name='lastname'
            value={relativeFormValues.lastname}
            onChange={handleChangeRelativeFormValues}
            disabled={isLoading}
          />
        </Col>
      </Row>
      <TextField
        type='email'
        className='full-width input'
        variant='outlined'
        error={relativeFormErrors['email']}
        label='Email'
        name='email'
        value={relativeFormValues.email}
        onChange={handleChangeRelativeFormValues}
        disabled={isLoading}
      />
      <TextField
        select
        label={t('profile.relatives.relationship')}
        name='relation'
        SelectProps={{
          native: true,
        }}
        className='full-width input'
        variant='outlined'
        disabled={isLoading}
        value={relativeFormValues.relation}
        onChange={handleChangeRelativeFormValues}
        helperText={t('profile.relatives.relationship_helper_text')}
      >
        <option value='AM'>Ami(e)</option>
        <option value='CO'>Conjoint(e)</option>
        <option value='EN'>Enfant</option>
        <option value='FR'>Frère</option>
        <option value='GM'>Grand-mère</option>
        <option value='GP'>Grand-père</option>
        <option value='ME'>Mère</option>
        <option value='NE'>Neveu</option>
        <option value='NI'>Nièce</option>
        <option value='ON'>Oncle</option>
        <option value='PE'>Père</option>
        <option value='SO'>Soeur</option>
        <option value='TA'>Tante</option>
        <option value='AU'>Autre</option>
      </TextField>

      {showOtherRelationInput ?
        <TextField
          type='text'
          className='full-width input'
          variant='outlined'
          error={relativeFormErrors['otherRelation']}
          label={t('profile.relatives.relationship_type')}
          name='otherRelation'
          value={relativeFormValues.otherRelation}
          onChange={handleChangeRelativeFormValues}
          disabled={isLoading}
        /> : null
      }
      <TextField
        type='text'
        className='full-width input'
        variant='outlined'
        error={relativeFormErrors['address']}
        label={t('profile.relatives.address')}
        name='address'
        value={relativeFormValues.address}
        onChange={handleChangeRelativeFormValues}
        disabled={isLoading}
      />
      <TextField
        select
        label={t('profile.relatives.delivery_zone')}
        required
        error={relativeFormErrors['zone']}
        name='zone'
        SelectProps={{
          native: true,
        }}
        variant='outlined'
        disabled={isLoading}
        placeholder={t('profile.relatives.delivery_zone_placeholder')}
        value={relativeFormValues.zone}
        className='full-width input'
        onChange={handleChangeRelativeFormValues}
      >
        <option value='2PL'>2 Plateaux</option>
        <option value='AB'>Abobo</option>
        <option value='AD'>Adjamé</option>
        <option value='AT'>Attécoubé</option>
        <option value='CO'>Cocody</option>
        <option value='KO'>Koumassi</option>
        <option value='MA'>Marcory</option>
        <option value='PL'>Plateau</option>
        <option value='PB'>Port-Bouët</option>
        <option value='RI'>Riviera</option>
        <option value='TR'>Treichville</option>
        <option value='YO'>Yopougon</option>
      </TextField>
      <div className='phone-container'>
        <TextField
          select
          label={t('profile.relatives.country_code')}
          name='country'
          SelectProps={{
            native: true,
          }}
          variant='outlined'
          className='country-code input'
          disabled={isLoading}
          value={relativeFormValues.country}
          onChange={handleChangeRelativeFormValues}
        >
          <option value='+225'>🇨🇮 +225</option>
          <option value='+33'>🇫🇷 +33</option>
          <option value='+1'>🇺🇸 +1</option>
        </TextField>
        <TextField
          type='tel'
          error={relativeFormErrors['phone']}
          label={t('profile.relatives.phone')}
          name='phone'
          required
          variant='outlined'
          className='phone-input input'
          value={relativeFormValues.phone}
          onChange={handleChangeRelativeFormValues}
          disabled={isLoading}
        />
      </div>

      {isLoading ?
        <span className='modify-button'>
          <ClipLoader
            css={spinnerStyle}
            sizeUnit={'px'}
            size={25}
            color={'#000'}
            loading={true}
          />
        </span> :
        <button type='submit' className='modify-button'>
          {t('profile.relatives.save')}
        </button>
      }
    </form>
  );
};

export default ModifyRelativeForm;
