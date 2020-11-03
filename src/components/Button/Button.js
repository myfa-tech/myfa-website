import React from 'react';

import './Button.scss';

const Button = ({ label, onClick, href, secondary, className }) => href ? (
  <a href={href} className={`${className ? className : ''} myfa-button ${secondary ? 'secondary' : ''}`} onClick={onClick}>{label}</a>
) : (
  <button className={`${className ? className : ''} myfa-button ${secondary ? 'secondary' : ''}`} onClick={onClick}>{label}</button>
)

export default Button;
