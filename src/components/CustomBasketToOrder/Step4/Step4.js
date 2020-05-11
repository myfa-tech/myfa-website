import React, { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

import ProductsGrid from '../../ProductsGrid/ProductsGrid';

import useTranslate from '../../../hooks/useTranslate';

const QTY_MAX = 5;

const Step4 = ({ basketParts, previousStep, addToCart, supps, setSupps, canPay, availableSupps }) => {
  const [qty, setQty] = useState(1);
  const [basket, setBasket] = useState({ ...basketParts });
  const [isDone, setIsDone] = useState(false);
  const [t] = useTranslate();

  useEffect(() => {
    if (basketParts['supps']) {
      setSupps(basketParts['supps']);
    }
  }, []);

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

  const updateQty = (adding) => {
    let newQty = qty + adding;

    if (newQty > 0 && newQty <= QTY_MAX) {
      setQty(newQty);
    }

    setIsDone(false);
  };

  const finishPurchase = () => {
    addToCart(basket, qty);
    setIsDone(true);
  };

  return (
    <div>
      <h2>{t('myfa_basket_to_order.supps')} (+ 1,5€)</h2>

      <ProductsGrid
        availableProducts={availableSupps}
        onItemClicked={editSupps}
        shouldProductByHighlighted={(supp) => supps.map(s => s.id).includes(supp.id)}
      />

      <div className='navigation-container'>
        <button className='previous-button small' onClick={() => previousStep()}>{t('myfa_basket_to_order.previous')}</button>
        <div className='qty-container'>
          <h4>{t('myfa_basket_to_order.qty')}</h4>

          <ButtonGroup className='qty-buttons' variant='contained' color='primary' aria-label='contained primary button group'>
            <Button className={`qty-button ${canPay ? '' : 'disabled'}`}  onClick={() => updateQty(-1)} disabled={!canPay}>-</Button>
            <Button className={`qty-display ${canPay ? '' : 'disabled'}`} disabled={!canPay}>{qty}</Button>
            <Button className={`qty-button ${canPay ? '' : 'disabled'}`} onClick={() => updateQty(1)} disabled={!canPay}>+</Button>
          </ButtonGroup>

          {qty === QTY_MAX ? <p className='max-qty-msg'>{t('myfa_basket_to_order.max_qty_reached')}</p> : null}

          {isDone ?
            <span className='order-button isDone'>
              <FaCheck color='#6c6' />
            </span> :
            <button type='button' className={`order-button ${canPay ? '' : 'disabled'}`} onClick={finishPurchase} disabled={!canPay}>
              {t('myfa_basket_to_order.add_to_cart')}
            </button>
          }
        </div>
      </div>
    </div>
  );
};

export default Step4;
