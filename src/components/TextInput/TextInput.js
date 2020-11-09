import React from 'react'

import './TextInput.scss';

const TextInput = ({ className, type, error, fixedTextRight, helpText, rows, textarea, value, name, onChange, placeholder }) => {
  return (
    <div className='input-container'>
      {textarea ?
        <textarea
          name={name}
          rows={rows || 5}
          placeholder={placeholder}
          onChange={onChange}
          className={`myfa-text-input textarea ${className || ''} ${error ? 'error' : ''}`}
          value={value}
        /> :
        <input
          name={name}
          type={type || 'text'}
          placeholder={placeholder}
          onChange={onChange}
          className={`myfa-text-input ${className || ''} ${error ? 'error' : ''}`}
          value={value}
        />
      }
      {fixedTextRight ? <span className='fixed-input-right-label'>{fixedTextRight}</span> : null}
      {helpText ? <p className='help-text'>{helpText}</p> : null}
    </div>
  );
};

export default TextInput;
