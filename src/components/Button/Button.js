import React from 'react';

import './Button.scss';

const Button = ({ label, onClick, secondary, className }) => (
  <button className={`${className ? className : ''} myfa-button ${secondary ? 'secondary' : ''}`} onClick={onClick}>{label}</button>
);

export default Button;
