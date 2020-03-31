import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FaCheck } from 'react-icons/fa'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

import CartModal from '../CartModal';

import './BasketToOrder.scss';
import baskets from '../../assets/baskets';
import { customBasketDetails } from '../../assets/customBasket';
import getQueryParam from '../../utils/getQueryParam';
import EventEmitter from '../../services/EventEmitter';
import useTranslate from '../../hooks/useTranslate';

const QTY_MAX = 5;

const BasketToOrder = () => {
  const [qty, setQty] = useState(1);
  const [isDone, setIsDone] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [t] = useTranslate();

  const eventEmitter = new EventEmitter();
  const type = (typeof window !== 'undefined') ? getQueryParam('type') : '';
  const basket = baskets.find(b => b.type === type);
  const otherBaskets = basket ? [...baskets, customBasketDetails].filter(b => b.type !== basket.type) : [];

  const toggleCartModal = () => {
    setShowCartModal(!showCartModal);
  };

  const addToCart = () => {
    if (typeof window !== 'undefined') {
      let cart = JSON.parse(window.localStorage.getItem('cart'));

      if (!cart) {
        cart = [];
      }

      for (let i=0; i<qty; i++) {
        cart.push(basket);
      }

      setIsDone(true);

      window.localStorage.setItem('cart', JSON.stringify(cart));
      eventEmitter.emit('editCart');

      toggleCartModal();
    }
  };

  const updateQty = (adding) => {
    let newQty = qty + adding;

    if (newQty > 0 && newQty <= QTY_MAX) {
      setQty(newQty);
    }

    setIsDone(false);
  }

  const goToBasketPage = (type) => {
    if (typeof window !== 'undefined') {
      if (type === 'myfa') {
				window.location.assign('/custom-basket');
			} else {
        window.location.assign(`/baskets?type=${type}`);
      }
		}
  }

  return basket ? (
    <section id='basket-to-order'>
      <Container>
        <Row>
          <Col md='4'>
            <div className='basket-img-container'>
              <img src={basket.img} alt={basket.imgAlt} />
              <p>{t('basket_to_order.photo_disclaimer')}</p>
            </div>
          </Col>
          <Col md='8'>
            <h1>{t(basket.labelTranslate)}</h1>

            <h2>
              <span className='new-price'>{basket.price} €</span>
            </h2>

            <p className='description'>{t(basket.descriptionTranslate)}</p>

            <h3>{t('basket_to_order.basket_contains')}</h3>

            <ul>
              {basket.itemsTranslate.map(item => (
                <li>{t(`ingredients.${item}`)}</li>
              ))}
            </ul>

            <div className='qty-container'>
              <h4>{t('basket_to_order.qty')}</h4>

              <ButtonGroup className='qty-buttons' variant='contained' color='primary' aria-label='contained primary button group'>
                <Button className='qty-button' onClick={() => updateQty(-1)}>-</Button>
                <Button className='qty-display'>{qty}</Button>
                <Button className='qty-button' onClick={() => updateQty(1)}>+</Button>
              </ButtonGroup>

              {qty === QTY_MAX ? <p className='max-qty-msg'>{t('basket_to_order.max_qty_reached')}</p> : null}

              {isDone ?
                <span className='order-button isDone'>
                  <FaCheck color='#6c6' />
                </span> :
                <button type='button' className='order-button' onClick={addToCart}>{t('basket_to_order.add_to_cart')}</button>
              }
            </div>

            <h3>{t('basket_to_order.other_baskets')}</h3>

            <div className='other-baskets-row'>
              {otherBaskets.map(otherBasket => (
                <div key={otherBasket.type} className='basket-card' onClick={() => goToBasketPage(otherBasket.type)}>
                  <img src={otherBasket.img} />
                  <h3>{t(otherBasket.labelTranslate)}</h3>
                </div>
              ))}
            </div>
          </Col>
        </Row>

        {showCartModal &&
          <CartModal
            showCartModal={showCartModal}
            toggleCartModal={toggleCartModal}
            basket={basket}
          />
        }
      </Container>
    </section>
  ): null;
};

export default BasketToOrder;
