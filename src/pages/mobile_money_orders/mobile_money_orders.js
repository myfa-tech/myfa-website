import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

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
  const [baskets, setBaskets] = useState();
  const [isRef, setIsRef] = useState(false);
  const [euroToBePaid, setEuroToBePaid] = useState(0);
  const [cfaToBePaid, setCfaToBePaid] = useState(0);

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
    const asyncFunc = async () => {
      await checkRef();

      const ref = window.location.search.substr(5);
      const { baskets: fetchedBaskets } = await getOrdersByRef(ref);

      const euros = fetchedBaskets.reduce((acc, cur) => acc + cur.price, 0);
      const cfas = fetchedBaskets.reduce((acc, cur) => acc + cur.priceCFA, 0);

      setBaskets(fetchedBaskets);
      setEuroToBePaid(euros);
      setCfaToBePaid(cfas);
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

            <p>{t('orders.description_part_1')} <a href='/profile/orders'>{t('orders.here')}</a>.</p>

            <p><b>Reste à payer : {euroToBePaid} € ou {cfaToBePaid} Fcfa</b></p>

            <p>Votre commande sera validée une fois le paiement effectué :</p>

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
