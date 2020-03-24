import React, { useEffect, useState } from 'react';
import { intersectionBy } from 'lodash';

import useTranslate from '../../../hooks/useTranslate';

import { availableSauces } from '../../../assets/customBasket';
import defaultBasketSrc from '../../../images/default-basket.png';

const QTY_SAUCES = 3;

const Step3 = ({ basketParts, nextStep, previousStep, supps, setSupps }) => {
  const [sauces, setSauces] = useState([]);
  const [itemsCount, setItemsCount] = useState(0);
  const [t] = useTranslate();

  useEffect(() => {
    if (basketParts['supps']) {
      setSupps(basketParts['supps']);
    }

    if (basketParts['sauces']) {
      setSauces(basketParts['sauces']);
    }
  }, []);

  useEffect(() => {
    countItems();
  }, [sauces, supps]);

  const countItems = () => {
    const count = sauces.length + intersectionBy(availableSauces, supps, 'id').length;
    setItemsCount(count);
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

  const editSauces = (sauce) => {
    const index = sauces.findIndex(f => f.id === sauce.id);

    if (index >= 0) {
      sauces.splice(index, 1);

      const suppIndex = supps.findIndex(s => s.type === 'sauces');

      if (sauces.length < QTY_SAUCES && suppIndex >= 0) {
        let supp = supps.splice(suppIndex, 1)[0];
        sauces.push(supp);
        setSupps([...supps]);
      }

      setSauces([...sauces]);
    } else if (sauces.length >= QTY_SAUCES) {
      editSupps(sauce);
    } else {
      sauces.push(sauce);
      setSauces([...sauces]);
    }
  };

  return (
    <div>
      <h2>{t('custom_basket_to_order.sauces')} {itemsCount}/{QTY_SAUCES} - {t('custom_basket_to_order.choose_3_products')}</h2>
      <div className='ingredients-container'>
        {availableSauces.map(sauce => (
          <div key={sauce.id} className='ingredient-container' onClick={() => editSauces(sauce)}>
            <img src={sauce.img || defaultBasketSrc} className={(sauces.map(s => s.id).includes(sauce.id) || supps.map(s => s.id).includes(sauce.id)) ? 'selected' : ''} />
            <p>
              {t(`ingredients.${sauce.labelTranslate}`)}
              {(itemsCount >= QTY_SAUCES && !sauces.map(s => s.id).includes(sauce.id)) ?
                <span className='supp-prices'>+1,5 €</span> : null
              }
            </p>
          </div>
        ))}
      </div>

      <div className='navigation-container'>
        <button className='previous-button' onClick={() => previousStep()}>{t('custom_basket_to_order.previous')}</button>
        <button className='next-button' onClick={() => nextStep({ sauces, supps })}>{t('custom_basket_to_order.next')}</button>
      </div>
    </div>
  );
};

export default Step3;
