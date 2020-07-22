import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import { FaCheck } from 'react-icons/fa';

import Button from '../Button';

import useTranslate from '../../hooks/useTranslate';
import CartStorage from '../../services/CartStorage';
import getBasketImage from '../../utils/getBasketImage';

import './CartModal.scss';

const CartModal = ({ showCartModal, toggleCartModal, basket, onContinue }) => {
  const [cart, setCart] = useState(null);
  const [cartTotal, setCartTotal] = useState(0);
  const [qty, setQty] = useState(0);
  const [t, locale] = useTranslate();

  useEffect(() => {
    const asyncFunc = async () => {
      let fetchedCart = await CartStorage.getCartFromStorage();

      let fetchedCartBasketsTotal = fetchedCart.baskets.reduce((acc, curr) => curr.price ? acc + curr.price : acc, 0);
      let fetchedCartProductsTotal = fetchedCart.products.items.reduce((acc, curr) => curr.price ? acc + curr.price : acc, 0);
      let fetchedCartTotal = fetchedCartBasketsTotal + fetchedCartProductsTotal;
      let fetchedQty = fetchedCart.baskets.filter(b => b.type === basket.type).length;

      setCart(fetchedCart);
      setCartTotal(fetchedCartTotal);
      setQty(fetchedQty);
    };

    asyncFunc();
  }, []);

  const goTo = (redirect) => {
    if (!!onContinue) {
      onContinue();
    } else if (typeof window !== 'undefined') {
      toggleCartModal();
      window.location.assign(redirect);
    }
  };

  return (
    <Modal dialogClassName='modal-90w modal-75w' show={showCartModal} onHide={toggleCartModal} id='cart-modal'>
      <Modal.Header closeButton className='header-text'><FaCheck /> {t('home_page.baskets.cart_modal.header')}</Modal.Header>
      <Modal.Body>
        {cart && cartTotal && qty && <Row>
          <Col md='6'>
            <Row>
              <Col md='6'>
                <img src={getBasketImage(basket.type)} alt={basket.imgAlt} />
              </Col>
              <Col md='6'>
                <h1>{t(basket.labelTranslate)}</h1>
                <p><b>{t('home_page.baskets.cart_modal.price')} :</b> {basket.price.toFixed(2)} €</p>
                <p><b>{t('home_page.baskets.cart_modal.qty')} :</b> {qty}</p>
              </Col>
            </Row>
          </Col>
          <Col md='6'>
            <p>{t('home_page.baskets.cart_modal.baskets_nb_part_1')} {cart.baskets.length} {t('home_page.baskets.cart_modal.baskets_nb_part_2')}</p>
            <p><b>{t('home_page.baskets.cart_modal.delivery')} :</b> {t('home_page.baskets.cart_modal.free')}</p>
            <p><b>{t('home_page.baskets.cart_modal.total')} :</b> {cartTotal.toFixed(2)} €</p>

            <Button label={t('home_page.baskets.cart_modal.continue_button')} secondary onClick={toggleCartModal} />
            <Button label={t('home_page.baskets.cart_modal.pay_button')} className='pay-button' onClick={() => goTo('/cart')} />
          </Col>
        </Row>}
      </Modal.Body>
    </Modal>
  );
};

export default CartModal;
