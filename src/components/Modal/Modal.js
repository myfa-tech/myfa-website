import React from 'react';
import ReactModal from 'react-modal';

import './Modal.scss';

const customStyles = {
  content : {
    top           : '50%',
    left          : '50%',
    right         : 'auto',
    bottom        : 'auto',
    marginRight   : '-50%',
    transform     : 'translate(-50%, -50%)',
  }
};

const Modal = ({ isOpen, afterOpenModal, className, closeModal, children }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      className={className}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
