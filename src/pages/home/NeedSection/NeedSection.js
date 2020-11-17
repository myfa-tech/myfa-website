import React, { useState } from 'react';
import { navigate } from '@reach/router';

import Button from '../../../components/Button';
import Stepper from '../../../components/Stepper';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

import './NeedSection.scss';

const steps = [
  { title: 'Qui êtes-vous ?' },
  { title: 'Comment MYFA peut vous aider ?' },
  { title: 'Qui devons-nous contacter sur place ?' },
];

const NeedSection = () => {
  const [step, setStep] = useState(0);
  const [step1FormValues, setStep1FormValues] = useState({});
  const [step2FormValues, setStep2FormValues] = useState({});
  const [step3FormValues, setStep3FormValues] = useState({});

  const goTo = (link) => {
    navigate(link);
  };

  const submitStep1 = () => {
    // @TODO: submit form and save infos
    setStep(1);
  };

  const submitStep2 = () => {
    // @TODO: submit form and save infos
    setStep(2);
  };

  const submitStep3 = () => {
    // @TODO: submit form and finish
    goTo('/email_confirmation')
  };

  return (
    <div id='need-section'>
      <h2>J'ai besoin de MYFA</h2>

      <p className='section-description'>Alimentaire ? Santé ? Bâtiment ?</p>
      <p className='section-description'>Détaillez votre besoin, nous vous contacterons pour mieux le comprendre.</p>

      <div id='need-section-content'>
        <div className='form-container'>
          <div className='form-title-container'>
            <h3>Étape {step + 1} : {steps[step].title}</h3>

            <Stepper steps={3} step={step} />
          </div>

          {step === 0 ? <Step1 formValues={step1FormValues} setFormValues={setStep1FormValues} /> : null}
          {step === 1 ? <Step2 formValues={step2FormValues} setFormValues={setStep2FormValues} /> : null}
          {step === 2 ? <Step3 formValues={step3FormValues} setFormValues={setStep3FormValues} /> : null}
        </div>

        {step === 0 ? <div>
          <Button className='callback-btn' onClick={submitStep1} label='Me faire rappeler' />
          <span className='its-free'>(c'est gratuit)</span>
        </div> : null}

        {step === 1 ? <div>
          <Button className='next-btn' onClick={submitStep2} label='Suivant' />
        </div> : null}

        {step === 2 ? <div>
          <Button className='finish-btn' onClick={submitStep3} label='Terminer' />
        </div> : null}
      </div>
    </div>
  );
};

export default NeedSection;
