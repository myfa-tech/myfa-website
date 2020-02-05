import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FaCheck } from 'react-icons/fa'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

import {
  availableBases,
  availableFruits,
  availableSauces,
  availableSupps,
  availableVeggies,
} from '../../assets/customBasket';

import './CustomBasketToOrder.scss';

import defaultBasketSrc from '../../images/default-basket.png';
import getQueryParam from '../../utils/getQueryParam';

const QTY_MAX = 5;
const QTY_BASES = 1;
const QTY_FRUITS = 3;
const QTY_VEGGIES = 3;
const QTY_SAUCES = 3;

const Step1 = ({ nextStep }) => {
  const [bases, setBases] = useState([]);
  const [fruits, setFruits] = useState([]);

  const editBases = (base) => {
    const index = bases.findIndex(b => b.id === base.id);

    if (index >= 0) {
      bases.splice(index, 1);
    } else {
      bases.push(base);
    }

    setBases([...bases]);
  };

  const editFruits = (fruit) => {
    const index = fruits.findIndex(f => f.id === fruit.id);

    if (index >= 0) {
      fruits.splice(index, 1);
    } else {
      fruits.push(fruit);
    }

    setFruits([...fruits]);
  };

  return (
    <div>
      <h2>Bases {bases.length}/{QTY_BASES} - Veuillez choisir une base</h2>
      <div className='ingredients-container'>
        {availableBases.map(base => (
          <div className='ingredient-container' onClick={() => editBases(base)}>
            <img src={defaultBasketSrc} className={bases.map(b => b.id).includes(base.id) ? 'selected' : ''} />
            <p>{base.label}</p>
          </div>
        ))}
      </div>

      <h2>Fruits {fruits.length}/{QTY_FRUITS} - Vous pouvez choisir jusqu’à trois fruits</h2>
      <div className='ingredients-container'>
        {availableFruits.map(fruit => (
          <div className='ingredient-container' onClick={() => editFruits(fruit)}>
            <img src={defaultBasketSrc} className={fruits.map(f => f.id).includes(fruit.id) ? 'selected' : ''} />
            <p>{fruit.label}</p>
          </div>
        ))}
      </div>

      <button className='next-button' onClick={() => nextStep({ bases, fruits })}>Suivant</button>
    </div>
  );
};

const Step2 = ({ nextStep }) => {
  const [veggies, setVeggies] = useState([]);

  const editVeggies = (veggie) => {
    const index = veggies.findIndex(v => v.id === veggie.id);

    if (index >= 0) {
      veggies.splice(index, 1);
    } else {
      veggies.push(veggie);
    }

    setVeggies([...veggies]);
  };

  return (
    <div>
      <h2>Légumes {veggies.length}/{QTY_VEGGIES} - Vous pouvez choisir jusqu’à trois légumes</h2>
      <div className='ingredients-container'>
        {availableVeggies.map(veggie => (
          <div className='ingredient-container' onClick={() => editVeggies(veggie)}>
            <img src={defaultBasketSrc} className={veggies.map(f => f.id).includes(veggie.id) ? 'selected' : ''} />
            <p>{veggie.label}</p>
          </div>
        ))}
      </div>

      <button className='next-button' onClick={() => nextStep({ veggies })}>Suivant</button>
    </div>
  );
};

const Step3 = ({ nextStep }) => {
  const [sauces, setSauces] = useState([]);

  const editSauces = (sauce) => {
    const index = sauces.findIndex(s => s.id === sauce.id);

    if (index >= 0) {
      sauces.splice(index, 1);
    } else {
      sauces.push(sauce);
    }

    setSauces([...sauces]);
  };

  return (
    <div>
      <h2>Sauces {sauces.length}/{QTY_SAUCES} - Veuillez choisir jusqu’à trois produits</h2>
      <div className='ingredients-container'>
        {availableSauces.map(sauce => (
          <div className='ingredient-container' onClick={() => editSauces(sauce)}>
            <img src={defaultBasketSrc} className={sauces.map(s => s.id).includes(sauce.id) ? 'selected' : ''} />
            <p>{sauce.label}</p>
          </div>
        ))}
      </div>

      <button className='next-button' onClick={() => nextStep({ sauces })}>Suivant</button>
    </div>
  );
};

const Step4 = ({ basketParts }) => {
  const [supps, setSupps] = useState([]);
  const [qty, setQty] = useState(1);
  const [basket, setBasket] = useState({ ...basketParts });
  const [isDone, setIsDone] = useState(false);

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
      let cart = JSON.parse(window.localStorage.getItem('cart'));

      setBasket({ ...basket, supps });

      if (!cart) {
        cart = [];
      }

      for (let i=0; i<qty; i++) {
        cart.push(basket);
      }

      setIsDone(true);

      window.localStorage.setItem('cart', JSON.stringify(cart));
      // @TODO: emit event to update basket icon
    }
  };

  return (
    <div>
      <h2>Suppléments (+ 1,5€)</h2>
      <div className='ingredients-container'>
        {availableSupps.map(supp => (
          <div className='ingredient-container' onClick={() => editSupps(supp)}>
            <img src={defaultBasketSrc} className={supps.map(s => s.id).includes(supp.id) ? 'selected' : ''} />
            <p>{supp.label}</p>
          </div>
        ))}
      </div>

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
  );
};



const CustomBasketToOrder = () => {
  const [step, setStep] = useState(1);
  const [basket, setBasket] = useState({});

  const nextStep = (currentBasket) => {
    const newBasket = { ...basket, ...currentBasket };
    setBasket({ ...newBasket });
    setStep(step + 1);
  };

  return (
    <section id='custom-basket-to-order'>
      <Container>
        <Row>
          <Col md='4'>
            <div className='basket-img-container'>
              <img src={defaultBasketSrc} alt='panier myfa' />
              <p>Photo non contractuelle</p>
            </div>
          </Col>
          <Col md='8'>
            <h1>Panier MYFA 🙌🏾</h1>

            <h2>
              <span className='regular-price'>27.99€</span>
              <span className='new-price'>25.99€</span>
              <span className='reduction'>-7%</span>
            </h2>

            <p className='description'>
              Avec ce panier, on vous laisse faire la composition qui convient le mieux à vos proches.
              Vous pouvez y mettre un peu de chaque panier et bien plus encore !
            </p>

            {step === 1 ? <Step1 nextStep={nextStep} />: null}
            {step === 2 ? <Step2 nextStep={nextStep} />: null}
            {step === 3 ? <Step3 nextStep={nextStep} />: null}
            {step === 4 ? <Step4 basket={basket} />: null}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CustomBasketToOrder;
