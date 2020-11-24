import React from 'react'

import TextInput from '../TextInput';
import Select from '../Select';

import './HalfInputs.scss';

const HalfInputs = ({
  onChange,
  errors: formErrors,
  leftName,
  rightName,
  leftValue,
  type,
  rightValue,
  leftPlaceholder,
  rightPlaceholder,
}) => {
  return (
    <div className={`half-inputs ${type || ''}`}>
      {type === 'phone' ?
        <>
          <Select>
            <Select.Option value='' selected>Indicatif</Select.Option>
            <Select.Option value='+225'>+225 🇨🇮</Select.Option>
            <Select.Option value='+33'>+33 🇫🇷</Select.Option>
            <Select.Option value='+1'>+1 🇺🇸</Select.Option>
            <Select.Option value='+44'>+44 🇬🇧</Select.Option>
          </Select>
          <TextInput onChange={onChange} value={rightValue} className={`${formErrors && formErrors[rightName] ? 'error' : ''}`} name={rightName} placeholder={rightPlaceholder} />
        </> :
        <>
          <TextInput onChange={onChange} value={leftValue} className={`${formErrors && formErrors[leftName] ? 'error' : ''}`} name={leftName} placeholder={leftPlaceholder} />
          <TextInput onChange={onChange} value={rightValue} className={`${formErrors && formErrors[rightName] ? 'error' : ''}`} name={rightName} placeholder={rightPlaceholder} />
        </>
      }
    </div>
  );
};

export default HalfInputs;
