
import Axios from 'axios'

const BACKEND_URL = 'https://myfa-website-backend.herokuapp.com/users'

const fetchUsers = async () => {
  let JWT_TOKEN = window.localStorage.getItem('myfaDashboardToken');

  let axios = Axios.create({
    baseURL: 'https://myfa-website-backend.herokuapp.com',
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  const result = await axios.get('/dashboard/users');

  return result.data.users;
};

const saveUser = async (user) => {
  const response = await Axios.post(BACKEND_URL, user);
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

  await axios.put(BACKEND_URL, user);

  window.localStorage.setItem('user', JSON.stringify(user));
};

const updatePassword = async ({ actualPassword, newPassword }) => {
  let JWT_TOKEN = window.localStorage.getItem('userToken');
  const user = JSON.parse(window.localStorage.getItem('user'));

  let axios = Axios.create({
    baseURL: BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  await axios.post(`${BACKEND_URL}/password/verify`, { email: user.email, password: actualPassword });

  await axios.put(`${BACKEND_URL}/password`, { email: user.email, password: newPassword });
};

const loginUser = async (user) => {
  const response = await Axios.post(`${BACKEND_URL}/login`, user);
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

  await axios.put(BACKEND_URL, user);

  window.localStorage.setItem('user', JSON.stringify(user));
};

export { addRecipient, fetchUsers, loginUser, saveUser, updatePassword, updateUser };
