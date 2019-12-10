import React from 'react'

import SEO from '../components/seo'
import Layout from '../components/layout'
import BasketToOrder from '../components/BasketToOrder'

const OrdersPage = () => (
  <Layout>
    <SEO title='Panier' />
    <BasketToOrder />
  </Layout>
)

export default OrdersPage
