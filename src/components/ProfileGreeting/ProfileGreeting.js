import React from 'react';

import './ProfileGreeting.scss';

const ProfileGreeting = () => {
  const { firstname, lastname } = (typeof window !== 'undefined') ? JSON.parse(window.localStorage.getItem('user')) : {};

  return (
    <div id='profile-greeting'>
      <h1>Bonjour {firstname} {lastname} 👋</h1>
    </div>
  )
};

export default ProfileGreeting;
