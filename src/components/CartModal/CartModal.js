import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { FaCheck } from 'react-icons/fa';
import useTranslate from '../../hooks/useTranslate';

import './CartModal.scss';

const CartModal = ({ showCartModal, toggleCartModal, basket, onContinue }) => {
  const cart = JSON.parse(window.localStorage.getItem('cart'));
  const cartTotal = cart.reduce((acc, curr) => curr.price ? acc + curr.price : acc, 0);
  const qty = cart.filter(b => b.type === basket.type).length;
  const [t] = useTranslate();

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
        <Row>
          <Col md='6'>
            <Row>
              <Col md='6'>
                <img src={basket.img} alt={basket.imgAlt} />
              </Col>
              <Col md='6'>
                <h1>{t(basket.labelTranslate)}</h1>
                <p><b>{t('home_page.baskets.cart_modal.price')} :</b> {basket.price.toFixed(2)} €</p>
                <p><b>{t('home_page.baskets.cart_modal.qty')} :</b> {qty}</p>
              </Col>
            </Row>
          </Col>
          <Col md='6'>
            <p>{t('home_page.baskets.cart_modal.baskets_nb_part_1')} {cart.length} {t('home_page.baskets.cart_modal.baskets_nb_part_2')}</p>
            <p><b>{t('home_page.baskets.cart_modal.baskets_total')} :</b> {cartTotal.toFixed(2)} €</p>
            <p><b>{t('home_page.baskets.cart_modal.delivery')} :</b> {t('home_page.baskets.cart_modal.free')}</p>
            <p><b>{t('home_page.baskets.cart_modal.total')} :</b> {cartTotal.toFixed(2)} €</p>

            <button className='continue-button' onClick={() => goTo('/#baskets')}>
              {t('home_page.baskets.cart_modal.continue_button')}
            </button>
            <button className='checkout-button' onClick={() => goTo('/cart')}>
              {t('home_page.baskets.cart_modal.pay_button')}
            </button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default CartModal;
