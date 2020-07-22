import React from 'react';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

import './MessagesToRelative.scss';
import useTranslate from '../../../hooks/useTranslate';
import get from '../../../utils/get';

const MessagesToRelative = ({ cart, className, handleChangeMessage }) => {
  const [t] = useTranslate();

  return (
    <div className={`${className ? className : ''}`} id='message-to-relative'>
      <h2>{t('cart.message_to_relative_title')}</h2>

      <Divider variant='middle' />

      <form className='message-form' noValidate>
        {cart.baskets.map((basket, basketIndex) => (
          <div className='basket-message-container'>
            <h3>Message pour {basket.recipient.firstname}</h3>

            <TextField
              className='full-width form-input'
              variant='outlined'
              label='Message'
              multiline
              fullWidth
              name='message'
              value={basket.message !== ' ' ? basket.message : ''}
              onChange={(e) => handleChangeMessage(e.target.value, basketIndex)}
            />
          </div>
        ))}
        {get(cart, 'products.recipient') ?
          <div className='basket-message-container'>
            <h3>Message pour {cart.products.recipient.firstname}</h3>

            <TextField
              className='full-width form-input'
              variant='outlined'
              label='Message'
              multiline
              fullWidth
              name='message'
              value={cart.products.message !== ' ' ? cart.products.message : ''}
              onChange={(e) => handleChangeMessage(e.target.value, 'details')}
            />
          </div> : null
        }
      </form>
    </div>
  );
};

export default MessagesToRelative;
