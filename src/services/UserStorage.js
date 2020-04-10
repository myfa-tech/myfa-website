
import EventEmitter from './EventEmitter';

const eventEmitter = new EventEmitter();

const deleteUser = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('userToken');
  }
};

const getUser = () => {
  if (typeof window !== 'undefined') {
    const user = JSON.parse(window.localStorage.getItem('user'));

    return user;
  }

  return {};
};

const getToken = () => {
  if (typeof window !== 'undefined') {
    const token = window.localStorage.getItem('userToken');

    return token;
  }

  return '';
};

const getUserAndToken = () => {
  if (typeof window !== 'undefined') {
    const user = JSON.parse(window.localStorage.getItem('user'));
    const token = window.localStorage.getItem('userToken');

    return { user, token };
  }

  return {};
};

const saveUser = (user, token, shouldEmitLogin = false) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('user', JSON.stringify(user));

    if (!!token) {
      window.localStorage.setItem('userToken', token);
    }

    if (shouldEmitLogin) {
      eventEmitter.emit('login');
    }

    return { user, token };
  }

  return false;
};

export default {
  deleteUser,
  getToken,
  getUser,
  getUserAndToken,
  saveUser,
};
