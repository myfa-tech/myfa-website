import React, { useEffect, useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { FaTimes } from 'react-icons/fa';

import Button from '../../../../components/Button';
import TextInput from '../../../../components/TextInput';
import useDemandForm from '../../../../hooks/useDemandForm';

import sendForm from '../../../../services/forms/sendForm';

import people2ImgSrc from '../../../../images/2-people.jpg';

const CFA_CONVERTION_RATE = 655;

const LeftFlipCard = () => {
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [budgetCFA, setBudgetCFA] = useState(null);
  const {
    values: formValues,
    changeValue: changeFormValue,
    errors: formErrors,
    handleSubmitForm,
  } = useDemandForm(submit);

  useEffect(() => {
    setBudgetCFA(formValues.budget * CFA_CONVERTION_RATE);
  }, [formValues.budget]);

  const toggleCard = () => setIsCardFlipped(!isCardFlipped);

  const changeBudget = (e) => {
    if (Number.isInteger(Number(e.target.value))) changeFormValue(e);
  };

  const submitForm = (e) => {
    e.preventDefault();
    handleSubmitForm();
  };

  async function submit() {
    try {
      await sendForm(formValues);
      // @TODO: redirect to success page
    } catch(e) {
      console.log(e);
      alert('ERROR');
    }
  };

  return (
    <ReactCardFlip isFlipped={isCardFlipped} flipDirection='horizontal'>
      <div className='need-card'>
        <h3 className='left-element'>Pour vos proches,<br />MYFA réalise :</h3>

        <ul className='left-element'>
          <li>courses alimentaires</li>
          <li>achat de médicaments</li>
          <li>autres missions diverses</li>
        </ul>

        <img src={people2ImgSrc} />

        <Button className='start-btn' onClick={toggleCard} label='Démarrer' />
      </div>

      <div className='need-card-back left-card'>
        <FaTimes className='close-icon' onClick={toggleCard} />
        <h4 className='form-title'>Formulaire</h4>

        <form id='left-form' onSubmit={submitForm}>
          <h5>Vos informations</h5>

          <div className='half-inputs-container'>
            <TextInput onChange={changeFormValue} className={`${formErrors['self-firstname'] ? 'error' : ''}`} name='self-firstname' placeholder='Prénom' />
            <TextInput onChange={changeFormValue} className={`${formErrors['self-lastname'] ? 'error' : ''}`} name='self-lastname' placeholder='Nom' />
          </div>

          <TextInput onChange={changeFormValue} className={`${formErrors['self-email'] ? 'error' : ''}`} name='self-email' placeholder='Email' />

          <h5>Informations de votre proche</h5>

          <div className='half-inputs-container'>
            <TextInput onChange={changeFormValue} className={`${formErrors['other-firstname'] ? 'error' : ''}`} name='other-firstname' placeholder='Prénom' />
            <TextInput onChange={changeFormValue} className={`${formErrors['other-lastname'] ? 'error' : ''}`} name='other-lastname' placeholder='Nom' />
          </div>

          <TextInput onChange={changeFormValue} className={`${formErrors['other-relationship'] ? 'error' : ''}`} name='other-relationship' placeholder='Relation' />

          <div className='half-inputs-container'>
            <TextInput onChange={changeFormValue} className={`${formErrors['other-country-code'] ? 'error' : ''}`} name='other-country-code' placeholder='Indicatif' />
            <TextInput onChange={changeFormValue} className={`${formErrors['other-phone'] ? 'error' : ''}`} name='other-phone' placeholder='Numéro' />
          </div>

          <TextInput onChange={changeFormValue} className={`${formErrors['other-location'] ? 'error' : ''}`} name='other-location' placeholder='Zone de livraison' />

          <TextInput onChange={changeFormValue} className={`${formErrors['other-service'] ? 'error' : ''}`} name='other-service' placeholder='Prestation' />

          <TextInput textarea onChange={changeFormValue} className={`${formErrors['other-details'] ? 'error' : ''}`} name='other-details' placeholder='Donnez-nous des détails' />

          <h5>Mon budget</h5>

          <TextInput onChange={changeBudget} value={formValues.budget} name='budget' placeholder='200' className={`${formErrors['other-details'] ? 'error' : ''} amount-input`} fixedTextRight='€' />

          {budgetCFA ? <p className='amount-cfa'>Soit : {budgetCFA} FCFA</p> : null}

          <Button className='send-form-btn' label='Envoyer mon formulaire' type='submit' />
        </form>
      </div>
    </ReactCardFlip>
  );
};

export default LeftFlipCard;
