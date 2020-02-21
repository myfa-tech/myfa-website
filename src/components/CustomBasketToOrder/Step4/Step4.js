import React, { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

import CartModal from '../../CartModal';

import {
  availableSupps,
  customBasketDetails,
} from '../../../assets/customBasket';
import EventEmitter from '../../../services/EventEmitter';
import defaultBasketSrc from '../../../images/default-basket.png';

const QTY_MAX = 5;
const SUPP_PRICE = 1.5;

const Step4 = ({ basketParts, previousStep }) => {
  const [supps, setSupps] = useState([]);
  const [qty, setQty] = useState(1);
  const [basket, setBasket] = useState({ ...basketParts });
  const [isDone, setIsDone] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);

  useEffect(() => {
    if (basketParts['supps']) {
      setSupps(basketParts['supps']);
    }
  }, []);

  const toggleCartModal = () => {
    setShowCartModal(!showCartModal);
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

  const updateQty = (adding) => {
    let newQty = qty + adding;

    if (newQty > 0 && newQty <= QTY_MAX) {
      setQty(newQty);
    }

    setIsDone(false);
  };

  const addToCart = () => {
    if (typeof window !== 'undefined') {
      const eventEmitter = new EventEmitter();
      let cart = JSON.parse(window.localStorage.getItem('cart'));
      let basketPrice = customBasketDetails.price;

      if (!!supps.length) {
        basketPrice += (supps.length * SUPP_PRICE);
      }

      let newBasket = { ...customBasketDetails, price: basketPrice, items: { ...basket, supps }};
      setBasket({ ...newBasket });

      if (!cart) {
        cart = [];
      }

      for (let i=0; i<qty; i++) {
        cart.push(newBasket);
      }

      setIsDone(true);

      window.localStorage.setItem('cart', JSON.stringify(cart));
      eventEmitter.emit('editCart');

      toggleCartModal();
    }
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
            <Button className='qty-button' onClick={() => updateQty(-1)}>-</Button>
            <Button className='qty-display'>{qty}</Button>
            <Button className='qty-button' onClick={() => updateQty(1)}>+</Button>
          </ButtonGroup>

          {qty === QTY_MAX ? <p className='max-qty-msg'>Quantité maximum atteinte</p> : null}

          {isDone ?
            <span className='order-button isDone'>
              <FaCheck color='#6c6' />
            </span> :
            <button type='button' className='order-button' onClick={addToCart}>Ajouter au panier</button>
          }
        </div>
      </div>

      {showCartModal &&
        <CartModal
          showCartModal={showCartModal}
          toggleCartModal={toggleCartModal}
          basket={basket}
        />
      }
    </div>
  );
};

export default Step4;
