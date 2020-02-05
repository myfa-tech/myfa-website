import React from 'react'

import SEO from '../components/seo'
import Layout from '../components/layout'
import CustomBasketToOrder from '../components/CustomBasketToOrder'

const CustomBasketPage = () => (
  <Layout>
    <SEO title='Panier MYFA' />
    <CustomBasketToOrder />
  </Layout>
);

export default CustomBasketPage
