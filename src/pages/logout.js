import { useEffect } from 'react';
import useTranslate from '../hooks/useTranslate';
import UserStorage from '../services/UserStorage';
import DashboardUserStorage from '../services/DashboardUserStorage';

const LogoutPage = () => {
  const [t, locale] = useTranslate();

  useEffect(() => {
    UserStorage.deleteUser();
    DashboardUserStorage.deleteUser();
    window.localStorage.removeItem('popupViewed');

    window.location.assign('/');
  }, []);

  return null;
}

export default LogoutPage;
