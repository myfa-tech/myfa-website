import React from 'react';

import './ProfileGreeting.scss';
import useTranslate from '../../../hooks/useTranslate';
import UserStorage from '../../../services/UserStorage';

const ProfileGreeting = () => {
  const { firstname } = UserStorage.getUser();
  const [t] = useTranslate();

  return (
    <div id='profile-greeting'>
      <h1>{t('profile.greeting.hello')} {firstname} 👋</h1>
    </div>
  )
};

export default ProfileGreeting;
