import React from 'react'

import './TextInput.scss';

const TextInput = ({ className, value, onChange, placeholder }) => {
  return (
    <input type='text' placeholder={placeholder} onChange={onChange} className={`myfa-text-input ${className || ''}`} value={value} />
  );
};

export default TextInput;
