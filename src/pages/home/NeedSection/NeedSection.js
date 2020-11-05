import React, { useEffect, useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { FaTimes } from 'react-icons/fa';

import Button from '../../../components/Button';
import TextInput from '../../../components/TextInput';
import useDemandForm from '../../../hooks/useDemandForm';

import './NeedSection.scss';

import people2ImgSrc from '../../../images/2-people.jpg';
import singleGuyImgSrc from '../../../images/single-guy.jpg';

const CFA_CONVERTION_RATE = 655;

const NeedSection = () => {
  const [isLeftCardFlipped, setIsLeftCardFlipped] = useState(false);
  const [isRightCardFlipped, setIsRightCardFlipped] = useState(false);
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

  const toggleCard = (side) => {
    if (side === 'left') {
      setIsLeftCardFlipped(!isLeftCardFlipped);
      setIsRightCardFlipped(false);
    } else {
      setIsRightCardFlipped(!isRightCardFlipped);
      setIsLeftCardFlipped(false);
    }
  };

  const changeBudget = (e) => {
    if (Number.isInteger(Number(e.target.value))) changeFormValue(e);
  };

  const submitForm = (e) => {
    e.preventDefault();
    handleSubmitForm();
  };

  function submit() {
    console.log('SUBMITTING FORM');
  };

  return (
    <div id='need-section'>
      <h2>J'ai besoin de MYFA</h2>

      <div id='cards-container'>
        <ReactCardFlip isFlipped={isLeftCardFlipped} flipDirection='horizontal'>
          <div className='need-card'>
            <h3 className='left-element'>Pour vos proches,<br />MYFA réalise :</h3>

            <ul className='left-element'>
              <li>courses alimentaires</li>
              <li>achat de médicaments</li>
              <li>autres missions diverses</li>
            </ul>

            <img src={people2ImgSrc} />

            <Button className='start-btn' onClick={() => toggleCard('left')} label='Démarrer' />
          </div>

          <div className='need-card-back left-card'>
            <FaTimes className='close-icon' onClick={() => toggleCard('left')} />
            <h4 className='form-title'>Formulaire</h4>

            <form id='left-form' onSubmit={submitForm}>
              <h5>Vos informations</h5>

              <div className='half-inputs-container'>
                <TextInput onChange={changeFormValue} name='self-firstname' placeholder='Prénom' />
                <TextInput onChange={changeFormValue} name='self-lastname' placeholder='Nom' />
              </div>

              <TextInput onChange={changeFormValue} name='self-email' placeholder='Email' />

              <h5>Informations de votre proche</h5>

              <div className='half-inputs-container'>
                <TextInput onChange={changeFormValue} name='relative-firstname' placeholder='Prénom' />
                <TextInput onChange={changeFormValue} name='relative-lastname' placeholder='Nom' />
              </div>

              <TextInput onChange={changeFormValue} name='relative-relationship' placeholder='Relation' />

              <div className='half-inputs-container'>
                <TextInput onChange={changeFormValue} name='relative-country-code' placeholder='Indicatif' />
                <TextInput onChange={changeFormValue} name='relative-phone' placeholder='Numéro' />
              </div>

              <TextInput onChange={changeFormValue} name='relative-location' placeholder='Zone de livraison' />

              <TextInput onChange={changeFormValue} name='relative-service' placeholder='Prestation' />

              <TextInput textarea onChange={changeFormValue} name='relative-details' placeholder='Donnez-nous des détails' />

              <h5>Mon budget</h5>

              <TextInput onChange={changeBudget} value={formValues.budget} name='budget' placeholder='200' className='amount-input' fixedTextRight='€' />

              {budgetCFA ? <p className='amount-cfa'>Soit : {budgetCFA} FCFA</p> : null}

              <Button className='send-form-btn' label='Envoyer mon formulaire' type='submit' />
            </form>
          </div>
        </ReactCardFlip>

        <ReactCardFlip isFlipped={isRightCardFlipped} flipDirection='horizontal'>
          <div className='need-card'>
            <h3 className='right-element'>Pour vous,<br />MYFA propose :</h3>

            <ul className='right-element'>
              <li>achat de matériel de construction</li>
              <li>suivi de vos constructions</li>
              <li>visite de biens immobiliers</li>
            </ul>

            <img src={singleGuyImgSrc} />

            <Button className='start-btn right-btn' onClick={() => toggleCard('right')} label='Démarrer' />
          </div>

          <div className='need-card-back right-card'>
            <FaTimes className='close-icon' onClick={() => toggleCard('right')} />
            <h4 className='form-title'>Formulaire</h4>

            <form id='right-form' onSubmit={submitForm}>
              <h5>Vos informations</h5>

              <div className='half-inputs-container'>
                <TextInput onChange={changeFormValue} name='self-firstname' placeholder='Prénom' />
                <TextInput onChange={changeFormValue} name='self-lastname' placeholder='Nom' />
              </div>

              <TextInput onChange={changeFormValue} name='self-email' placeholder='Email' />

              <h5>Informations de votre proche</h5>

              <div className='half-inputs-container'>
                <TextInput onChange={changeFormValue} name='relative-firstname' placeholder='Prénom' />
                <TextInput onChange={changeFormValue} name='relative-lastname' placeholder='Nom' />
              </div>

              <TextInput onChange={changeFormValue} name='relative-relationship' placeholder='Relation' />

              <div className='half-inputs-container'>
                <TextInput onChange={changeFormValue} name='relative-indicatif' placeholder='Indicatif' />
                <TextInput onChange={changeFormValue} name='relative-phone' placeholder='Numéro' />
              </div>

              <TextInput onChange={changeFormValue} name='relative-location' placeholder='Zone de livraison' />

              <TextInput onChange={changeFormValue} name='relative-service' placeholder='Prestation' />

              <TextInput textarea onChange={changeFormValue} name='relative-details' placeholder='Donnez-nous des détails' />

              <h5>Mon budget</h5>

              <TextInput onChange={changeBudget} value={formValues.budget} name='budget' placeholder='200' className='amount-input' fixedTextRight='€' />

              {budgetCFA ? <p className='amount-cfa'>Soit : {budgetCFA} FCFA</p> : null}

              <Button className='send-form-btn' label='Envoyer mon formulaire' type='submit' />
            </form>
          </div>
        </ReactCardFlip>
      </div>
    </div>
  );
};

export default NeedSection;
