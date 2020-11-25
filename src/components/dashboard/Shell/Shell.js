import React, { useEffect, useState } from 'react';
import { useAdminAuthentication } from '../../../hooks/useAuthentication';
import { isEmployeeLoggedIn } from '../../../services/auth';

import './Shell.scss';

const Shell = ({ children }) => {
  const { loading } = useAdminAuthentication({ redirect: '/dashboard/login' });
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const url = window.location.pathname;

    if (url.includes('users')) {
      setCategory('users');
    } else if (url.includes('requests')) {
      setCategory('requests');
    } else if (url.includes('baskets')) {
      setCategory('baskets');
    } else {
      setCategory('home');
    }
  }, []);

  return loading ? null : (
    <div className='dashboard-shell'>
      <div className='sidebar'>
        <ul>
          <li><a className={category === 'home' ? 'selected' : ''} href='/dashboard'><span aria-label='accueil' role="img">🏠</span> Accueil</a></li>
          <li><a className={category === 'users' ? 'selected' : ''} href='/dashboard/users'><span aria-label='utilisateurs' role="img">👥</span> Utilisateurs</a></li>
          <li><a className={category === 'requests' ? 'selected' : ''} href='/dashboard/requests'><span aria-label='request' role="img">📦</span> Demandes</a></li>
          <li><a className={category === 'baskets' ? 'selected' : ''} href='/dashboard/baskets'><span aria-label='paniers' role="img">🧺</span> Paniers [archive]</a></li>
        </ul>
      </div>
      <div className='content'>
        <div className='content-card'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Shell;
