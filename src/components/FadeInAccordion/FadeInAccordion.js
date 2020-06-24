import React, { useState } from 'react';

import './FadeInAccordion.scss';

const FadeInAccordion = ({ title, content }) => {
  const [clicked, setClicked] = useState(false);

  const toggleClicked = () => setClicked(!clicked);

  return (
    <div className='fadein-accordion'>
      <div className='fadein-title-container' onClick={toggleClicked}>
        <p className='fadein-title'>{title}</p>
      </div>
      <p className={`fadein-content ${clicked ? 'show' : ''}`}>{content}</p>
    </div>
  );
};

export default FadeInAccordion;
