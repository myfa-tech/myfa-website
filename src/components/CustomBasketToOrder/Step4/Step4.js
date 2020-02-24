import React, { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

import {
  availableSupps,
  customBasketDetails,
} from '../../../assets/customBasket';
import defaultBasketSrc from '../../../images/default-basket.png';

const QTY_MAX = 5;

const Step4 = ({ basketParts, previousStep, addToCart, supps, setSupps, canPay }) => {
  const [qty, setQty] = useState(1);
  const [basket, setBasket] = useState({ ...basketParts });
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (basketParts['supps']) {
      setSupps(basketParts['supps']);
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
      <h2>Suppléments (+ 1,5€)</h2>
      <div className='ingredients-container'>
        {availableSupps.map(supp => (
          <div key={supp.id} className='ingredient-container' onClick={() => editSupps(supp)}>
            <img src={supp.img || defaultBasketSrc} className={supps.map(s => s.id).includes(supp.id) ? 'selected' : ''} />
            <p>{supp.label}</p>
          </div>
        ))}
      </div>

      <div className='navigation-container'>
        <button className='previous-button small' onClick={() => previousStep()}>Précédent</button>
        <div className='qty-container'>
          <h4>Quantité</h4>

          <ButtonGroup className='qty-buttons' variant='contained' color='primary' aria-label='contained primary button group'>
            <Button className={`qty-button ${canPay ? '' : 'disabled'}`}  onClick={() => updateQty(-1)} disabled={!canPay}>-</Button>
            <Button className={`qty-display ${canPay ? '' : 'disabled'}`} disabled={!canPay}>{qty}</Button>
            <Button className={`qty-button ${canPay ? '' : 'disabled'}`} onClick={() => updateQty(1)} disabled={!canPay}>+</Button>
          </ButtonGroup>

          {qty === QTY_MAX ? <p className='max-qty-msg'>Quantité maximum atteinte</p> : null}

          {isDone ?
            <span className='order-button isDone'>
              <FaCheck color='#6c6' />
            </span> :
            <button type='button' className={`order-button ${canPay ? '' : 'disabled'}`} onClick={finishPurchase} disabled={!canPay}>Ajouter au panier</button>
          }
        </div>
      </div>
    </div>
  );
};

export default Step4;
