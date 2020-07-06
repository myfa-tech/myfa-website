import React, { useState, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import { FaRegTrashAlt } from 'react-icons/fa';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import useTranslate from '../../../hooks/useTranslate';
import basketsImgs from '../../../assets/basketsImgs';
import UserStorage from '../../../services/UserStorage';

import './CartItems.scss';

const CartItems = ({ basketsPrice, cart, handleChangeRecipient, errors, removeBasket }) => {
  const [t] = useTranslate();
  const [recipients, setRecipients] = useState([]);
  const [showContents, setShowContents] = useState([]);

  useEffect(() => {
    const user = UserStorage.getUser();

    if (!!user && !!user.recipients) {
      setRecipients(user.recipients);
    }

    if (!!cart.baskets) {
      cart.baskets.forEach((b) => {
        showContents.push(false);
      });
      setShowContents(showContents);
    }
  }, []);

  const deleteBasket = (index) => {
    showContents.splice(index, 1);
    setShowContents([...showContents]);
    removeBasket(index);
  };

  const toggleShowBasketContent = (index) => {
    showContents[index] = !showContents[index];
    setShowContents([...showContents]);
  };

  return (
    <div className='my-cart-container'>
      <h2>{t('cart.items.title')}</h2>

      <Divider variant='middle' />

      <ul className='baskets-container'>
        {cart.baskets.map((basket, index) => (
            <li key={index} className={showContents[index] ? 'show-content' : ''}>
              <Row>
                <Col xs={2} className='image-container'>
                  <img src={basketsImgs[basket.type]} />
                </Col>
                <Col xs={10} className='info-container'>
                  <Row>
                    <Col lg={4} className='label-container'>
                      <h3>{t(`home_page.baskets.${basket.type}_basket_title`)}</h3>
                      <p>{basket.price.toFixed(2)} €</p>
                    </Col>
                    <Col xs={7} lg={5} className='recipient-choice-container'>
                      <TextField
                        select
                        label={t('cart.items.recipient')}
                        required
                        SelectProps={{
                          native: true,
                        }}
                        name={`recipient-${index}`}
                        error={errors.findIndex(err => err === `recipient-${index}`) >= 0}
                        variant='outlined'
                        placeholder={t('cart.items.recipient_placeholder')}
                        value={basket.recipient ? JSON.stringify(basket.recipient) : null}
                        className='full-width form-input'
                        onChange={(e) => handleChangeRecipient(e, index)}
                      >
                        {recipients.map((recipient, recipientIndex) => (
                          <option key={recipientIndex} value={JSON.stringify(recipient)}>{`${recipient.firstname} ${recipient.lastname}`}</option>
                        ))}
                        <option value='add-one'>Destinataire</option>
                      </TextField>
                    </Col>
                    <Col xs={2} lg={1} className='qty-container'>
                      <div className='trash-container'>
                        <FaRegTrashAlt className='trash-icon' onClick={() => deleteBasket(index)} />
                      </div>
                    </Col>
                    <Col xs={3} lg={2} className='enlarge-container'>
                      <p onClick={() => toggleShowBasketContent(index)}>{showContents[index] ? 'Cacher' : 'Afficher'}</p>
                      <p onClick={() => toggleShowBasketContent(index)}>le contenu</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <div className='basket-content-container'>
                Ce panier contient :
                <ul>
                  {basket.items.map ?
                    basket.items.map((it, itIndex) => (
                      <li key={itIndex}>{it}</li>
                    )) :
                    <>
                      {basket.items.bases.map(it => (
                        <li>{it.label}</li>
                      ))}
                      {basket.items.fruits.map(it => (
                        <li>{it.label}</li>
                      ))}
                      {basket.items.veggies.map(it => (
                        <li>{it.label}</li>
                      ))}
                      {basket.items.sauces.map(it => (
                        <li>{it.label}</li>
                      ))}
                      {basket.items.supps.map(it => (
                        <li>{it.label}</li>
                      ))}
                    </>
                  }
                </ul>
              </div>
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
