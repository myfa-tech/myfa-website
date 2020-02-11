
import Axios from 'axios'

const axios = Axios.create({
  baseURL: 'https://myfa-website-backend.herokuapp.com',
});

const isBrowser = () => typeof window !== 'undefined';

const getAdmin = () => isBrowser() && window.localStorage.getItem('myfaDashboardUser') ?
  JSON.parse(window.localStorage.getItem('myfaDashboardUser')) : {};

const getUser = () => isBrowser() && window.localStorage.getItem('user') ?
  JSON.parse(window.localStorage.getItem('user')) : {};

const setAdmin = (user) => window.localStorage.setItem('myfaDashboardUser', JSON.stringify(user));

const setToken = async (token) => window.localStorage.setItem('myfaDashboardToken', token);

const handleLogin = async (creds) => {
  const response = await axios.post('/dashboard/login', creds);

  if (!!response.data.user && !!response.data.token) {
    await setToken(response.data.token);
    return setAdmin(response.data.user);
  }

  return false;
};

const isLoggedIn = () => {
  const user = getUser();
  return !!user.email;
};

const isAdminLoggedIn = () => {
  const user = getAdmin();
  return !!user.email;
};

const logout = (callback) => {
  setToken('');
  setAdmin({});
  callback();
}

export { getUser, handleLogin, isAdminLoggedIn, isLoggedIn, logout, setAdmin };
