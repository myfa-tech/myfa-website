import React from 'react'

import './Divider.scss';

const Divider = ({ color, tiny, full }) => {
  return (
    <div className={`divider ${color} ${full ? 'full' : ''} ${tiny ? 'tiny' : ''}`} />
  );
};

export default Divider;
