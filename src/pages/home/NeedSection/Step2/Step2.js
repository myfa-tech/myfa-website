import React from 'react';

import Select from '../../../../components/Select';
import TextInput from '../../../../components/TextInput';

import './Step2.scss';

const Step2 = ({ formValues, setFormValues }) => {
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
        <Select.Option value='Alimentaire'>J'ai besoin de faire livrer de la nourriture</Select.Option>
        <Select.Option value='Santé'>J'ai besoin de faire livrer des médicaments</Select.Option>
        <Select.Option value='Batiment-chantier'>Je veux suivre mon chantier à distance</Select.Option>
        <Select.Option value='Batiment-terrain'>Je veux des informations sur un terrain</Select.Option>
        <Select.Option value='Batiment-materiaux'>Je veux faire livrer du matériel de construction</Select.Option>
        <Select.Option value='Cadeau'>Je veux faire un cadeau</Select.Option>
        <Select.Option value='Autre'>Autre</Select.Option>
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
