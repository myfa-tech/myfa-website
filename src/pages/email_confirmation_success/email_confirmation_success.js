import React from 'react';
import Container from 'react-bootstrap/Container';

import SEO from '../../components/seo';
import Layout from '../../components/layout';

import './email_confirmation_success.scss';

const confirmEmailPage = () => {
  return (
    <Layout>
      <SEO title='Confirmation réussie' />

      <Container id='email-confirmation-success'>
        <h1>Merci d’avoir validé votre adresse email 🎉</h1>

        <p>Il sera plus facile pour nous de rentrer en contact avec vous.</p>

        <div className='buttons-container'>
          <a href='/#baskets'>Découvrir les paniers</a>
          <a href='/cart'>Voir mon panier</a>
        </div>
      </Container>
    </Layout>
  );
};

export default confirmEmailPage;
