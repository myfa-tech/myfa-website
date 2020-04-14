
import EventEmitter from './EventEmitter';

const eventEmitter = new EventEmitter();

const deleteUser = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem('myfaDashboardUser');
    window.localStorage.removeItem('myfaDashboardToken');
  }
};

const getUser = () => {
  if (typeof window !== 'undefined') {
    const user = JSON.parse(window.localStorage.getItem('myfaDashboardUser'));

    return user;
  }

  return {};
};

const getToken = () => {
  if (typeof window !== 'undefined') {
    const token = window.localStorage.getItem('myfaDashboardToken');

    return token;
  }

  return '';
};

const saveUser = (user, token, shouldEmitLogin = false) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('myfaDashboardUser', JSON.stringify(user));

    if (!!token) {
      window.localStorage.setItem('myfaDashboardToken', token);
    }

    if (shouldEmitLogin) {
      eventEmitter.emit('admin-login');
    }

    return { user, token };
  }

  return false;
};

const isAdminLoggedIn = () => {
  const user = getUser();
  return !!user.email;
};

export default {
  deleteUser,
  getToken,
  getUser,
  isAdminLoggedIn,
  saveUser,
};
