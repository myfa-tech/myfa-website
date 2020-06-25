import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { saveOrderManually } from '../../../services/orders';

import './NewOrderModal.scss';

const NewOrderModal = ({ showModal, toggleModal }) => {
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    client_country: '+225',
    recipient_country: '+225'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const saveOrder = async (e) => {
    e.preventDefault();
    await saveOrderManually(form);

    if (typeof window !== 'undefined') {
      window.location.reload();
    }
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
            SelectProps={{
              native: true,
            }}
            name='basket_type_1'
            error={errors.basket_type}
            variant='outlined'
            value={form.basket_type}
            className='full-width form-input'
            onChange={handleChange}
          >
            <option value='fruits'>Panier Fruits</option>
            <option value='legumes'>Panier Légumes</option>
            <option value='sauces'>Panier Sauces</option>
            <option value='myfa'>Panier MYFA</option>
            <option value='beauty'>Panier Beauté</option>
          </TextField>

          <TextField
            select
            label='Panier 2'
            name='basket_type_2'
            error={errors.basket_type}
            SelectProps={{
              native: true,
            }}
            variant='outlined'
            value={form.basket_type}
            className='full-width form-input'
            onChange={handleChange}
          >
            <option value='fruits'>Panier Fruits</option>
            <option value='legumes'>Panier Légumes</option>
            <option value='sauces'>Panier Sauces</option>
            <option value='myfa'>Panier MYFA</option>
            <option value='beauty'>Panier Beauté</option>
          </TextField>

          <TextField
            select
            label='Panier 3'
            name='basket_type_3'
            SelectProps={{
              native: true,
            }}
            error={errors.basket_type}
            variant='outlined'
            value={form.basket_type}
            className='full-width form-input'
            onChange={handleChange}
          >
            <option value='fruits'>Panier Fruits</option>
            <option value='legumes'>Panier Légumes</option>
            <option value='sauces'>Panier Sauces</option>
            <option value='myfa'>Panier MYFA</option>
            <option value='beauty'>Panier Beauté</option>
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

          <Row>
            <Col md={3}>
              <TextField
                select
                label='Indicatif'
                name='client_country'
                SelectProps={{
                  native: true,
                }}
                variant='outlined'
                className='country-code'
                value={form.client_country}
                onChange={handleChange}
              >
                <option value='+225'>🇨🇮 +225</option>
                <option value='+33'>🇫🇷 +33</option>
                <option value='+1'>🇺🇸 +1</option>
              </TextField>
            </Col>
            <Col md={9}>
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
            </Col>
          </Row>

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

          <Row>
            <Col md={3}>
              <TextField
                select
                label='Indicatif'
                SelectProps={{
                  native: true,
                }}
                name='recipient_country'
                variant='outlined'
                className='country-code'
                value={form.client_country}
                onChange={handleChange}
              >
                <option value='+225'>🇨🇮 +225</option>
                <option value='+33'>🇫🇷 +33</option>
                <option value='+1'>🇺🇸 +1</option>
              </TextField>
            </Col>
            <Col md={9}>
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
            </Col>
          </Row>

          <TextField
            select
            label='Zone de livraison'
            required
            SelectProps={{
              native: true,
            }}
            name='zone'
            error={errors.zone}
            variant='outlined'
            value={form.zone}
            className='full-width form-input'
            onChange={handleChange}
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

          <button className='save-button'>Enregistrer</button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default NewOrderModal;
