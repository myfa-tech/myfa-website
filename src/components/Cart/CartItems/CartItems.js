import React from 'react';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { FaRegTrashAlt } from 'react-icons/fa';
import { Row, Col } from 'react-bootstrap';

import useTranslate from '../../../hooks/useTranslate';
import basketsImgs from '../../../assets/basketsImgs';

import './CartItems.scss';

const CartItems = ({ basketsPrice, cart, handleChangeRecipient, errors, removeBasket, user }) => {
  const [t] = useTranslate();

  const recipients = !!user ? user.recipients : [];

  return (
    <div className='my-cart-container'>
      <h2>{t('cart.items.title')}</h2>

      <Divider variant='middle' />

      <ul className='baskets-container'>
        {cart.baskets.map((basket, index) => (
            <li key={index}>
              <Row>
                <Col xs={0} sm={2} className='image-container d-none d-sm-block'>
                  <img src={basketsImgs[basket.type]} />
                </Col>
                <Col xs={3} sm={3} className='label-container'>
                  <h3>{t(`home_page.baskets.${basket.type}_basket_title`)}</h3>
                  <p>{basket.price.toFixed(2)} €</p>
                </Col>
                <Col xs={8} sm={6}>
                  <TextField
                    select
                    label={t('cart.items.recipient')}
                    required
                    name={`recipient-${index}`}
                    error={errors.findIndex(err => err === `recipient-${index}`) >= 0}
                    variant='outlined'
                    placeholder={t('cart.items.recipient_placeholder')}
                    value={basket.recipient ? JSON.stringify(basket.recipient) : null}
                    className='full-width form-input'
                    onChange={(e) => handleChangeRecipient(e, index)}
                  >
                    {recipients.map((recipient, recipientIndex) => (
                      <MenuItem key={recipientIndex} value={JSON.stringify(recipient)}>{`${recipient.firstname} ${recipient.lastname}`}</MenuItem>
                    ))}
                    <MenuItem value='add-one'>Ajouter un destinataire</MenuItem>
                  </TextField>
                </Col>
                <Col xs={1} className='qty-container'>
                  <div className='trash-container'>
                    <FaRegTrashAlt className='trash-icon' onClick={() => removeBasket(index)} />
                  </div>
                </Col>
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
