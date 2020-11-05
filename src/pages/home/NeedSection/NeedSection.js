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
  const [isLeftCardFlipped, setIsLeftCardFlipped] = useState(true);
  const [isRightCardFlipped, setIsRightCardFlipped] = useState(false);
  const [budget, setBudget] = useState('');
  const [budgetCFA, setBudgetCFA] = useState(null);
  const { values: formValues, setValues: setFormValues, changeValue: changeFormValue } = useDemandForm();

  useEffect(() => {
    setBudgetCFA(budget * CFA_CONVERTION_RATE);
  }, [budget]);

  const toggleCard = (side) => {
    if (side === 'left') {
      setIsLeftCardFlipped(!isLeftCardFlipped);
    } else {
      setIsRightCardFlipped(!isRightCardFlipped);
    }
  };

  const changeBudget = (e) => {
    if (Number.isInteger(Number(e.target.value))) setBudget(Number(e.target.value));
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

          <div id='need-left-card-back'>
            <FaTimes className='close-icon' onClick={() => toggleCard('left')} />
            <h4 className='form-title'>Formulaire</h4>

            <form id='left-form'>
              <h5>Vos informations</h5>

              <div className='half-inputs-container'>
                <TextInput onChange={changeFormValue} name='self-firstname' placeholder='Prénom' />
                <TextInput onChange={changeFormValue} name='self-lastname' placeholder='Nom' />
              </div>

              <TextInput onChange={changeFormValue} name='self-email' placeholder='Email' />

              <h5>Informations de votre proche</h5>

              <div className='half-inputs-container'>
                <TextInput placeholder='Prénom' />
                <TextInput placeholder='Nom' />
              </div>

              <TextInput placeholder='Relation' />

              <div className='half-inputs-container'>
                <TextInput placeholder='Indicatif' />
                <TextInput placeholder='Numéro' />
              </div>

              <TextInput placeholder='Zone de livraison' />

              <TextInput placeholder='Prestation' />

              <TextInput placeholder='Donnez-nous des détails' />

              <h5>Mon budget</h5>

              <TextInput onChange={changeBudget} value={budget} placeholder='200' className='amount-input' fixedTextRight='€' />

              {budgetCFA ? <p className='amount-cfa'>Soit : {budgetCFA} FCFA</p> : null}

              <Button className='send-form-btn' label='Envoyer mon formulaire' />
            </form>
          </div>
        </ReactCardFlip>

        <div className='need-card'>
          <h3 className='right-element'>Pour vous,<br />MYFA propose :</h3>

          <ul className='right-element'>
            <li>achat de matériel de construction</li>
            <li>suivi de vos constructions</li>
            <li>visite de biens immobiliers</li>
          </ul>

          <img src={singleGuyImgSrc} />

          <Button className='start-btn right-btn' onClick={() => toggleCard('left')} label='Démarrer' />
        </div>
      </div>
    </div>
  );
};

export default NeedSection;
