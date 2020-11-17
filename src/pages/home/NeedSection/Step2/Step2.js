import React, { useState } from 'react';

import Select from '../../../../components/Select';
import TextInput from '../../../../components/TextInput';

import './Step2.scss';

const Step2 = () => {
  const [formValues, setFormValues] = useState({});

  const changeFormValues = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div id='step-2'>
      <Select
        placeholder='Type de demande'
        className='request-type-select'
        name='request-type'
        onChange={changeFormValues}
      >
        <option>Alimentaire</option>
        <option>Santé</option>
        <option>Batîment</option>
      </Select>

      <TextInput
        value={formValues['details']}
        name='details'
        textarea
        rows={6}
        onChange={changeFormValues}
        placeholder='Donnez-nous plus de détails (optionnel)'
      />
    </div>
  );
};

export default Step2;
