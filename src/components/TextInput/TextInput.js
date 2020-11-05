import React from 'react'

import './TextInput.scss';

const TextInput = ({ className, fixedTextRight, value, onChange, placeholder }) => {
  return (
    <div className='input-container'>
      <input type='text' placeholder={placeholder} onChange={onChange} className={`myfa-text-input ${className || ''}`} value={value} />
      {fixedTextRight ? <span className='fixed-input-right-label'>{fixedTextRight}</span> : null}
    </div>
  );
};

export default TextInput;
