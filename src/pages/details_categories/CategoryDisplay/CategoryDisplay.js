import React from 'react';

import './CategoryDisplay.scss';

const CategoryDisplay = ({ title, description, link, image }) => {
  const goTo = () => {
    if (typeof window !== 'undefined') {
      window.location.assign(link);
    }
  };

  return (
    <div className='category-display' onClick={goTo} style={{ backgroundImage: `url(${image})` }}>
      <h2>{title}</h2>
      <h3>{description}</h3>
    </div>
  );
};

export default CategoryDisplay;
