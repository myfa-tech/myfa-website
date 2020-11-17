import React, { useEffect, useState } from 'react'

import './Stepper.scss';

const Stepper = ({ steps, step }) => {
  return (
    <div className='stepper'>
      {new Array(steps).fill(1).map((unused, index) => (
        <div className={`step ${step >= index ? 'selected' : ''}`} key={`step-${index}`}></div>
      ))}
    </div>
  );
};

export default Stepper;
