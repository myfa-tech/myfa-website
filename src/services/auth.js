
const isBrowser = () => typeof window !== 'undefined';

const getUser = () => isBrowser() && window.localStorage.getItem('myfaDashboardUser') ?
  JSON.parse(window.localStorage.getItem('myfaDashboardUser')) : {};

const setUser = (user) => window.localStorage.setItem('myfaDashboardUser', JSON.stringify(user));

const handleLogin = ({ username, password }) => {
  // @TODO : handle login here
  if (username === 'john' && password === 'papa') {
    return setUser({ username, name: 'John', email: 'john@papa.com' });
  }

  return false;
};

const isLoggedIn = () => {
  const user = getUser();
  return !!user.username;
};

const logout = (callback) => {
  setUser({});
  callback();
}

export { getUser, handleLogin, isLoggedIn, logout, setUser };
