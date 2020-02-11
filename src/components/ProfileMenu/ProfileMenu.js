import React from 'react';

import './ProfileMenu.scss';

const ProfileMenu = ({ pageName }) => {
  const listItems = [
    { label: 'Mes informations', link: '/profile/information' },
    { label: 'Mes commandes', link: '/profile/orders' },
    { label: 'Changer mon mot de passe', link: '/profile/password' },
    { label: 'Mes proches', link: '/profile/relatives' },
    { label: 'Déconnexion', link: '/logout' },
  ];

  return (
    <div id='profile-menu'>
      <ul className='list-container'>
        {listItems.map(item => (
          <li key={item.link} className={item.link.includes(pageName) ? 'active' : ''}><a href={item.link}>{item.label}</a></li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileMenu;
