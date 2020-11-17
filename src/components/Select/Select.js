import React from 'react';

import './Select.scss';

const SelectOption = ({ children, key }) => {
  return (
    <option key={key}>{children}</option>
  );
};

const Select = ({ children, name, id, placeholder, className, onChange }) => {
  return (
    <select placeholder={placeholder} name={name} onChange={onChange} id={id} className={`myfa-select ${className || ''}`}>
      {placeholder ? <option className='placeholder' value='' disabled selected>{placeholder}</option> : null}
      {children}
    </select>
  );
};

Select.Option = SelectOption;

export default Select;
