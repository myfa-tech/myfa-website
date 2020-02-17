
import Axios from 'axios';

const BACKEND_URL = process.env.GATSBY_BACKEND_URL;

const getOrdersByRef = async (ref) => {
  let JWT_TOKEN = window.localStorage.getItem('userToken');

  let axios = Axios.create({
    baseURL: BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  const response = await axios.get(`/baskets?ref=${ref}`);

  return response.data;
}

const getBasketsByEmail = async (email) => {
  let JWT_TOKEN = window.localStorage.getItem('userToken');

  let axios = Axios.create({
    baseURL: BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  const response = await axios.get(`/users/baskets?email=${email}`);

  return response.data.baskets;
};

export { getOrdersByRef, getBasketsByEmail };
