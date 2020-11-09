import React from 'react'

import './Divider.scss';

const Divider = ({ color }) => {
  return (
    <div className={`divider ${color}`} />
  );
};

export default Divider;
