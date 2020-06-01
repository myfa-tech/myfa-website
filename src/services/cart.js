import Axios from 'axios';

import UserStorage from './UserStorage';
import basketsImgs from '../assets/basketsImgs';

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const createCart = async (cart) => {
  let JWT_TOKEN = UserStorage.getToken();

  let axios = Axios.create({
    baseURL: REACT_APP_BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  await axios.post('/cart', cart);
};

const updateCart = async (editFields) => {
  let JWT_TOKEN = UserStorage.getToken();

  let axios = Axios.create({
    baseURL: REACT_APP_BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  await axios.put('/cart', editFields);
};

const getCart = async () => {
  let JWT_TOKEN = UserStorage.getToken();

  let axios = Axios.create({
    baseURL: REACT_APP_BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  const response = await axios.get('/cart');

  return response.data.cart;
};

const deleteSavedCart = async () => {
  let JWT_TOKEN = UserStorage.getToken();

  let axios = Axios.create({
    baseURL: REACT_APP_BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  await axios.delete('/cart');
};

export {
  createCart,
  deleteSavedCart,
  getCart,
  updateCart,
};
