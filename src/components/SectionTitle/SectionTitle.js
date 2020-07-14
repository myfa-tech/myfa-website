import React from 'react';

import './SectionTitle.scss';

const SectionTitle = ({ title, mobileTitle, secondary }) => (
  <div className='section-title-container'>
    <span className='section-title large'>{title}</span>
    <span className='section-title mobile'>{mobileTitle || title}</span>
    {secondary ? <a className='secondary-link' href={secondary.link}>{secondary.text}</a> : null}
  </div>
);

export default SectionTitle;
