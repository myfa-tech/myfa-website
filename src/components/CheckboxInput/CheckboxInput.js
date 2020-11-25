import React from 'react'

import './CheckboxInput.scss';

const CheckboxInput = ({ label, name, className, onChange }) => {
  return (
    <div className={`checkbox-container ${className || ''}`}>
      <input onChange={onChange} type='checkbox' name={name} />
      <label className='checkbox-label' for={name}>{label}</label>
    </div>
  );
};

export default CheckboxInput;
