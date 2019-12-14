import React from 'react'

import SEO from '../components/seo'
import Layout from '../components/layout'
import Orders from '../components/Orders'

const OrdersPage = () => (
  <Layout>
    <SEO title='Commande' />
    <Orders />
  </Layout>
)

export default OrdersPage
