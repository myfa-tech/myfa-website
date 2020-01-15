import React from 'react';
import useAuthentication from '../../../hooks/useAuthentication';

import './Shell.scss';

const Shell = ({ children }) => {
  const { loading } = useAuthentication();

  return loading ? null : (
    <div className='dashboard-shell'>
      <div className='sidebar'>
        <ul>
          <li><a href='/dashboard'><span aria-label='accueil' role="img">🏠</span> Accueil</a></li>
          <li><a href='/dashboard/users'><span aria-label='utilisateurs' role="img">👥</span> Utilisateurs</a></li>
          <li><a href='/dashboard/baskets'><span aria-label='paniers' role="img">🧺</span> Paniers</a></li>
        </ul>
      </div>
      <div className='content'>
        {children}
      </div>
    </div>
  );
};

export default Shell;
