import React from 'react';

import SEO from '../components/seo';
import Layout from '../components/layout';
import Cart from '../components/Cart';

const CartPage = () => (
  <Layout noBackgroundColor={true} className='cart-background'>
    <SEO title='Panier' />
    <Cart />
  </Layout>
);

export default CartPage;
