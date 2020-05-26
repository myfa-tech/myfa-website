import React, { useEffect, useState } from 'react';

import ProductsGrid from '../../ProductsGrid/ProductsGrid';

import useTranslate from '../../../hooks/useTranslate';
import intersectionBy from '../../../utils/intersectionBy';

const QTY_VEGGIES = 3;

const Step2 = ({ basketParts, nextStep, previousStep, supps, setSupps, availableVeggies }) => {
  const [veggies, setVeggies] = useState([]);
  const [itemsCount, setItemsCount] = useState(0);
  const [t] = useTranslate();

  useEffect(() => {
    if (basketParts['veggies']) {
      setVeggies(basketParts['veggies']);
    }

    if (basketParts['supps']) {
      setSupps(basketParts['supps']);
    }
  }, []);

  useEffect(() => {
    countItems();
  }, [veggies, supps]);

  const countItems = () => {
    const count = veggies.length + intersectionBy(availableVeggies, supps, 'id').length;
    setItemsCount(count);
  };

  const editSupps = (supp) => {
    const index = supps.findIndex(s => s.id === supp.id);

    delete supp.img;

    if (index >= 0) {
      supps.splice(index, 1);
    } else {
      supps.push(supp);
    }

    setSupps([...supps]);
  };

  const editVeggies = (veggie) => {
    const index = veggies.findIndex(f => f.id === veggie.id);

    delete veggie.img;

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
      <h2>{t('myfa_basket_to_order.veggies')} {itemsCount}/{QTY_VEGGIES} - {t('myfa_basket_to_order.choose_3_veggies')}</h2>

      <ProductsGrid
        availableProducts={availableVeggies}
        onItemClicked={editVeggies}
        suppPrice='1,5'
        shouldSuppPriceBeDisplayed={(veggie) => (itemsCount >= QTY_VEGGIES && !veggies.map(v => v.id).includes(veggie.id))}
        shouldProductByHighlighted={(veggie) => (veggies.map(v => v.id).includes(veggie.id) || supps.map(s => s.id).includes(veggie.id))}
      />

      <div className='navigation-container'>
        <button className='previous-button' onClick={() => previousStep()}>{t('myfa_basket_to_order.previous')}</button>
        <button className='next-button' onClick={() => nextStep({ veggies, supps })}>{t('myfa_basket_to_order.next')}</button>
      </div>
    </div>
  );
};

export default Step2;
