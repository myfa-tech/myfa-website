
import Axios from 'axios';

const BACKEND_URL = process.env.GATSBY_BACKEND_URL;

const fetchUser = async () => {
  let JWT_TOKEN = window.localStorage.getItem('userToken');

  let axios = Axios.create({
    baseURL: BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  const result = await axios.get('/users');

  return result.data;
};

const fetchUsers = async (timeFilter) => {
  let JWT_TOKEN = window.localStorage.getItem('myfaDashboardToken');
  let query = '';

  let axios = Axios.create({
    baseURL: BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  if (!!timeFilter) {
    query = `?time_filter=${timeFilter}`;
  }

  const result = await axios.get(`/dashboard/users${query}`);

  return result.data.users;
};

const saveUser = async (user) => {
  const response = await Axios.post(`${BACKEND_URL}/users`, user);
  const createdUser = response.data.user;
  const { token } = response.data;

  window.localStorage.setItem('user', JSON.stringify(createdUser));
  window.localStorage.setItem('userToken', token);
};

const updateUser = async (userPart) => {
  let JWT_TOKEN = window.localStorage.getItem('userToken');

  let axios = Axios.create({
    baseURL: BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  const user = { ...JSON.parse(window.localStorage.getItem('user')), ...userPart };

  await axios.put('/users', user);

  window.localStorage.setItem('user', JSON.stringify(user));
};

const deleteAccount = async () => {
  let JWT_TOKEN = window.localStorage.getItem('userToken');
  let user = JSON.parse(window.localStorage.getItem('user'));

  let axios = Axios.create({
    baseURL: BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  await axios.put('/users/delete', { email: user.email });
};

const updatePassword = async ({ actualPassword, newPassword }) => {
  let JWT_TOKEN = window.localStorage.getItem('userToken');
  const user = JSON.parse(window.localStorage.getItem('user'));

  let axios = Axios.create({
    baseURL: BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  await axios.post(`/users/password/verify`, { email: user.email, password: actualPassword });
  await axios.put(`/users/password`, { email: user.email, password: newPassword });
};

const resetPasswordSendMagicLink = async (email) => {
  try {
    let axios = Axios.create({
      baseURL: BACKEND_URL,
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
      baseURL: BACKEND_URL,
    });

    const response = await axios.post(`/users/password/reset`, { newPassword, url });

    return response.data;
  } catch(e) {
    return { error: e.response.status }
  }
};

const loginUser = async (user) => {
  const response = await Axios.post(`${BACKEND_URL}/users/login`, user);
  const { user: loggedInUser, token } = response.data;

  window.localStorage.setItem('user', JSON.stringify(loggedInUser));
  window.localStorage.setItem('userToken', token);
};

const loginFBUser = async (user) => {
  const response = await Axios.post(`${BACKEND_URL}/users/facebook-login`, user);
  const { user: loggedInUser, token } = response.data;

  window.localStorage.setItem('user', JSON.stringify(loggedInUser));
  window.localStorage.setItem('userToken', token);
};

const loginGoogleUser = async (user) => {
  const response = await Axios.post(`${BACKEND_URL}/users/google-login`, user);
  const { user: loggedInUser, token } = response.data;

  window.localStorage.setItem('user', JSON.stringify(loggedInUser));
  window.localStorage.setItem('userToken', token);
};

const addRecipient = async (recipient) => {
  let JWT_TOKEN = window.localStorage.getItem('userToken');

  let axios = Axios.create({
    baseURL: BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  const user = JSON.parse(window.localStorage.getItem('user'));
  user.recipients.push(recipient);

  await axios.put('/users', user);

  window.localStorage.setItem('user', JSON.stringify(user));
};

const confirmEmail = async (email, hash) => {
  try {
    await Axios.post(`${BACKEND_URL}/users/email/confirm`, { email, hash });

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
