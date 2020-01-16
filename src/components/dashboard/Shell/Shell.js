import React from 'react';
import useAuthentication from '../../../hooks/useAuthentication';

import './Shell.scss';

const Shell = ({ children }) => {
  const { loading } = useAuthentication();

  return loading ? null : (
    <div className='dashboard-shell'>
      <div className='sidebar'>
        <ul>
          <li><a href='/dashboard'>🏠 Accueil</a></li>
        </ul>
      </div>
      <div className='content'>
        {children}
      </div>
    </div>
  );
};

export default Shell;
