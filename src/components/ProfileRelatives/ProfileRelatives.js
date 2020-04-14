import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import useTranslate from '../../hooks/useTranslate';
import { updateUser } from '../../services/users';
import useRelativeForm from '../../hooks/useRelativeForm';

import logoHandsSrc from '../../images/logo-1.png';

import './ProfileRelatives.scss';
import UserStorage from '../../services/UserStorage';

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
  const [t] = useTranslate();

  useEffect(() => {
    modifyRelativeIndex(-1);
  }, []);

  return (
    <>
      <div className='relatives-list-title-container'>
        <h2>{t('profile.relatives.headline')}</h2>

        <button type='button' className='add-relative-button' onClick={() => addRelative()}>
          {t('profile.relatives.add_relative')}
        </button>
      </div>
      <div className='relatives-list-container'>
        <h2>{t('profile.relatives.my_relatives')}</h2>

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
                      <button className='action' onClick={() => modifyRelativeIndex(index)}>
                        {t('profile.relatives.modify')}
                      </button>
                      <button className='action' onClick={() => deleteRelative(index)}>
                        {t('profile.relatives.delete')}
                      </button>
                    </Col>
                  </Row>
                </li>
              );
            })}
          </ul> :
          <p className='no-relatives'>Vous n’avez pas encore enregistré de proche.</p>
        }
      </div>
    </>
  );
};

const ModifyRelativeForm = ({ relatives, relative, relativeIndex }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [
    relativeFormValues,
    handleChangeRelativeFormValues,
    handleSubmitRelativeForm,
    relativeFormErrors,
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
        <Col xs='6'>
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
        <Col xs='6'>
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
        className='full-width input'
        variant='outlined'
        disabled={isLoading}
        value={relativeFormValues.relation}
        onChange={handleChangeRelativeFormValues}
        helperText={t('profile.relatives.relationship_helper_text')}
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
        variant='outlined'
        disabled={isLoading}
        placeholder={t('profile.relatives.delivery_zone_placeholder')}
        value={relativeFormValues.zone}
        className='full-width input'
        onChange={handleChangeRelativeFormValues}
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
          label={t('profile.relatives.country_code')}
          name='country'
          variant='outlined'
          className='country-code input'
          disabled={isLoading}
          value={relativeFormValues.country}
          onChange={handleChangeRelativeFormValues}
        >
          <MenuItem value='+225'>🇨🇮 +225</MenuItem>
          <MenuItem value='+33'>🇫🇷 +33</MenuItem>
          <MenuItem value='+1'>🇺🇸 +1</MenuItem>
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

const ProfileInformation = () => {
  const user = UserStorage.getUser();
  const [relatives, setRelatives] = useState(user.recipients);
  const [relativeIndex, setRelativeIndex] = useState(-1);
  const [modifying, setModifying] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [t] = useTranslate();

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

              <p>{t('profile.relatives.verify_delete_relative_part_1')} {relatives[relativeIndex].firstname} {t('profile.relatives.verify_delete_relative_part_2')}</p>

              <Row>
                <Col xs={6}>
                  <button type='button' className='cancel-button' onClick={closeDeletingModal}>
                    {t('profile.relatives.cancel')}
                  </button>
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
                    <button type='button' className='confirm-button' onClick={confirmDelete}>
                      {t('profile.relatives.confirm')}
                    </button>
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
