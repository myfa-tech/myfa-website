import React from 'react';
import Divider from '@material-ui/core/Divider';
import { FaRegTrashAlt } from 'react-icons/fa';
import { Row, Col } from 'react-bootstrap';

import useTranslate from '../../../hooks/useTranslate';
import basketsImgs from '../../../assets/basketsImgs';

import './CartItems.scss';

const CartItems = ({ basketsPrice, cart, editItems, removeBaskets }) => {
  const [t] = useTranslate();

  return (
    <div className='my-cart-container'>
      <h2>{t('cart.items.title')}</h2>

      <Divider variant='middle' />

      <ul className='baskets-container'>
        {Object.keys(cart.baskets).map((basketKey, index) => (
            <li key={index}>
              <Row>
                <Col xs={0} sm={2} className='image-container d-none d-sm-block'>
                  <img src={basketsImgs[cart.baskets[basketKey].type]} />
                </Col>
                <Col xs={7} sm={6} className='label-container'>
                  <h3>{t(`home_page.baskets.${basketKey}_basket_title`)}</h3>
                  <p>{cart.baskets[basketKey].price.toFixed(2)} €</p>
                </Col>
                <Col xs={5} sm={4} className='qty-container'>
                  <div className='qty'>
                    <p>{t('cart.items.qty')}</p>
                    <p>
                      <button className='minus-button' onClick={() => editItems(cart.baskets[basketKey].type, -1)}>-</button>
                      <span>{cart.baskets[basketKey].qty}</span>
                      <button className='plus-button' onClick={() => editItems(cart.baskets[basketKey].type, 1)}>+</button>
                    </p>
                  </div>
                  <div className='trash-container'>
                    <FaRegTrashAlt className='trash-icon' onClick={() => removeBaskets(basketKey)} />
                  </div>
                </Col>
                <Col></Col>
              </Row>
            </li>
          ))}
      </ul>

      <div className='subtotal-container'>
        <p className='subtotal'>{t('cart.items.subtotal')} : {basketsPrice.toFixed(2)} €</p>
      </div>
    </div>
  );
};

export default CartItems;
