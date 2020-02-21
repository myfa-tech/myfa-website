import React, { useEffect, useState } from 'react';

import defaultBasketSrc from '../../../images/default-basket.png';

import { availableVeggies } from '../../../assets/customBasket';

const QTY_VEGGIES = 3;

const Step2 = ({ basketParts, nextStep, previousStep }) => {
  const [veggies, setVeggies] = useState([]);
  const [supps, setSupps] = useState([]);

  useEffect(() => {
    if (basketParts['veggies']) {
      setVeggies(basketParts['veggies']);
    }
  }, []);

  const editSupps = (supp) => {
    const index = supps.findIndex(s => s.id === supp.id);

    if (index >= 0) {
      supps.splice(index, 1);
    } else {
      supps.push(supp);
    }

    setSupps([...supps]);
  };

  const editVeggies = (veggie) => {
    const index = veggies.findIndex(f => f.id === veggie.id);

    if (index >= 0) {
      veggies.splice(index, 1);

      const suppIndex = supps.findIndex(s => s.type === 'veggies');

      if (veggies.length < QTY_VEGGIES && suppIndex >= 0) {
        let supp = supps.splice(suppIndex, 1)[0];
        veggies.push(supp);
        setSupps([...supps]);
      }

      setVeggies([...veggies]);
    } else if (veggies.length >= QTY_VEGGIES) {
      editSupps(veggie);
    } else {
      veggies.push(veggie);
      setVeggies([...veggies]);
    }
  };

  return (
    <div>
      <h2>Légumes {(veggies.length + supps.filter(s => s.type === 'veggies').length)}/{QTY_VEGGIES} - Vous pouvez choisir jusqu’à trois légumes</h2>
      <div className='ingredients-container'>
        {availableVeggies.map(veggie => (
          <div key={veggie.id} className='ingredient-container' onClick={() => editVeggies(veggie)}>
            <img src={veggie.img || defaultBasketSrc} className={(veggies.map(f => f.id).includes(veggie.id) || supps.map(s => s.id).includes(veggie.id)) ? 'selected' : ''} />
            <p>
              {veggie.label}
              {(veggies.length >= QTY_VEGGIES && !veggies.map(v => v.id).includes(veggie.id)) ?
                <span className='supp-prices'>+1,5 €</span> : null
              }
            </p>
          </div>
        ))}
      </div>

      <div className='navigation-container'>
        <button className='previous-button' onClick={() => previousStep()}>Précédent</button>
        <button className='next-button' onClick={() => nextStep({ veggies, supps })}>Suivant</button>
      </div>
    </div>
  );
};

export default Step2;
