import React from 'react';

import LeftFlipCard from './LeftFlipCard';
import RightFlipCard from './RightFlipCard';

import './NeedSection.scss';

const NeedSection = () => {

  return (
    <div id='need-section'>
      <h2>J'ai besoin de MYFA</h2>

      <div id='cards-container'>
        <LeftFlipCard />
        <RightFlipCard />
      </div>
    </div>
  );
};

export default NeedSection;
