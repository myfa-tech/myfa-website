import React from 'react'

import './Divider.scss';

const Divider = ({ color, tiny }) => {
  return (
    <div className={`divider ${color} ${tiny ? 'tiny' : ''}`} />
  );
};

export default Divider;
