import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import { updateUser } from '../../services/users';

import logoHandsSrc from '../../images/logo-1.png';

import './ProfileRelatives.scss';

const spinnerStyle = css`
  display: block;
  margin: 0 auto;
`;

const getZone = (code) => {
  const zones = {
    '2PL': '2 Plateaux',
    'AB': 'Abobo',
    'AD': 'Adjamé',
    'AT': 'Attécoubé',
    'CO': 'Cocody',
    'KO': 'Koumassi',
    'MA': 'Marcory',
    'PL': 'Plateau',
    'PB': 'Port-Bouet',
    'RI': 'Riviera',
    'TR': 'Treichville',
    'YO': 'Yopougon',
  };

  return zones[code] || code;
};

const RelativesList = ({ addRelative, relatives, modifyRelativeIndex, deleteRelative }) => {
  useEffect(() => {
    modifyRelativeIndex(-1);
  }, []);

  return (
    <>
      <div className='relatives-list-title-container'>
        <h2>Pour gagner en rapidité lors des achats de paniers, vous pouvez enregistrer vos proches</h2>

        <button type='button' className='add-relative-button' onClick={() => addRelative()}>Ajouter un proche</button>
      </div>
      <div className='relatives-list-container'>
        <h2>Mes proches</h2>

        {relatives && relatives.length ?
          <ul className='relatives-container'>
            {relatives.map((relative, index) => {
              return (
                <li key={`${relative.firstname}-${relative.lastname}`}>
                  <Row>
                    <Col xs={7} sm={9} className='info-container'>
                      <p className='relatives-info'>{relative.firstname} {relative.lastname}</p>
                      {relative.address ? <p className='relatives-info'>{relative.address}</p> : null}
                      <p className='relatives-info'>{relative.country}{relative.phone}</p>
                      <p className='relatives-info'>{getZone(relative.zone)}</p>
                    </Col>
                    <Col xs={5} sm={3} className='edit-container'>
                      <button className='action' onClick={() => modifyRelativeIndex(index)}>Modifier</button>
                      <button className='action' onClick={() => deleteRelative(index)}>Supprimer</button>
                    </Col>
                  </Row>
                </li>
              );
            })}
          </ul> :
          <p className='no-relatives'>Vous n’avez pas encore enregistrer de proches.</p>
        }
      </div>
    </>
  );
};

const ModifyRelativeForm = ({ relatives, relative, relativeIndex }) => {
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    relation: '',
    address: '',
    email: '',
    country: '+225',
    zone: '',
    phone: '',
  });
  const [errors, setErrors] = useState({
    firstname: false,
    lastname: false,
    relation: false,
    address: false,
    email: false,
    country: false,
    zone: false,
    phone: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!!relative) {
      setForm({ ...relative });
    } else {
      setForm({ country: '+225' });
    }
  }, []);

  const verifyFirstname = (name) => {
    if (name !== '') {
      return true;
    }

    errors['firstname'] = true;
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

	const verifyPhone = (phone) => {
    const countryCodes = { '+225': 'CI', '+33': 'FR' };
		const phoneNumber = parsePhoneNumberFromString(phone, countryCodes[form.country]);

		if (phoneNumber && phoneNumber.isValid()) {
      return true;
    }

    errors['phone'] = true;
    setErrors({ ...errors });

    return false;
  };

  const verifyZone = (zone) => {
		if (zone && zone !== '') {
			return true;
    }

    errors['zone'] = true;
    setErrors({ ...errors });

    return false;
  };

  const verifyForm = () => {
    return verifyFirstname(form.firstname)
      && verifyLastname(form.lastname)
      && verifyZone(form.zone)
      && verifyPhone(form.phone);
  }

  const handleChangeFormValue = (e) => {
		const targetName = e.target.name;

    form[targetName] = e.target.value;
    errors[targetName] = false;

    setForm({ ...form });
		setErrors({ ...errors });
  };

  const update = async (e) => {
    e.preventDefault();

    if (verifyForm()) {
      try {
        setIsLoading(true);
        if (relativeIndex === -1) {
          relatives.push({ ...form });
        } else {
          relatives[relativeIndex] = { ...form };
        }
        await updateUser({ recipients: relatives });
        window.location.assign('/profile/relatives');
      } catch(e) {
        // @TODO: deal with error
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <form id='relative-form' onSubmit={update}>
      <h2>Pour gagner en rapidité lors des achats de paniers, vous pouvez enregistrer vos proches</h2>

      <Row>
        <Col xs='6'>
          <TextField
            type='text'
            required
            error={errors['firstname']}
            label='Prénom'
            className='full-width input'
            variant='outlined'
            name='firstname'
            value={form.firstname}
            onChange={handleChangeFormValue}
            disabled={isLoading}
          />
        </Col>
        <Col xs='6'>
          <TextField
            type='text'
            required
            className='full-width input'
            error={errors['lastname']}
            variant='outlined'
            label='Nom'
            name='lastname'
            value={form.lastname}
            onChange={handleChangeFormValue}
            disabled={isLoading}
          />
        </Col>
      </Row>
      <TextField
        type='email'
        className='full-width input'
        variant='outlined'
        error={errors['email']}
        label='Email'
        name='email'
        value={form.email}
        onChange={handleChangeFormValue}
        disabled={isLoading}
      />
      <TextField
        select
        label='Relation'
        name='relation'
        className='full-width input'
        variant='outlined'
        disabled={isLoading}
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
      <TextField
        type='text'
        className='full-width input'
        variant='outlined'
        error={errors['address']}
        label='Adresse'
        name='address'
        value={form.address}
        onChange={handleChangeFormValue}
        disabled={isLoading}
      />
      <TextField
        select
        label='Zone de livraison'
        required
        error={errors['zone']}
        name='zone'
        variant='outlined'
        disabled={isLoading}
        placeholder='Quartier de la livraison'
        value={form.zone}
        className='full-width input'
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
      <div className='phone-container'>
        <TextField
          select
          label='Indicatif'
          name='country'
          variant='outlined'
          className='country-code input'
          disabled={isLoading}
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
          name='phone'
          required
          variant='outlined'
          className='phone-input input'
          value={form.phone}
          onChange={handleChangeFormValue}
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
        <button type='submit' className='modify-button'>Sauvegarder</button>
      }
    </form>
  );
};

const ProfileInformation = () => {
  const user = (typeof window !== 'undefined') ? JSON.parse(window.localStorage.getItem('user')) : {};
  const [relatives, setRelatives] = useState(user.recipients);
  const [relativeIndex, setRelativeIndex] = useState(-1);
  const [modifying, setModifying] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const modifyRelativeIndex = (index) => {
    if (index > -1) {
      setRelativeIndex(index);
    }

    if (index !== -1) {
      setModifying(true);
    }
  };

  const deleteRelative = (index) => {
    setRelativeIndex(index);
    setDeleting(true);
  };

  const closeDeletingModal = () => {
    setRelativeIndex(-1);
    setDeleting(false);
  };

  const confirmDelete = async () => {
    setIsLoading(true);
    relatives.splice(relativeIndex, 1);

    await updateUser({ recipients: relatives });
    setIsLoading(false);

    window.location.assign('/profile/relatives');
  };

  return (
    <div id='profile-relatives'>
      {modifying ?
        <ModifyRelativeForm
          relatives={relatives}
          relative={relatives[relativeIndex]}
          relativeIndex={relativeIndex}
        /> :
        <RelativesList
          relatives={relatives}
          modifyRelativeIndex={modifyRelativeIndex}
          deleteRelative={deleteRelative}
          addRelative={modifyRelativeIndex}
        />
      }
      {deleting &&
        <Modal show={deleting} onHide={closeDeletingModal} id='deleting-modal'>
          <Modal.Body>
            <div>
              <img src={logoHandsSrc} alt='logo' className='logo-big' />

              <p>Etes-vous sûr(e) de vouloir retirer {relatives[relativeIndex].firstname} de vos proches ?</p>

              <Row>
                <Col xs={6}>
                  <button type='button' className='cancel-button' onClick={closeDeletingModal}>Annuler</button>
                </Col>
                <Col xs={6}>
                  {isLoading ?
                    <button className='confirm-button'>
                      <ClipLoader
                        css={spinnerStyle}
                        sizeUnit={'px'}
                        size={25}
                        color={'#000'}
                        loading={true}
                      />
                    </button> :
                    <button type='button' className='confirm-button' onClick={confirmDelete}>Confirmer</button>
                  }
                </Col>
              </Row>
            </div>
          </Modal.Body>
        </Modal>
      }
    </div>
  );
};

export default ProfileInformation;
