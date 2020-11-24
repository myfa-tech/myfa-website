import React from 'react';

import './Button.scss';

const Button = ({ label, target, onClick, href, secondary, className }) => href ? (
  <a href={href} target={target} className={`${className ? className : ''} myfa-button ${secondary ? 'secondary' : ''}`} onClick={onClick}>{label}</a>
) : (
  <button className={`${className ? className : ''} myfa-button ${secondary ? 'secondary' : ''}`} onClick={onClick}>{label}</button>
)

export default Button;
