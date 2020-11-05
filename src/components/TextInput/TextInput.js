import React from 'react'

import './TextInput.scss';

const TextInput = ({ className, fixedTextRight, rows, textarea, value, name, onChange, placeholder }) => {
  return (
    <div className='input-container'>
      {textarea ?
        <textarea
          name={name}
          rows={rows || 5}
          placeholder={placeholder}
          onChange={onChange}
          className={`myfa-text-input textarea ${className || ''}`}
          value={value}
        /> :
        <input
          name={name}
          type='text'
          placeholder={placeholder}
          onChange={onChange}
          className={`myfa-text-input ${className || ''}`}
          value={value}
        />
      }
      {fixedTextRight ? <span className='fixed-input-right-label'>{fixedTextRight}</span> : null}
    </div>
  );
};

export default TextInput;
