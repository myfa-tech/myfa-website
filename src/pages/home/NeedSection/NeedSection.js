import React, { useState } from 'react';
import { navigate } from '@reach/router';

import Button from '../../../components/Button';
import Stepper from '../../../components/Stepper';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

import createRequest from '../../../services/requests/createRequest';
import updateRequest from '../../../services/requests/updateRequest';

import './NeedSection.scss';
import useStep1Form from './useStep1Form';

import confeti1 from '../../../images/confeti-vert-1.png';
import confeti2 from '../../../images/confeti-marron-2.png';
import Toast from '../../../components/Toast/Toast';

const steps = [
  { title: 'Qui êtes-vous ?' },
  { title: 'Quelle est votre situation ?' },
  { title: 'Qui devons-nous contacter sur place ?' },
];

const NeedSection = () => {
  const [step, setStep] = useState(0);
  const { handleSubmitForm: handleSubmitForm1, errors: errorsForm1, changeFormValues: changeStep1FormValues, values: step1FormValues } = useStep1Form(submitStep1);
  const [step2FormValues, setStep2FormValues] = useState({});
  const [step3FormValues, setStep3FormValues] = useState({});
  const [request, setRequest] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const goTo = (link) => {
    navigate(link);
  };

  async function submitStep1() {
    try {
      const createdRequest = await createRequest(step1FormValues);
      setRequest(createdRequest);
      toggleShowToast();
      setStep(1);
    } catch(e) {
      // @TODO : trigger error
      console.log(e);
    }
  };

  async function submitStep2() {
    try {
      await updateRequest(request._id, { type: step2FormValues['request-type'], details: step2FormValues['details'] });
      setStep(2);
    } catch(e) {
      // @TODO : trigger error
      console.log(e);
    }
  };

  async function submitStep3() {
    try {
      await updateRequest(request._id, { contact: step3FormValues });
      goTo('/email_confirmation');
    } catch(e) {
      // @TODO : trigger error
      console.log(e);
    }
  };

  const goToStep = (stepNumber) => setStep(stepNumber);

  const toggleShowToast = () => setShowToast(!showToast);

  return (
    <div id='need-section'>
      <h2>J'ai besoin de MYFA</h2>

      <p className='section-description'>Alimentaire ? Santé ? Batiment ?</p>
      <p className='section-description'>Détaillez votre besoin, nous vous contacterons pour mieux le comprendre.</p>

      <div id='need-section-content'>
        <div className='form-container'>
          <div className='form-title-container'>
            <h3>Étape {step + 1} : {steps[step].title}</h3>

            <Stepper steps={3} step={step} />
          </div>

          {step === 0 ? <Step1 errors={errorsForm1} formValues={step1FormValues} changeFormValues={changeStep1FormValues} /> : null}
          {step === 1 ? <Step2 formValues={step2FormValues} setFormValues={setStep2FormValues} /> : null}
          {step === 2 ? <Step3 formValues={step3FormValues} setFormValues={setStep3FormValues} /> : null}

          <img src={confeti1} className='confeti-1' />
          <img src={confeti2} className='confeti-2' />
          <img src={confeti2} className='confeti-3' />
          <img src={confeti1} className='confeti-4' />
        </div>

        {step === 0 ? <div>
          <Button className='callback-btn' onClick={handleSubmitForm1} label='Me faire rappeler' />
          <span className='its-free'>(c'est gratuit)</span>
        </div> : null}

        {step === 1 ? <div>
          <Button className='next-btn' onClick={submitStep2} label='Suivant' />
        </div> : null}

        {step === 2 ? <div className='nav-btns-container'>
          <Button className='previous-btn' onClick={() => goToStep(1)} label='Précédent' />
          <Button className='finish-btn' onClick={submitStep3} label='Terminer' />
        </div> : null}
      </div>

      {showToast ? <Toast
        toggleShow={toggleShowToast}
        delay={5000}
        message='Merci ! Dites-nous en plus sur votre besoin 😉'
      /> : null}
    </div>
  );
};

export default NeedSection;
