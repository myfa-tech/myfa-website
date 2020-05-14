
import Axios from 'axios';
import DashboardUserStorage from './DashboardUserStorage';
import UserStorage from './UserStorage';

const axios = Axios.create({
  baseURL: process.env.BACKEND_URL,
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

const isFlorianLoggedIn = () => {
  const user = DashboardUserStorage.getUser();
  return !!user && user.email === 'fadonis@myfa.fr';
};

export { handleLogin, isAdminLoggedIn, isEmployeeLoggedIn, isFlorianLoggedIn, isUserLoggedIn };
