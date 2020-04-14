import { useEffect } from 'react';
import useTranslate from '../hooks/useTranslate';
import UserStorage from '../services/UserStorage';
import CartStorage from '../services/CartStorage';
import DashboardUserStorage from '../services/DashboardUserStorage';

const LogoutPage = () => {
  const [t, locale] = useTranslate();

  useEffect(() => {
    UserStorage.deleteUser();
    CartStorage.deleteCart();
    DashboardUserStorage.deleteUser();
    window.localStorage.removeItem('popupViewed');

    window.location.assign(`/${locale}`);
  }, []);

  return null;
}

export default LogoutPage;
