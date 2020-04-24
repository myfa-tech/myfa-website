import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import SEO from '../../components/seo';
import Layout from '../../components/layout';
import useTranslate from '../../hooks/useTranslate';
import { getOrdersByRef } from '../../services/orders';
import getQueryParam from '../../utils/getQueryParam';

import orangeMomo from '../../images/orange-momo.jpg';
import mtnMomo from '../../images/mtn-momo.png';

import './mobile_money_orders.scss';

const OrdersPage = () => {
  const [t, locale] = useTranslate();
  const [isLoading, setIsLoading] = useState(true);
  const [basket, setBasket] = useState();
  const  [isRef, setIsRef] = useState(false);
  const basketRef = getQueryParam('ref');

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
    const asyncFunc = async () => {
      await checkRef();

      const ref = window.location.search.substr(5);
      const { basket: fetchedBasket } = await getOrdersByRef(ref);

      setBasket(fetchedBasket);
    };

    asyncFunc();
  }, []);

  return (
    <Layout>
      <SEO title={t('orders.seo_title')} />
      {isRef && !isLoading ? (
        <section id='mobile-money-orders'>
          <Container>
            <h1>{t('orders.title')} 🎉</h1>

            <p>{t('orders.description_part_1')} <a href={`/${locale}/profile/orders`}>{t('orders.here')}</a>.</p>

            <p><b>Votre commande sera validée une fois le paiement effectué :</b></p>

            <div className='payment-container'>
              <Row>
                <Col xs={3}>
                  <img src={orangeMomo}/>
                </Col>
                <Col className='phone-container' xs={9}>
                  <p>+225 48 75 42 57</p>
                </Col>
              </Row>
              <Row>
                <Col xs={3}>
                  <img src={mtnMomo}/>
                </Col>
                <Col className='phone-container' xs={9}>
                  <p>+225 95 14 11 96</p>
                </Col>
              </Row>
            </div>
          </Container>
        </section>
      ) : null}
    </Layout>
  );
};

export default OrdersPage;
