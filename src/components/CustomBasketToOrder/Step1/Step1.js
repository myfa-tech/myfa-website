import React, { useEffect, useState } from 'react';
import { intersectionBy } from 'lodash';

import useTranslate from '../../../hooks/useTranslate';

import defaultBasketSrc from '../../../images/default-basket.png';

const QTY_BASES = 1;
const QTY_FRUITS = 3;

const Step1 = ({ basketParts, nextStep, supps, setSupps, availableBases, availableFruits }) => {
  const [bases, setBases] = useState([]);
  const [fruits, setFruits] = useState([]);
  const [fruitsCount, setFruitsCount] = useState(0);
  const [basesCount, setBasesCount] = useState(0);
  const [t] = useTranslate();

  useEffect(() => {
    if (basketParts['bases']) {
      setBases(basketParts['bases']);
    }

    if (basketParts['fruits']) {
      setFruits(basketParts['fruits']);
    }

    if (basketParts['supps']) {
      setSupps(basketParts['supps']);
    }
  }, []);

  useEffect(() => {
    countBases();
  }, [bases, supps]);

  useEffect(() => {
    countFruits();
  }, [fruits, supps]);

  const countBases = () => {
    let count = bases.length + intersectionBy(availableBases, supps, 'id').length;
    setBasesCount(count);
  };

  const countFruits = () => {
    let count = fruits.length + intersectionBy(availableFruits, supps, 'id').length;
    setFruitsCount(count);
  };

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
      <h2>{t('custom_basket_to_order.bases')} {basesCount}/{QTY_BASES} - {t('custom_basket_to_order.choose_base')}</h2>
      <div className='ingredients-container'>
        {availableBases.map(base => (
          <div key={base.id} className='ingredient-container' onClick={() => editBases(base)}>
            <img src={base.img || defaultBasketSrc} className={(bases.map(b => b.id).includes(base.id) || supps.map(s => s.id).includes(base.id)) ? 'selected' : ''} />
            <p>
              {t(`ingredients.${base.labelTranslate}`)}
              {(basesCount >= QTY_BASES && !bases.map(b => b.id).includes(base.id)) ?
                <span className='supp-prices'>+1,5 €</span> : null
              }
            </p>
          </div>
        ))}
      </div>

      <h2>{t('custom_basket_to_order.fruits')} {fruitsCount}/{QTY_FRUITS} - {t('custom_basket_to_order.choose_3_fruits')}</h2>
      <div className='ingredients-container'>
        {availableFruits.map(fruit => (
          <div key={fruit.id} className='ingredient-container' onClick={() => editFruits(fruit)}>
            <img src={fruit.img || defaultBasketSrc} className={(fruits.map(f => f.id).includes(fruit.id) || supps.map(s => s.id).includes(fruit.id)) ? 'selected' : ''} />
            <p>
              {fruit.label}
              {(fruitsCount >= QTY_FRUITS && !fruits.map(f => f.id).includes(fruit.id)) ?
                <span className='supp-prices'>+1,5 €</span> : null
              }
            </p>
          </div>
        ))}
      </div>

      <div className='navigation-container'>
        <button className='previous-button disabled' disabled>{t('custom_basket_to_order.previous')}</button>
        <button className='next-button' onClick={() => nextStep({ bases, fruits, supps })}>{t('custom_basket_to_order.next')}</button>
      </div>
    </div>
  );
};

export default Step1;
