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

  useEffect(() => {
    checkRef();
  }, []);

  return isRef && !isLoading ? (
    <section id='orders'>
      <Container>
        <h1>Merci de votre commande 🎉</h1>

        <p>Pour suivre l’avancement de votre commande, cliquez <a href='/profile'>ici</a>.</p>

        <h2>Découvrez nos autres paniers</h2>

        <Row className='other-baskets-row'>
          {otherBaskets.map(otherBasket => (
            <Col key={otherBasket.type} xs={Math.floor(12 / otherBaskets.length)}>
              <div className='basket-card' onClick={() => goToBasketPage(otherBasket.type)}>
                <img src={otherBasket.img} />
                <h3>{otherBasket.label}</h3>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  ) : null
}

export default Orders
