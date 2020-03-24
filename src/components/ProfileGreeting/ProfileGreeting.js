import React from 'react';

import './ProfileGreeting.scss';
import useTranslate from '../../hooks/useTranslate';

const ProfileGreeting = () => {
  const { firstname } = (typeof window !== 'undefined') ? JSON.parse(window.localStorage.getItem('user')) : {};
  const [t] = useTranslate();

  return (
    <div id='profile-greeting'>
      <h1>{t('profile.greeting.hello')} {firstname} 👋</h1>
    </div>
  )
};

export default ProfileGreeting;
