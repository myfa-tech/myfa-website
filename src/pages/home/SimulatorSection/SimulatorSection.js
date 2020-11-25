import React, { useEffect, useState } from 'react';
import TextInput from '../../../components/TextInput';

import './SimulatorSection.scss';

const TYPES_OF_PRESTATIONS = [
  { type: '', fixedCost: 0, percentage: 0 },
  { type: '🚀', fixedCost: 8, percentage: 0 },
  { type: '🚀🚀', fixedCost: 3, percentage: 10 },
  { type: '🚀🚀🚀', fixedCost: 0, percentage: 12 },
];

const LIMIT_1 = 50;
const LIMIT_2 = 200;

const SimulatorSection = () => {
  const [amount, setAmount] = useState(0);
  const [typeOfPrestation, setTypeOfPrestation] = useState(0);

  useEffect(() => {
    if (amount === 0 && typeOfPrestation !== 0) {
      setTypeOfPrestation(0);
    } else if (amount > 0 && amount < LIMIT_1 && typeOfPrestation !== 1) {
      setTypeOfPrestation(1);
    } else if (amount >= LIMIT_1 && amount < LIMIT_2 && typeOfPrestation !== 2) {
      setTypeOfPrestation(2);
    } else if (amount >= LIMIT_2 && typeOfPrestation !== 3) {
      setTypeOfPrestation(3);
    }
  }, [amount]);

  const changeAmount = (e) => {
    const newValue = Number(e.target.value);

    if (Number.isInteger(newValue)) {
      setAmount(newValue);
    }
  };

  return (
    <div id='simulator-section'>
      <h2>Simulateur</h2>
      <p className='section-description'>MYFA prône la transparence.</p>
      <p className='section-description'>Entrez un montant, vous aurez une idée de votre budget MYFA.</p>

      <div className='simulator'>
        <h3>Je souhaite dépenser</h3>

        <TextInput className='amount-input' fixedTextRight='€' value={amount} onChange={changeAmount} />

        <div className='prestation-container'>
          <span>Prestation MYFA</span>
          <span className='dots'>..................................................................................................................</span>
          <span>{TYPES_OF_PRESTATIONS[typeOfPrestation].fixedCost}€</span>
        </div>

        <div className='prestation-container'>
          <span>Achat {TYPES_OF_PRESTATIONS[typeOfPrestation].type}</span>
          <span className='dots'>..................................................................................................................</span>
          <span>+{TYPES_OF_PRESTATIONS[typeOfPrestation].percentage}%</span>
        </div>

        <p className='owed-amount-title'>Montant total dû</p>

        <p className='owed-amount'>{(amount + (amount*TYPES_OF_PRESTATIONS[typeOfPrestation].percentage/100) + TYPES_OF_PRESTATIONS[typeOfPrestation].fixedCost)} €</p>
      </div>
    </div>
  );
};

export default SimulatorSection;
