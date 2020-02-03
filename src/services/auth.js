
import Axios from 'axios'

const axios = Axios.create({
  baseURL: 'https://myfa-website-backend.herokuapp.com',
});

const isBrowser = () => typeof window !== 'undefined';

const getUser = () => isBrowser() && window.localStorage.getItem('myfaDashboardUser') ?
  JSON.parse(window.localStorage.getItem('myfaDashboardUser')) : {};

const setUser = (user) => window.localStorage.setItem('myfaDashboardUser', JSON.stringify(user));

const setToken = async (token) => window.localStorage.setItem('myfaDashboardToken', token);

const handleLogin = async (creds) => {
  const response = await axios.post('/dashboard/login', creds);

  if (!!response.data.user && !!response.data.token) {
    await setToken(response.data.token);
    return setUser(response.data.user);
  }

  return false;
};

const isLoggedIn = () => {
  const user = getUser();
  return !!user.email;
};

const logout = (callback) => {
  setToken('');
  setUser({});
  callback();
}

export { getUser, handleLogin, isLoggedIn, logout, setUser };
