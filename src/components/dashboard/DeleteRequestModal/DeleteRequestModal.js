import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';

import './DeleteRequestModal.scss';

const DeleteRequestModal = ({ labelToDelete, confirmDelete, showModal, toggleModal }) => {
  return (
    <Modal dialogClassName='modal-90w modal-75w' show={showModal} onHide={toggleModal} id='delete-request-modal'>
      <Modal.Header closeButton className='header-text'>Supprimer une demande</Modal.Header>
      <Modal.Body>
        <div>
          <p>Etes-vous sûr(e) de vouloir supprimer : {labelToDelete} ?</p>

          <Row>
            <Col xs={6}>
              <button type='button' className='cancel-button' onClick={toggleModal}>Annuler</button>
            </Col>
            <Col xs={6}>
              <button type='button' className='confirm-button' onClick={confirmDelete}>Confirmer</button>
            </Col>
          </Row>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteRequestModal;
