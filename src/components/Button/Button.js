import React from 'react';

import './Button.scss';

const Button = ({ label, onClick, className }) => (
  <button className={className ? `${className} myfa-button` : 'myfa-button'} onClick={onClick}>{label}</button>
);

export default Button;
