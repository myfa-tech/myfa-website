
import Axios from 'axios';
import UserStorage from './UserStorage';
import DashboardUserStorage from './DashboardUserStorage';

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const fetchUser = async () => {
  let JWT_TOKEN = UserStorage.getToken();

  let axios = Axios.create({
    baseURL: REACT_APP_BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  const result = await axios.get('/users');

  return result.data;
};

const fetchUsers = async (timeFilter) => {
  let JWT_TOKEN = DashboardUserStorage.getToken();
  let query = '';

  let axios = Axios.create({
    baseURL: REACT_APP_BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  if (!!timeFilter) {
    query = `?time_filter=${timeFilter}`;
  }

  const result = await axios.get(`/dashboard/users${query}`);

  return result.data.users;
};

const saveUser = async (user) => {
  const response = await Axios.post(`${REACT_APP_BACKEND_URL}/users`, user);
  const createdUser = response.data.user;
  const { token } = response.data;

  UserStorage.saveUser(createdUser, token, true);
};

const updateUser = async (userPart) => {
  let JWT_TOKEN = UserStorage.getToken();

  let axios = Axios.create({
    baseURL: REACT_APP_BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  const user = { ...UserStorage.getUser(), ...userPart };

  const response = await axios.put('/users', user);

  UserStorage.saveUser(response.data.updated);
};

const deleteAccount = async () => {
  const { user, token: JWT_TOKEN } = UserStorage.getUserAndToken();

  let axios = Axios.create({
    baseURL: REACT_APP_BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  await axios.put('/users/delete', { email: user.email });
};

const updatePassword = async ({ actualPassword, newPassword }) => {
  const { user, token: JWT_TOKEN } = UserStorage.getUserAndToken();

  let axios = Axios.create({
    baseURL: REACT_APP_BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  await axios.post(`/users/password/verify`, { email: user.email, password: actualPassword });
  await axios.put(`/users/password`, { email: user.email, password: newPassword });
};

const resetPasswordSendMagicLink = async (email) => {
  try {
    let axios = Axios.create({
      baseURL: REACT_APP_BACKEND_URL,
    });

    const host = window.location.host;

    const response = await axios.post(`/users/password/magic_link`, { host, email });

    return response.data;
  } catch(e) {
    if (e.response.status === 404) {
      return { error: 404 }
    }

    return { error: 500, text: 'something went wrong' };
  }
};

const resetPassword = async (newPassword) => {
  try {
    const url = window.location.search;

    let axios = Axios.create({
      baseURL: REACT_APP_BACKEND_URL,
    });

    const response = await axios.post(`/users/password/reset`, { newPassword, url });

    return response.data;
  } catch(e) {
    return { error: e.response.status }
  }
};

const loginUser = async (user) => {
  const response = await Axios.post(`${REACT_APP_BACKEND_URL}/users/login`, user);
  const { user: loggedInUser, token } = response.data;

  UserStorage.saveUser(loggedInUser, token, true);
};

const loginFBUser = async (user) => {
  const response = await Axios.post(`${REACT_APP_BACKEND_URL}/users/facebook-login`, user);
  const { user: loggedInUser, token } = response.data;

  UserStorage.saveUser(loggedInUser, token, true);
};

const loginGoogleUser = async (user) => {
  const response = await Axios.post(`${REACT_APP_BACKEND_URL}/users/google-login`, user);
  const { user: loggedInUser, token } = response.data;

  UserStorage.saveUser(loggedInUser, token, true);
};

const addRecipient = async (recipient) => {
  let JWT_TOKEN = UserStorage.getToken();

  let axios = Axios.create({
    baseURL: REACT_APP_BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  const user = UserStorage.getUser();

  user.recipients.push(recipient);

  await axios.put('/users', user);

  UserStorage.saveUser(user);
};

const confirmEmail = async (email, hash) => {
  try {
    await Axios.post(`${REACT_APP_BACKEND_URL}/users/email/confirm`, { email, hash });

    window.location.assign('/email_confirmation_success');
  } catch(e) {
    if (e.response.status === 404) {
      window.location.assign('/404');
    }
  }
};

export {
  addRecipient,
  confirmEmail,
  deleteAccount,
  fetchUser,
  fetchUsers,
  loginFBUser,
  loginGoogleUser,
  loginUser,
  saveUser,
  updatePassword,
  updateUser,
  resetPassword,
  resetPasswordSendMagicLink,
};
