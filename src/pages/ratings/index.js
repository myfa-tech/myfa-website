import React, { useState } from 'react';

import SEO from '../../components/seo';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import RatingsList from './RatingsList';
import RatingModal from './RatingModal';

import useTranslate from '../../hooks/useTranslate';
import EventEmitter from '../../services/EventEmitter';
import UserStorage from '../../services/UserStorage';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './ratings.scss';
import { saveRating } from '../../services/ratings';

const RatingsPage = () => {
  const [t] = useTranslate();
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
          <h2>{t('ratings.title')}</h2>

          <h3 className='description'>
            {t('ratings.introduction')}
          </h3>
        </div>



        <div className='button-container'>
          {!!user ?
            <Button label={t('ratings.button_label')} className='rating-button' onClick={giveRating} /> :
            <Button label={t('ratings.login_button')} className='rating-button' onClick={() => eventEmitter.emit('showLogin')} />
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
