import React from 'react'

import Step1 from './Step1';

import './FormContainer.scss';

const FormContainer = ({ step }) => {
  const steps = [
    { title: 'Qui êtes-vous ?' },
    { title: 'Comment MYFA peut vous aider ?' },
    { title: 'Qui devons contacter sur place ?' },
  ];

  return (
    <div className='form-container'>
      <div className='form-title-container'>
        <h3>Étape {step + 1} : {steps[step].title}</h3>

        {/* Add here the stepper */}
      </div>

      {step === 0 ? <Step1 /> : null}
    </div>
  );
};

export default FormContainer;
