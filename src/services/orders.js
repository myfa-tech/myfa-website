
import Axios from 'axios';
import UserStorage from './UserStorage';
import DashboardUserStorage from './DashboardUserStorage';

const BACKEND_URL = process.env.BACKEND_URL;

const getOrdersByRef = async (ref) => {
  let JWT_TOKEN = UserStorage.getToken();

  let axios = Axios.create({
    baseURL: BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  const response = await axios.get(`/baskets?ref=${ref}`);

  return response.data;
};

const getBasketsByEmail = async (email) => {
  let JWT_TOKEN = UserStorage.getToken();

  let axios = Axios.create({
    baseURL: BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  const response = await axios.get(`/users/baskets?email=${email}`);

  return response.data.baskets;
};

const saveOrderManually = async (order) => {
  let JWT_TOKEN = DashboardUserStorage.getToken();

  let axios = Axios.create({
    baseURL: BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  await axios.post('/dashboard/orders/manually', order);
};

export { getOrdersByRef, getBasketsByEmail, saveOrderManually };
