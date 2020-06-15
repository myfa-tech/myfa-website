import React from 'react';

import './Placeholder.scss';

const Placeholder = ({ square }) => (
  <div className={`ui-placeholder ${square ? 'square' : ''}`}></div>
);

export default Placeholder;
