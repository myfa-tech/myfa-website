import React from 'react'

import TextInput from '../TextInput';

import './HalfInputs.scss';

const HalfInputs = ({
  onChange,
  errors: formErrors,
  leftName,
  rightName,
  leftValue,
  rightValue,
  leftPlaceholder,
  rightPlaceholder,
}) => {
  return (
    <div className='half-inputs'>
      <TextInput onChange={onChange} value={leftValue} className={`${formErrors && formErrors[leftName] ? 'error' : ''}`} name={leftName} placeholder={leftPlaceholder} />
      <TextInput onChange={onChange} value={rightValue} className={`${formErrors && formErrors[rightName] ? 'error' : ''}`} name={rightName} placeholder={rightPlaceholder} />
    </div>
  );
};

export default HalfInputs;
