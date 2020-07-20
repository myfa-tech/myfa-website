import React from 'react';
import Modal from 'react-bootstrap/Modal';

import deliveryTruckSrc from '../../../../images/delivery.png';
import useTranslate from '../../../../hooks/useTranslate';

import './FreeDeliveryModal.scss';

const FreeDeliveryModal = ({ showModal, toggleModal }) => {
  const [t] = useTranslate();

  return (
    <Modal dialogClassName='modal-90w modal-75w' show={showModal} onHide={toggleModal} id='free-delivery-modal'>
      <Modal.Header closeButton className='header' />
      <Modal.Body>
        <h2>{t('free_delivery_modal.title')}</h2>
        <img src={deliveryTruckSrc} />
        <p>{t('free_delivery_modal.text')}</p>
      </Modal.Body>
    </Modal>
  );
};

export default FreeDeliveryModal;
