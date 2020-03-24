import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'

import './Orders.scss'
import getQueryParam from '../../utils/getQueryParam'
import { getOrdersByRef } from '../../services/orders'
import useTranslate from '../../hooks/useTranslate'

const Orders = () => {
  const [isLoading, setIsLoading] = useState(true);
  const  [isRef, setIsRef] = useState(false);
  const basketRef = getQueryParam('ref');
  const [t, locale] = useTranslate();

  const checkRef = async () => {
    try {
      await getOrdersByRef(basketRef);
      setIsRef(true);
    } catch (e) {
      setIsRef(false);
      if (typeof window !== 'undefined') {
        window.location.assign(`/${locale}/404`);
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
        <h1>{t('orders.title')} 🎉</h1>

        <p>{t('orders.description_part_1')} <a href={`/${locale}/profile/orders`}>{t('orders.here')}</a>.</p>
      </Container>
    </section>
  ) : null;
};

export default Orders;
