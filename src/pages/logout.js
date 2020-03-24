import { useEffect } from 'react';
import useTranslate from '../hooks/useTranslate';

const LogoutPage = () => {
  const [t, locale] = useTranslate();

  useEffect(() => {
    window.localStorage.removeItem('userToken');
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('cart');
    window.localStorage.removeItem('popupViewed');

    window.location.assign(`/${locale}`);
  }, []);

  return null;
}

export default LogoutPage;
