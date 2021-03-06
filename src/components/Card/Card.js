import React from 'react';

import './Card.scss';

const Card = ({ imgSrc, title, description, footerLeft, footerRight, className, onClick }) => {
  return (
    <div className={`custom-card ${className ? className : ''}`} onClick={onClick ? onClick : () => {}}>
      {imgSrc ? <div className='img-container'>
        <img src={imgSrc} />
      </div> : null}
      <div className='text-container'>
        <span className='title'>{title}</span>
        <p className='description'>{description}</p>
        <div className='custom-card-footer'>
          {footerLeft} - {footerRight}
        </div>
      </div>
    </div>
  );
};

export default Card;
