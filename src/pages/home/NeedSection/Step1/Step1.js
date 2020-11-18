import React from 'react';

import HalfInputs from '../../../../components/HalfInputs';
import TextInput from '../../../../components/TextInput';

import './Step1.scss';

const Step1 = ({ errors, formValues, changeFormValues }) => {
  return (
    <div id='step-1'>
      <HalfInputs
        onChange={changeFormValues}
        errors={errors}
        leftName='firstname'
        rightName='lastname'
        leftValue={formValues['firstname']}
        rightValue={formValues['lastname']}
        leftPlaceholder='Prénom'
        rightPlaceholder='Nom'
      />

      <HalfInputs
        onChange={changeFormValues}
        errors={errors}
        leftName='country'
        rightName='phone'
        leftValue={formValues['country']}
        rightValue={formValues['phone']}
        leftPlaceholder='Indicatif'
        rightPlaceholder='Téléphone'
      />

      <TextInput
        value={formValues['email']}
        name='email'
        className={`${errors['email'] ? 'error' : ''}`}
        onChange={changeFormValues}
        placeholder='Email'
      />
    </div>
  );
};

export default Step1;
