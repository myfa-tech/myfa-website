import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaStar } from 'react-icons/fa';

import useTranslate from '../../../hooks/useTranslate';
import { fetchRatings } from '../../../services/ratings';
import getFormattedDate from '../../../utils/getFormattedDate';

import './Ratings.scss';

const RATINGS_PER_PAGE = 3;
const PAGE = 1;

const Ratings = () => {
  const [ratings, setRatings] = useState([]);
  const [t] = useTranslate();

  useEffect(() => {
    const asyncFunc = async () => {
      let result = await fetchRatings(RATINGS_PER_PAGE, PAGE);
      setRatings([...result.ratings]);
    };

    asyncFunc();
  }, []);

  return (
    <section id='ratings'>
      <div className='ratings-container'>
        <div className='link'>
          <a href='/ratings'>{t('home_page.ratings.all_ratings')}</a>
        </div>
        <Row>
          {ratings.map((rating, index) => {
            let stars = [];

            for (let i=0; i<rating.rating; i++) {
              stars.push(true);
            }

            return (
              <Col className='rating-container' sm={4} key={index}>
                <div className='rating'>
                  <div className='stars'>
                    {stars.map((star, index) => (
                      <FaStar key={`star-${index}`} />
                    ))}
                  </div>
                  <div className='author'>
                    {rating.user.firstname} {rating.user.lastname}
                  </div>
                  <div className='date'>
                    {getFormattedDate(rating.createdAt)}
                  </div>
                  <div className='comment'>
                    {rating.comment}
                  </div>
                </div>
              </Col>
            )
          })}
        </Row>
      </div>
    </section>
  );
};

export default Ratings;
