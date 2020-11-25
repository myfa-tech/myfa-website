import React, { useState, useEffect } from 'react';
import { FaCaretLeft, FaCaretRight, FaStar } from 'react-icons/fa';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';

import Button from '../../../components/Button';

import getFormattedDate from '../../../utils/getFormattedDate';
import { fetchRatings } from '../../../services/ratings';

import './RatingsList.scss';

const RATINGS_PER_PAGE = 10;

const spinnerStyle = css`
  display: block;
  margin: 0 auto;
`;

const RatingsList = ({ className }) => {
  const [ratings, setRatings] = useState([]);
  const [nextRatings, setNextRatings] = useState([]);
  const [prevRatings, setPrevRatings] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([1]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const asyncFunc = async () => {
      const results = await Promise.all([
        fetchRatings(RATINGS_PER_PAGE, page),
        fetchRatings(RATINGS_PER_PAGE, page+1),
      ]);

      setRatings(results[0].ratings);
      setNextRatings(results[1].ratings);

      definePages(results[1].totalPages);

      setIsLoading(false);
    };

    asyncFunc();
  }, []);

  const definePages = (numberOfPages) => {
    let newPages = [];

    for (let i=1; i<=Math.ceil(numberOfPages); i++) {
      newPages.push(i);
    }

    setPages(newPages);
  };

  const goToPage = async (p) => {
    if (p !== page && p > 0 && p <= pages.length) {
      setPage(p);

      if (p === page+1) { // Going to next page
        let result = await fetchRatings(RATINGS_PER_PAGE, p+1);
        setRatings([...nextRatings]);
        setNextRatings(result.ratings);
        setPrevRatings(ratings);
        definePages(result.totalPages);
      } else if (p === page-1) { // Going to prev page
        let result = await fetchRatings(RATINGS_PER_PAGE, p-1);
        setRatings([...prevRatings]);
        setNextRatings(ratings);
        setPrevRatings(result.ratings);
        definePages(result.totalPages);
      } else { // Going to other page
        let result = await fetchRatings(RATINGS_PER_PAGE, p);
        setRatings([...result.ratings]);

        if (p > 0) {
          let otherResult = await fetchRatings(RATINGS_PER_PAGE, p-1);
          setPrevRatings(otherResult.ratings);
        }

        if (p < result.totalPages) {
          let otherResult = await fetchRatings(RATINGS_PER_PAGE, p+1);
          setNextRatings(otherResult.ratings);
        }

        definePages(result.totalPages);
      }
    }
  };

  return (
    <div id='ratings-list' className={className ? className : ''}>
      {isLoading ? <div>
        <ClipLoader
          css={spinnerStyle}
          sizeUnit={'px'}
          size={25}
          color={'#000'}
          loading={true}
        />
      </div> : ratings.map((rating, ratingIndex) => {
        let stars = [];

        for (let i=0; i<rating.rating; i++) {
          stars.push(true);
        }

        for (let i=rating.rating; i<5; i++) {
          stars.push(false);
        }

        return (
          <div className='rating' key={ratingIndex}>
            <div className='rating-header'>
              <div className='left-header'>
                <div className='stars'>
                  {stars.map((isStarYellow, starIndex) => (
                    <FaStar key={starIndex} className={isStarYellow ? 'yellow' : 'grey'} />
                  ))}
                </div>
                <div className='user-name'>{rating.user.firstname} {rating.user.lastname}</div>
              </div>

              <div className='right-header'>
                {getFormattedDate(rating.createdAt)}
              </div>
            </div>
            <div className='rating-subject'>
              {rating.subject}
            </div>
            <div className='rating-text'>
              {rating.comment}
            </div>
          </div>
        );
      })}

      <div className='footer-nav'>
        <FaCaretLeft className='arrow left-arrow' onClick={() => goToPage(page-1)} />
        {pages.map((p, pagesIndex) => (
          <Button
            key={pagesIndex}
            className={`page-button ${page !== p ? 'not-actual' : ''}`}
            label={p}
            onClick={() => goToPage(p)}
          />
        ))}
        <FaCaretRight className='arrow right-arrow' onClick={() => goToPage(page+1)} />
      </div>
    </div>
  );
};

export default RatingsList;
