import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Modal from 'react-bootstrap/Modal';
import { saveFinanceRequest } from '../../../services/finance';

import './FinanceModal.scss';

const FinanceModal = ({ showModal, toggleModal }) => {
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const saveRequest = async (e) => {
    e.preventDefault();
    await saveFinanceRequest(form);
    toggleModal();
  };

  return (
    <Modal dialogClassName='modal-90w modal-75w' show={showModal} onHide={toggleModal} id='finance-modal'>
      <Modal.Header closeButton className='header-text'>Ajouter une demande</Modal.Header>
      <Modal.Body>
        <form onSubmit={saveRequest}>
          <TextField
            type='text'
            required
            className='full-width form-input'
            variant='outlined'
            error={errors.label}
            label='Intitulé'
            name='label'
            value={form.label}
            onChange={handleChange}
          />

          <TextField
            type='text'
            required
            className='full-width form-input'
            variant='outlined'
            error={errors.price}
            label='Prix'
            name='price'
            value={form.price}
            onChange={handleChange}
          />

          <TextField
            type='text'
            required
            className='full-width form-input'
            variant='outlined'
            error={errors.userEmail}
            label='Email utilisateur'
            name='userEmail'
            value={form.userEmail}
            onChange={handleChange}
          />

          <TextField
            type='text'
            className='full-width form-input'
            variant='outlined'
            error={errors.comment}
            label='Commentaire'
            name='comment'
            value={form.comment}
            onChange={handleChange}
          />

          <button className='save-button'>Enregistrer</button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default FinanceModal;
