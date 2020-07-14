import React from 'react';
import Placeholder from '../Placeholder';

import './LoadingItem.scss';

const LoadingItem = () => {
  return (
    <div id='placeholder-container'>
      <div className='placeholder-inner-container'>
        <Placeholder />
        <Placeholder square />
      </div>
    </div>
  );
};

export default LoadingItem;
