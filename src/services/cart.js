import Axios from 'axios';

import UserStorage from './UserStorage';
import basketsImgs from '../assets/basketsImgs';

const BACKEND_URL = process.env.GATSBY_BACKEND_URL;

const createCart = async (cart) => {
  let JWT_TOKEN = UserStorage.getToken();

  let axios = Axios.create({
    baseURL: BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  await axios.post('/cart', cart);
};

const updateCart = async (editFields) => {
  let JWT_TOKEN = UserStorage.getToken();

  let axios = Axios.create({
    baseURL: BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  await axios.put('/cart', editFields);
};

const getCart = async () => {
  let JWT_TOKEN = UserStorage.getToken();

  let axios = Axios.create({
    baseURL: BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  const response = await axios.get('/cart');

  if (!!response.data.cart && !!response.data.cart.baskets) {
    response.data.cart.baskets = response.data.cart.baskets.map(b => ({ ...b, img: basketsImgs[b.type] }));
  }

  return response.data.cart;
};

const deleteSavedCart = async () => {
  let JWT_TOKEN = UserStorage.getToken();

  let axios = Axios.create({
    baseURL: BACKEND_URL,
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
