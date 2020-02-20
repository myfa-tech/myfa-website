import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'

import './Orders.scss'
import getQueryParam from '../../utils/getQueryParam'
import { getOrdersByRef } from '../../services/orders'

const Orders = () => {
  const [isLoading, setIsLoading] = useState(true);
  const  [isRef, setIsRef] = useState(false);
  const basketRef = getQueryParam('ref');

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

  useEffect(() => {
    checkRef();
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
