import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { FaCheck } from 'react-icons/fa';

import './CartModal.scss';

const CartModal = ({ showCartModal, toggleCartModal, basket }) => {
  const cart = JSON.parse(window.localStorage.getItem('cart'));
  const cartTotal = cart.reduce((acc, curr) => curr.price ? acc + curr.price : acc, 0);
  const qty = cart.filter(b => b.type === basket.type).length;

  const goTo = (redirect) => {
    if (typeof window !== 'undefined') {
      window.location.assign(redirect);
    }
  };

  return (
    <Modal dialogClassName='modal-90w modal-75w' show={showCartModal} onHide={toggleCartModal} id='cart-modal'>
      <Modal.Header closeButton className='header-text'><FaCheck /> Ajouté aux achats avec succès</Modal.Header>
      <Modal.Body>
        <Row>
          <Col md='6'>
            <Row>
              <Col md='6'>
                <img src={basket.img} alt={basket.imgAlt} />
              </Col>
              <Col md='6'>
                <h1>{basket.label}</h1>
                <p><b>Prix :</b> {basket.price} €</p>
                <p><b>Quantité :</b> {qty}</p>
              </Col>
            </Row>
          </Col>
          <Col md='6'>
            <p>Vous avez {cart.length} paniers en attente.</p>
            <p><b>Total paniers :</b> {cartTotal.toFixed(2)} €</p>
            <p><b>Livraison :</b> gratuite</p>
            <p><b>Total :</b> {cartTotal.toFixed(2)} €</p>

            <button className='continue-button' onClick={() => goTo('/#baskets')}>Continuer</button>
            <button className='checkout-button' onClick={() => goTo('/cart')}>Payer</button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default CartModal;
