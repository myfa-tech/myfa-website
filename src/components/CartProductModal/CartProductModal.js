import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import { FaCheck } from 'react-icons/fa';

import Button from '../Button';

import useTranslate from '../../hooks/useTranslate';
import CartStorage from '../../services/CartStorage';
import getProductDetailsImage from '../../utils/getProductDetailsImage';

import './CartProductModal.scss';

const CartProductModal = ({ showCartProductModal, toggleCartProductModal, product, onContinue }) => {
  const [cart, setCart] = useState(null);
  const [cartTotal, setCartTotal] = useState(0);
  const [qty, setQty] = useState(0);
  const [allProductsQty, setAllProductsQty] = useState(0);
  const [t, locale] = useTranslate();

  useEffect(() => {
    const asyncFunc = async () => {
      let fetchedCart = await CartStorage.getCartFromStorage();

      let fetchedCartBasketsTotal = fetchedCart.baskets.reduce((acc, curr) => curr.price ? acc + curr.price : acc, 0);
      let fetchedCartProductsTotal = fetchedCart.products.items.reduce((acc, curr) => curr.price ? acc + curr.price : acc, 0);
      let fetchedCartTotal = fetchedCartBasketsTotal + fetchedCartProductsTotal;
      let fetchedQty = fetchedCart.products.items.find(p => p.name === product.name).qty;
      let fetchedAllProductsQty = fetchedCart.products.items.reduce((acc, curr) => curr.qty ? acc + curr.qty : acc, 0);

      setCart(fetchedCart);
      setCartTotal(fetchedCartTotal);
      setQty(fetchedQty);
      setAllProductsQty(fetchedAllProductsQty);
    };

    asyncFunc();
  }, []);

  const goTo = (redirect) => {
    if (!!onContinue) {
      onContinue();
    } else if (typeof window !== 'undefined') {
      toggleCartProductModal();
      window.location.assign(redirect);
    }
  };

  return (
    <Modal dialogClassName='modal-90w modal-75w' show={showCartProductModal} onHide={toggleCartProductModal} id='cart-product-modal'>
      <Modal.Header closeButton className='header-text'><FaCheck /> {t('home_page.products.cart_product_modal.header')}</Modal.Header>
      <Modal.Body>
        {cart && cartTotal && qty && <Row>
          <Col md='6'>
            <Row>
              <Col md='6'>
                <img src={getProductDetailsImage(product.name)} alt={product.imgAlt} />
              </Col>
              <Col md='6'>
                <h1>{t(product.labelTranslate)}</h1>
                <p><b>{t('home_page.products.cart_product_modal.price')} :</b> {product.price.toFixed(2)} €</p>
                <p><b>{t('home_page.products.cart_product_modal.qty')} :</b> {qty}</p>
              </Col>
            </Row>
          </Col>
          <Col md='6'>
            <p>{t('home_page.products.cart_product_modal.products_nb_part_1')} {allProductsQty} {t('home_page.products.cart_product_modal.products_nb_part_2')}</p>
            <p><b>{t('home_page.products.cart_product_modal.delivery')} :</b> {t('home_page.products.cart_product_modal.free')}</p>
            <p><b>{t('home_page.products.cart_product_modal.total')} :</b> {cartTotal.toFixed(2)} €</p>

            <Button label={t('home_page.products.cart_product_modal.continue_button')} secondary onClick={toggleCartProductModal} />
            <Button label={t('home_page.products.cart_product_modal.pay_button')} className='pay-button' onClick={() => goTo('/cart')} />
          </Col>
        </Row>}
      </Modal.Body>
    </Modal>
  );
};

export default CartProductModal;
