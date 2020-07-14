import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Modal from 'react-bootstrap/Modal';
import { FaStar } from 'react-icons/fa';

import ButtonWithLoader from '../../../components/ButtonWithLoader';

import useTranslate from '../../../hooks/useTranslate';

import './RatingModal.scss';

const RatingModal = ({ showModal, toggleModal, submitRating, isLoading }) => {
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    rating: 5,
    subject: '',
    comment: '',
  });

  const [t] = useTranslate();

  const emptyStars = [1, 2, 3, 4, 5];

  const handleChange = (e) => {
    const { name, value } = e.target;
    errors[name] = false;

    setForm({ ...form, [name]: value });
    setErrors({ ...errors });
  };

  const send = async (e) => {
    e.preventDefault();

    let { rating: formRating, subject, comment } = form;

    if (formRating === 0) {
      errors['rating'] = true;
    }
    if (subject === '' || !subject) {
      errors['subject'] = true;
    }
    if (comment === '' || !comment) {
      errors['comment'] = true;
    }

    // We need to check there is no truthful value
    if (Object.values(errors).filter(v => !!v).length === 0) {
      await submitRating(form);
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    } else {
      setErrors({ ...errors });
    }
  };

  return (
    <Modal dialogClassName='modal-90w modal-75w' show={showModal} onHide={toggleModal} id='rating-modal'>
      <Modal.Header closeButton className='header-text' />
      <Modal.Body>
        <form onSubmit={send}>
          <h2>{t('rating_modal.your_review')}</h2>

          <div className='stars'>
            {emptyStars.map((star, index) => (
              <FaStar
                key={`empty-star-${index}`}
                className={`star ${(rating >= star) ? 'yellow' : 'grey'}`}
                onPointerOver={() => setRating(star)}
                onPointerLeave={() => setRating(form.rating)}
                onClick={() => setForm({ ...form, rating: star })}
              />
            ))}
          </div>

          <h2>{t('rating_modal.subject')}</h2>

          <TextField
            type='text'
            className='full-width form-input'
            variant='outlined'
            error={errors.subject}
            label='Sujet'
            name='subject'
            value={form.subject}
            onChange={handleChange}
          />

            <h2>{t('rating_modal.your_message')}</h2>

          <TextField
            type='text'
            className='full-width form-input big-form-input'
            variant='outlined'
            error={errors.comment}
            multiline
            label='Message'
            name='comment'
            value={form.comment}
            onChange={handleChange}
          />

          <ButtonWithLoader
            isLoading={isLoading}
            className='send-form-button'
            label={t('rating_modal.button_label')}
            onClick={send}
          />
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default RatingModal;
