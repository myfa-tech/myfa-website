import React, { useState } from 'react';

import FormContainer from './FormContainer';
import Button from '../../../components/Button';

import './NeedSection.scss';

const NeedSection = () => {
  const [step, setStep] = useState(0);

  return (
    <div id='need-section'>
      <h2>J'ai besoin de MYFA</h2>

      <p className='section-description'>Alimentaire ? Santé ? Bâtiment ?</p>
      <p className='section-description'>Détaillez votre besoin, nous vous contacterons pour mieux le comprendre.</p>

      <div id='need-section-content'>
        <FormContainer step={step} />
        <>
          <Button className='callback-btn' label='Me faire rappeler' />
          <span className='its-free'>(c'est gratuit)</span>
        </>
      </div>
    </div>
  );
};

export default NeedSection;
