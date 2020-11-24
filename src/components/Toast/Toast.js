import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

import './Toast.scss';

const Toast = ({ toggleShow, title, message, delay }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      toggleShow();
    }, delay || 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className='myfa-toast easein easeout'>
      {title ? <p className='title'>{title}</p> : null}
      <p className='message'>{message}</p>
      <span className='close-icon' onClick={toggleShow}><FaTimes /></span>
    </div>
  );
};

export default Toast;
