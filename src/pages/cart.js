import React from 'react';

import SEO from '../components/seo';
import Layout from '../components/layout';
import Cart from '../components/Cart';

import headerBackground from '../images/profile-cart-bg.jpg';
import useTranslate from '../hooks/useTranslate';

const CartPage = () => {
  const [t] = useTranslate();

  return (
    <Layout
      className='cart-background'
      headerBackground={headerBackground}
      headerBackgroundPosition='center center'
      stickyHeaderBackgroundPosition='center center'
      headerDescription={t('cart.description')}
    >
      <SEO title='Panier' />
      <Cart />
    </Layout>
  );
};

export default CartPage;
