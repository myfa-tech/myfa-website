import React, { useState } from 'react';

import SEO from '../../components/seo';
import Layout from '../../components/layout';
import SectionTitle from '../../components/SectionTitle';
import Button from '../../components/Button';
import ThanksSection from './ThanksSection';
import RatingsList from './RatingsList';
import RatingModal from './RatingModal';

import headerBackground from '../../images/ratings-bg.jpg';
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
    <Layout
      className='ratings'
      headerBackground={headerBackground}
      headerBackgroundPosition='center center'
      headerDescription={t('ratings.description')}
    >
      <SEO title='Avis' />

      <div id='ratings'>
        <SectionTitle
          title={t('ratings.title')}
          mobileTitle={t('ratings.title')}
          secondary={{ text: 'Accueil', link: '/' }}
        />

        <p className='description'>
          {t('ratings.introduction')}
        </p>

        <div className='button-container'>
          {!!user ?
            <Button label={t('ratings.button_label')} className='rating-button' onClick={giveRating} /> :
            <Button label={t('ratings.login_button')} className='rating-button' onClick={() => eventEmitter.emit('showLogin')} />
          }
        </div>

        <RatingsList className='ratings-list' />

        <ThanksSection />
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
