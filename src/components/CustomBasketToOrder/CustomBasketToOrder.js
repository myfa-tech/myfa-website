import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FaCheck } from 'react-icons/fa'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

import CartModal from '../CartModal';

import {
  availableBases,
  availableFruits,
  availableSauces,
  availableSupps,
  availableVeggies,
  customBasketDetails,
} from '../../assets/customBasket';
import EventEmitter from '../../services/EventEmitter';

import './CustomBasketToOrder.scss';

import defaultBasketSrc from '../../images/default-basket.png';

const QTY_MAX = 5;
const QTY_BASES = 1;
const QTY_FRUITS = 3;
const QTY_VEGGIES = 3;
const QTY_SAUCES = 3;
const SUPP_PRICE = 1.5;

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

      <button className='next-button' onClick={() => nextStep({ bases, fruits, supps })}>Suivant</button>
    </div>
  );
};

const Step2 = ({ basketParts, nextStep }) => {
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

      <button className='next-button' onClick={() => nextStep({ veggies, supps })}>Suivant</button>
    </div>
  );
};

const Step3 = ({ basketParts, nextStep }) => {
  const [sauces, setSauces] = useState([]);
  const [supps, setSupps] = useState([]);

  useEffect(() => {
    if (basketParts['sauces']) {
      setSauces(basketParts['sauces']);
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
      <h2>Sauces {(sauces.length + supps.filter(s => s.type === 'sauces').length)}/{QTY_SAUCES} - Veuillez choisir jusqu’à trois produits</h2>
      <div className='ingredients-container'>
        {availableSauces.map(sauce => (
          <div key={sauce.id} className='ingredient-container' onClick={() => editSauces(sauce)}>
            <img src={sauce.img || defaultBasketSrc} className={(sauces.map(s => s.id).includes(sauce.id) || supps.map(s => s.id).includes(sauce.id)) ? 'selected' : ''} />
            <p>
              {sauce.label}
              {(sauces.length >= QTY_SAUCES && !sauces.map(s => s.id).includes(sauce.id)) ?
                <span className='supp-prices'>+1,5 €</span> : null
              }
            </p>
          </div>
        ))}
      </div>

      <button className='next-button' onClick={() => nextStep({ sauces, supps })}>Suivant</button>
    </div>
  );
};

const Step4 = ({ basketParts }) => {
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

const CustomBasketToOrder = () => {
  const [step, setStep] = useState(1);
  const [basket, setBasket] = useState({ supps: [] });

  const nextStep = (currentBasket) => {
    if (!!currentBasket.supps.length) {
      currentBasket.supps = [...currentBasket.supps, ...basket.supps];
    }

    const newBasket = { ...basket, ...currentBasket };
    setBasket({ ...newBasket });
    setStep(step + 1);

    window.scrollTo(0, 0);
  };

  return (
    <section id='custom-basket-to-order'>
      <Container>
        <Row>
          <Col md='4'>
            <div className='basket-img-container'>
              <img src={customBasketDetails.img} alt={customBasketDetails.imgAlt} />
              <p>Photo non contractuelle</p>
            </div>
          </Col>
          <Col md='8'>
            <h1>{customBasketDetails.label}</h1>

            <h2>
              <span className='regular-price'>{customBasketDetails.realPrice}€</span>
              <span className='new-price'>{customBasketDetails.price}€</span>
              <span className='reduction'>-{customBasketDetails.reduction}%</span>
            </h2>

            <p className='description'>
              {customBasketDetails.description}
            </p>

            {step === 1 ? <Step1 basketParts={basket} nextStep={nextStep} />: null}
            {step === 2 ? <Step2 basketParts={basket} nextStep={nextStep} />: null}
            {step === 3 ? <Step3 basketParts={basket} nextStep={nextStep} />: null}
            {step === 4 ? <Step4 basketParts={basket} />: null}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CustomBasketToOrder;
