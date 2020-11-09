import React from 'react';
import Layout from '../../components/Layout';

import formCheckSrc from '../../images/form-check.png';

import twoPeopleSrc from '../../images/confirmation-2-people.png';
import singleGuySrc from '../../images/single-guy-email-confirmation.png';

import './email_confirmation.scss';

const EmailConfirmationPage = () => {
  return (
    <Layout color='light'>
      <div className='email-confirmation-page'>
        <img className='form-check-img' src={formCheckSrc} />

        <h2>Formulaire envoyé</h2>

        <p>Un email de confirmation a été envoyé à votre adresse email.</p>
        <p>Suivez les instructions fournies pour créer votre compte MYFA.</p>

        <img className='two-people-img' src={twoPeopleSrc} />
        <img className='single-guy-img' src={singleGuySrc} />
      </div>
    </Layout>
  );
};

export default EmailConfirmationPage;
