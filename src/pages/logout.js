import React, { useEffect } from 'react';

const LogoutPage = () => {
  useEffect(() => {
    window.localStorage.removeItem('userToken');
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('cart');
    window.localStorage.removeItem('popupViewed');

    window.location.assign('/');
  }, []);

  return null;
}

export default LogoutPage;
