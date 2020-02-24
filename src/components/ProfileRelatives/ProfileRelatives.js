import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import { updateUser } from '../../services/users';
import useRelativeForm from '../../hooks/useRelativeForm';

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
    setRelativeFormValues,
    handleSubmitRelativeForm,
    relativeFormErrors,
    handleRelativeFormRecipientChange,
    showOtherRelationInput,
  ] = useRelativeForm(update, relative);

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
      <h2>Pour gagner en rapidité lors des achats de paniers, vous pouvez enregistrer vos proches</h2>

      <Row>
        <Col xs='6'>
          <TextField
            type='text'
            required
            error={relativeFormErrors['firstname']}
            label='Prénom'
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
            label='Nom'
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
        label='Relation'
        name='relation'
        className='full-width input'
        variant='outlined'
        disabled={isLoading}
        value={relativeFormValues.relation}
        onChange={handleChangeRelativeFormValues}
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
          className='full-width input'
          variant='outlined'
          error={relativeFormErrors['otherRelation']}
          label='Type de relation'
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
        label='Adresse'
        name='address'
        value={relativeFormValues.address}
        onChange={handleChangeRelativeFormValues}
        disabled={isLoading}
      />
      <TextField
        select
        label='Zone de livraison'
        required
        error={relativeFormErrors['zone']}
        name='zone'
        variant='outlined'
        disabled={isLoading}
        placeholder='Quartier de la livraison'
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
          label='Indicatif'
          name='country'
          variant='outlined'
          className='country-code input'
          disabled={isLoading}
          value={relativeFormValues.country}
          onChange={handleChangeRelativeFormValues}
        >
          <MenuItem value='+225'>🇨🇮 +225</MenuItem>
          <MenuItem value='+33'>🇫🇷 +33</MenuItem>
        </TextField>
        <TextField
          type='tel'
          error={relativeFormErrors['phone']}
          label='Téléphone'
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
