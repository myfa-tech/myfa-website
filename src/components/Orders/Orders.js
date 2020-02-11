import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import baskets from '../../assets/baskets'

import './Orders.scss'
import getQueryParam from '../../utils/getQueryParam'
import { getOrdersByRef } from '../../services/orders'

const Orders = () => {
  const [isLoading, setIsLoading] = useState(true);
  const  [isRef, setIsRef] = useState(false);
  const basketType = getQueryParam('type');
  const basketRef = getQueryParam('ref');
  const otherBaskets = baskets.filter(b => (b.type !== basketType));

  const checkRef = async () => {
    try {
      await getOrdersByRef(basketRef);
      setIsRef(true);
    } catch (e) {
      setIsRef(false);
      if (typeof window !== 'undefined') {
        window.location.assign('/404');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const goToBasketPage = (type) => {
    if (typeof window !== 'undefined') {
			window.location.assign(`/baskets?type=${type}`);
		}
  }

  const emptyCart = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('cart');
    }
  };

  useEffect(() => {
    checkRef();
    emptyCart()
  }, []);

  return isRef && !isLoading ? (
    <section id='orders'>
      <Container>
        <h1>Merci de votre commande 🎉</h1>

        <p>Pour suivre l’avancement de votre commande, cliquez <a href='/profile/orders'>ici</a>.</p>
      </Container>
    </section>
  ) : null
}

export default Orders
