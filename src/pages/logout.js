import React, { useEffect } from 'react';

const LogoutPage = () => {
  useEffect(() => {
    window.localStorage.removeItem('userToken');
    window.localStorage.removeItem('user');
    window.location.assign('/');
  }, []);

  return null;
}

export default LogoutPage;
