import React from 'react';

import HalfInputs from '../../../../components/HalfInputs';
import TextInput from '../../../../components/TextInput';

import './Step3.scss';

const Step3 = ({ formValues, setFormValues }) => {
  const changeFormValues = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div id='step-3'>
      <HalfInputs
        onChange={changeFormValues}
        errors={null}
        leftName='firstname'
        rightName='lastname'
        leftValue={formValues['firstname']}
        rightValue={formValues['lastname']}
        leftPlaceholder='Prénom'
        rightPlaceholder='Nom'
      />

      <HalfInputs
        onChange={changeFormValues}
        errors={null}
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
        onChange={changeFormValues}
        placeholder='Email'
      />
    </div>
  );
};

export default Step3;
