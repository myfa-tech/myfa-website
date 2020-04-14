
import Axios from 'axios';
import DashboardUserStorage from './DashboardUserStorage';
import UserStorage from './UserStorage';

const axios = Axios.create({
  baseURL: process.env.GATSBY_BACKEND_URL,
});

const handleLogin = async (creds) => {
  const response = await axios.post('/dashboard/login', creds);

  if (!!response.data.user && !!response.data.token) {
    DashboardUserStorage.saveUser(response.data.user, response.data.token);
    return true;
  }

  return false;
};

const isUserLoggedIn = () => {
  const user = UserStorage.getUser();
  return !!user && !!user.email;
};

const isAdminLoggedIn = () => {
  const user = DashboardUserStorage.getUser();
  return !!user && !!user.email;
};

const isEmployeeLoggedIn = () => {
  const user = DashboardUserStorage.getUser();
  return !!user && !!user.isEmployee;
};

export { handleLogin, isAdminLoggedIn, isEmployeeLoggedIn, isUserLoggedIn };
