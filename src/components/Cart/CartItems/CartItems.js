import React, { useState, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import { FaRegTrashAlt } from 'react-icons/fa';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import useTranslate from '../../../hooks/useTranslate';
import getBasketImage from '../../../utils/getBasketImage';
import UserStorage from '../../../services/UserStorage';
import getProductDetailsImage from '../../../utils/getProductDetailsImage';

import './CartItems.scss';

const CartItems = ({ itemsPrice, cart, className, handleChangeRecipient, errors, removeBasket, removeProduct }) => {
  const [t] = useTranslate();
  const [recipients, setRecipients] = useState([]);
  const [showContents, setShowContents] = useState([]);
  const [detailsProductsPrice, setDetailsProductsPrice] = useState(0);

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

  useEffect(() => {
    let price = cart.products.items.map(p => p.price).reduce((acc, cur) => acc + cur, 0);
    setDetailsProductsPrice(price);
  }, [cart])

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
    <div className={`my-cart-container ${className ? className : ''}`}>
      <h2>{t('cart.items.title')}</h2>

      <Divider variant='middle' />

      <ul className='baskets-container'>
        {cart.baskets.map((basket, index) => (
            <li key={index} className={showContents[index] ? 'show-content' : ''}>
              <Row>
                <Col xs={2} className='image-container'>
                  <img src={getBasketImage(basket.type)} />
                </Col>
                <Col xs={10} className='info-container'>
                  <Row>
                    <Col lg={4} className='label-container'>
                      <h3>{t(`home_page.${basket.category}.${basket.type}_title`)}</h3>
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
                        <option value=''>Destinataire</option>
                        {recipients.map((recipient, recipientIndex) => (
                          <option key={recipientIndex} value={JSON.stringify(recipient)}>{`${recipient.firstname} ${recipient.lastname}`}</option>
                        ))}
                        <option value='add-one'>Nouveau destinataire</option>
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
                  {basket.itemsTranslate.map((it, itIndex) => (
                    <li key={itIndex}>{it.qty} x {t(`ingredients.${it.label}`)}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}

          {!!cart.products.items.length ? <div className='details-products-container'>
            <Row>
              <Col xs={3} className='details-label'>Produits au détails</Col>
              <Col xs={7} className='recipient-choice-container'>
                <TextField
                  select
                  label={t('cart.items.recipient')}
                  required
                  SelectProps={{
                    native: true,
                  }}
                  name={`recipient-details`}
                  error={errors.findIndex(err => err === `recipient-details`) >= 0}
                  variant='outlined'
                  placeholder={t('cart.items.recipient_placeholder')}
                  value={cart.products.recipient ? JSON.stringify(cart.products.recipient) : null}
                  className='full-width form-input'
                  onChange={(e) => handleChangeRecipient(e, 'details')}
                >
                  <option value=''>Destinataire</option>
                  {recipients.map((recipient, recipientIndex) => (
                    <option key={recipientIndex} value={JSON.stringify(recipient)}>{`${recipient.firstname} ${recipient.lastname}`}</option>
                  ))}
                  <option value='add-one'>Nouveau destinataire</option>
                </TextField>
              </Col>
              <Col xs={2} className='details-price'>Total : {detailsProductsPrice}€</Col>
            </Row>
            <ul>
              {cart.products.items.map((product, index) => (
                <li key={`product-${index}`}>
                  <Row>
                    <Col xs={2} className='image-container'>
                      <img src={getProductDetailsImage(product.image)} />
                    </Col>
                    <Col xs={8} className='label-container'>
                      <h3>{t(product.labelTranslate)} x {product.qty}</h3>
                      <p>{product.price.toFixed(2)} €</p>
                    </Col>
                    <Col xs={2} className='qty-container'>
                      <div className='trash-container'>
                        <FaRegTrashAlt className='trash-icon' onClick={() => removeProduct(index)} />
                      </div>
                    </Col>
                  </Row>
                </li>
              ))}
            </ul>
          </div> : null}
      </ul>

      <div className='subtotal-container'>
        <p className='subtotal'>{t('cart.items.subtotal')} : {itemsPrice.toFixed(2)} €</p>
      </div>
    </div>
  );
};

export default CartItems;
