import React from 'react'

import SEO from '../components/seo'
import Layout from '../components/layout'
import RamadanBasketToOrder from '../components/RamadanBasketToOrder'

const OrdersPage = () => (
  <Layout>
    <SEO title='Panier' />
    <RamadanBasketToOrder />
  </Layout>
)

export default OrdersPage;
