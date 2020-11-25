import React, { useState } from 'react';

import SEO from '../../components/seo';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import RatingsList from './RatingsList';
import RatingModal from './RatingModal';

import EventEmitter from '../../services/EventEmitter';
import UserStorage from '../../services/UserStorage';
import { saveRating } from '../../services/ratings';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './ratings.scss';

const RatingsPage = () => {
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const user = UserStorage.getUser();
  const eventEmitter = new EventEmitter();

  const giveRating  = () => {
    if (!user) {
      eventEmitter.emit('showLogin');
    } else {
      toggleRatingModal();
    }
  };

  const toggleRatingModal = () => setShowRatingModal(!showRatingModal);

  const submitRating = async (form) => {
    form.user = { firstname: user.firstname, lastname: user.lastname };

    setIsLoading(true);
    await saveRating(form);
    setIsLoading(false);
    toggleRatingModal();
  };

  return (
    <Layout className='ratings' color='green'>
      <SEO title='Avis' />

      <div id='ratings'>
        <div className='title-container'>
          <h2>Avis des clients</h2>

          <h3 className='description'>
            Bien plus qu’une notation accompagnée d’un commentaire, tous vos avis comptent. Ils nous permettent de nous remettre en question afin de vous proposer un service se rapprochant le plus de vos désirs.
          </h3>
        </div>

        <div className='button-container'>
          {!!user ?
            <Button label='Donner mon avis' className='rating-button' onClick={giveRating} /> :
            <Button label='Connectez-vous' className='rating-button' href='/login?pagefrom=ratings' />
          }
        </div>

        <RatingsList className='ratings-list' />
      </div>

      <RatingModal
        showModal={showRatingModal}
        toggleModal={toggleRatingModal}
        submitRating={submitRating}
        isLoading={isLoading}
      />
    </Layout>
  );
};

export default RatingsPage;
