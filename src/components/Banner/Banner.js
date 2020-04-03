import React from 'react';

import './Banner.scss';

const Banner = ({ show, text, type }) => {
  return show && (
    <div className={`banner ${type}`}>
      <p>{text}</p>
    </div>
  );
};

export default Banner;
