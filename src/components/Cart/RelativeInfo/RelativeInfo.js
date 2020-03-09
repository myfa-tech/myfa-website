import React from 'react';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Row, Col } from 'react-bootstrap';

import './RelativeInfo.scss';

const RelativeInfo = ({ errors, form, handleChangeFormValue, recipientIndex, handleRecipientChange, showOtherRelationInput }) => {
  const user = JSON.parse(window.localStorage.getItem('user'));

  return (
    <div className='relative-container'>
      <h2>Informations sur mon proche</h2>

      <Divider variant='middle' />

      <form className='relative-form'>
        <TextField
          select
          label='Mes proches enregistrés'
          name='relation'
          variant='outlined'
          className='full-width form-input'
          value={recipientIndex}
          onChange={handleRecipientChange}
        >
          {user && user.recipients.map((rec, index) => (
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
          error={errors['email']}
          label='Email'
          name='email'
          value={form.email}
          onChange={handleChangeFormValue}
        />
        <TextField
          select
          label='Relation'
          name='relation'
          variant='outlined'
          className='full-width form-input'
          value={form.relation}
          onChange={handleChangeFormValue}
          helperText='Quelle relation avez-vous avec votre proche ?'
        >
          <MenuItem value='AM'>Ami(e)</MenuItem>
          <MenuItem value='CO'>Conjoint(e)</MenuItem>
          <MenuItem value='EN'>Enfant</MenuItem>
          <MenuItem value='FR'>Frère</MenuItem>
          <MenuItem value='GM'>Grand-mère</MenuItem>
          <MenuItem value='GP'>Grand-père</MenuItem>
          <MenuItem value='ME'>Mère</MenuItem>
          <MenuItem value='NE'>Neveu</MenuItem>
          <MenuItem value='NI'>Nièce</MenuItem>
          <MenuItem value='ON'>Oncle</MenuItem>
          <MenuItem value='PE'>Père</MenuItem>
          <MenuItem value='SO'>Soeur</MenuItem>
          <MenuItem value='TA'>Tante</MenuItem>
          <MenuItem value='AU'>Autre</MenuItem>
        </TextField>

        {showOtherRelationInput ?
          <TextField
            type='text'
            className='full-width form-input'
            variant='outlined'
            error={errors['otherRelation']}
            label='Type de relation'
            name='otherRelation'
            value={form.otherRelation}
            onChange={handleChangeFormValue}
          /> : null
        }

        <TextField
          select
          label='Zone de livraison'
          required
          name='zone'
          error={errors['zone']}
          variant='outlined'
          placeholder='Quartier de la livraison'
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
            label='Indicatif'
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
            label='Téléphone'
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
