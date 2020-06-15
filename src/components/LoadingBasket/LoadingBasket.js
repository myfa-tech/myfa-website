import React from 'react';
import Placeholder from '../Placeholder';

import './LoadingBasket.scss';

const LoadingBasket = () => {
  return (
    <div id='placeholder-container'>
      <div className='placeholder-inner-container'>
        <Placeholder />
        <Placeholder square />
      </div>
    </div>
  );
};

export default LoadingBasket;
