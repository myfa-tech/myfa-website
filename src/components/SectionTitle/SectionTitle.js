import React from 'react';

import './SectionTitle.scss';

const SectionTitle = ({ title, secondary }) => (
  <div className='section-title-container'>
    <span className='section-title'>{title}</span>
    <a className='secondary-link' href={secondary.link}>{secondary.text}</a>
  </div>
);

export default SectionTitle;
