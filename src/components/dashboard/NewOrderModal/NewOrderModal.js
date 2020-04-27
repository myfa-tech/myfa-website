import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';

import { saveOrderManually } from '../../../services/orders';

import './NewOrderModal.scss';

const NewOrderModal = ({ showModal, toggleModal }) => {
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const saveOrder = async (e) => {
    e.preventDefault();
    await saveOrderManually(form);
    toggleModal();
  };

  return (
    <Modal dialogClassName='modal-90w modal-75w' show={showModal} onHide={toggleModal} id='new-order-modal'>
      <Modal.Header closeButton className='header-text'>Ajouter une commande</Modal.Header>
      <Modal.Body>
        <form onSubmit={saveOrder}>
          <h1>Informations sur le panier</h1>

          <TextField
            select
            label='Panier 1'
            required
            name='basket_type_1'
            error={errors.basket_type}
            variant='outlined'
            value={form.basket_type}
            className='full-width form-input'
            onChange={handleChange}
          >
            <MenuItem value='ramadan_fruits'>Ramadan Fruité</MenuItem>
            <MenuItem value='ramadan_sugar'>Ramadan Sucré</MenuItem>
            <MenuItem value='ramadan_full'>Ramadan Complet</MenuItem>
            <MenuItem value='fruits'>Panier Fruits</MenuItem>
            <MenuItem value='legumes'>Panier Légumes</MenuItem>
            <MenuItem value='sauces'>Panier Sauces</MenuItem>
            <MenuItem value='myfa'>Panier MYFA</MenuItem>
          </TextField>

          <TextField
            select
            label='Panier 2'
            name='basket_type_2'
            error={errors.basket_type}
            variant='outlined'
            value={form.basket_type}
            className='full-width form-input'
            onChange={handleChange}
          >
            <MenuItem value='ramadan_fruits'>Ramadan Fruité</MenuItem>
            <MenuItem value='ramadan_sugar'>Ramadan Sucré</MenuItem>
            <MenuItem value='ramadan_full'>Ramadan Complet</MenuItem>
            <MenuItem value='fruits'>Panier Fruits</MenuItem>
            <MenuItem value='legumes'>Panier Légumes</MenuItem>
            <MenuItem value='sauces'>Panier Sauces</MenuItem>
            <MenuItem value='myfa'>Panier MYFA</MenuItem>
          </TextField>

          <TextField
            select
            label='Panier 3'
            name='basket_type_3'
            error={errors.basket_type}
            variant='outlined'
            value={form.basket_type}
            className='full-width form-input'
            onChange={handleChange}
          >
            <MenuItem value='ramadan_fruits'>Ramadan Fruité</MenuItem>
            <MenuItem value='ramadan_sugar'>Ramadan Sucré</MenuItem>
            <MenuItem value='ramadan_full'>Ramadan Complet</MenuItem>
            <MenuItem value='fruits'>Panier Fruits</MenuItem>
            <MenuItem value='legumes'>Panier Légumes</MenuItem>
            <MenuItem value='sauces'>Panier Sauces</MenuItem>
            <MenuItem value='myfa'>Panier MYFA</MenuItem>
          </TextField>

          <TextField
            type='text'
            className='full-width form-input'
            variant='outlined'
            error={errors.message}
            label='Message au proche'
            name='message'
            value={form.message}
            onChange={handleChange}
          />

          <h1>Informations sur le client</h1>

          <Row>
            <Col md={6}>
              <TextField
                type='text'
                required
                className='full-width form-input'
                variant='outlined'
                error={errors.client_firstname}
                label='Prénom'
                name='client_firstname'
                value={form.client_firstname}
                onChange={handleChange}
              />
            </Col>
            <Col md={6}>
              <TextField
                type='text'
                required
                className='full-width form-input'
                variant='outlined'
                error={errors.client_lastname}
                label='Nom'
                name='client_lastname'
                value={form.client_lastname}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <TextField
            type='text'
            required
            className='full-width form-input'
            variant='outlined'
            error={errors.client_phone}
            label='Téléphone'
            name='client_phone'
            value={form.client_phone}
            onChange={handleChange}
          />

          <h1>Informations sur le destinataire</h1>

          <Row>
            <Col md={6}>
              <TextField
                type='text'
                required
                className='full-width form-input'
                variant='outlined'
                error={errors.recipient_firstname}
                label='Prénom'
                name='recipient_firstname'
                value={form.recipient_firstname}
                onChange={handleChange}
              />
            </Col>
            <Col md={6}>
              <TextField
                type='text'
                required
                className='full-width form-input'
                variant='outlined'
                error={errors.recipient_lastname}
                label='Nom'
                name='recipient_lastname'
                value={form.recipient_lastname}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <TextField
            type='text'
            required
            className='full-width form-input'
            variant='outlined'
            error={errors.recipient_phone}
            label='Téléphone'
            name='recipient_phone'
            value={form.recipient_phone}
            onChange={handleChange}
          />

          <TextField
            select
            label='Zone de livraison'
            required
            name='zone'
            error={errors.zone}
            variant='outlined'
            value={form.zone}
            className='full-width form-input'
            onChange={handleChange}
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

          <button className='save-button'>Enregistrer</button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default NewOrderModal;
