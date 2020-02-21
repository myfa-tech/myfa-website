import React, { useEffect, useState } from 'react';

import {
  availableBases,
  availableFruits,
} from '../../../assets/customBasket';

import defaultBasketSrc from '../../../images/default-basket.png';

const QTY_BASES = 1;
const QTY_FRUITS = 3;

const Step1 = ({ basketParts, nextStep }) => {
  const [bases, setBases] = useState([]);
  const [fruits, setFruits] = useState([]);
  const [supps, setSupps] = useState([]);

  useEffect(() => {
    if (basketParts['bases']) {
      setBases(basketParts['bases']);
    }

    if (basketParts['fruits']) {
      setFruits(basketParts['fruits']);
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

  const editBases = (base) => {
    const index = bases.findIndex(b => b.id === base.id);

    if (index >= 0) {
      bases.splice(index, 1);

      const suppIndex = supps.findIndex(s => s.type === 'bases');

      if (bases.length < QTY_BASES && suppIndex >= 0) {
        let supp = supps.splice(suppIndex, 1)[0];
        bases.push(supp);
        setSupps([...supps]);
      }

      setBases([...bases]);
    } else if (bases.length >= QTY_BASES) {
      editSupps(base);
    } else {
      bases.push(base);
      setBases([...bases]);
    }
  };

  const editFruits = (fruit) => {
    const index = fruits.findIndex(f => f.id === fruit.id);

    if (index >= 0) {
      fruits.splice(index, 1);

      const suppIndex = supps.findIndex(s => s.type === 'fruits');

      if (fruits.length < QTY_FRUITS && suppIndex >= 0) {
        let supp = supps.splice(suppIndex, 1)[0];
        fruits.push(supp);
        setSupps([...supps]);
      }

      setFruits([...fruits]);
    } else if (fruits.length >= QTY_FRUITS) {
      editSupps(fruit);
    } else {
      fruits.push(fruit);
      setFruits([...fruits]);
    }
  };

  return (
    <div>
      <h2>Bases {(bases.length + supps.filter(s => s.type === 'bases').length)}/{QTY_BASES} - Veuillez choisir une base</h2>
      <div className='ingredients-container'>
        {availableBases.map(base => (
          <div key={base.id} className='ingredient-container' onClick={() => editBases(base)}>
            <img src={base.img || defaultBasketSrc} className={(bases.map(b => b.id).includes(base.id) || supps.map(s => s.id).includes(base.id)) ? 'selected' : ''} />
            <p>
              {base.label}
              {(bases.length >= QTY_BASES && !bases.map(b => b.id).includes(base.id)) ?
                <span className='supp-prices'>+1,5 €</span> : null
              }
            </p>
          </div>
        ))}
      </div>

      <h2>Fruits {(fruits.length + supps.filter(s => s.type === 'fruits').length)}/{QTY_FRUITS} - Vous pouvez choisir jusqu’à trois fruits</h2>
      <div className='ingredients-container'>
        {availableFruits.map(fruit => (
          <div key={fruit.id} className='ingredient-container' onClick={() => editFruits(fruit)}>
            <img src={fruit.img || defaultBasketSrc} className={(fruits.map(f => f.id).includes(fruit.id) || supps.map(s => s.id).includes(fruit.id)) ? 'selected' : ''} />
            <p>
              {fruit.label}
              {(fruits.length >= QTY_FRUITS && !fruits.map(f => f.id).includes(fruit.id)) ?
                <span className='supp-prices'>+1,5 €</span> : null
              }
            </p>
          </div>
        ))}
      </div>

      <div className='navigation-container'>
        <button className='previous-button disabled' disabled>Précédent</button>
        <button className='next-button' onClick={() => nextStep({ bases, fruits, supps })}>Suivant</button>
      </div>
    </div>
  );
};

export default Step1;