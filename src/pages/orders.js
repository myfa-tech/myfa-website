import React from 'react'

import SEO from '../components/seo'
import Layout from '../components/layout'
import Orders from '../components/Orders'
import useTranslate from '../hooks/useTranslate';

const OrdersPage = () => {
  const [t] = useTranslate();

  return (
    <Layout>
      <SEO title={t('orders.seo_title')} />
      <Orders />
    </Layout>
  );
};

export default OrdersPage;
