import React from 'react';
import { Placeholder } from 'semantic-ui-react';

import './LoadingBasket.scss';

const LoadingBasket = () => {
  return (
    <div id='placeholder-container'>
      <div className='placeholder-inner-container'>
        <Placeholder>
          <Placeholder.Header>
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Header>
        </Placeholder>
        <Placeholder>
          <Placeholder.Image square />
        </Placeholder>
      </div>
    </div>
  );
};

export default LoadingBasket;
