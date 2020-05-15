
import Axios from 'axios';
import DashboardUserStorage from '../services/DashboardUserStorage';

const fetchBaskets = async (timeFilter) => {
  let JWT_TOKEN = DashboardUserStorage.getToken();
  let query = '';

  let axios = Axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  if (!!timeFilter) {
    query = `?time_filter=${timeFilter}`;
  }

  const result = await axios.get(`/dashboard/baskets${query}`);

  return result.data.baskets;
};

const fetchCustomBasket = async () => {
  let axios = Axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  const result = await axios.get(`/baskets/custom-basket/details`);

  return result.data.basket;
};

const fetchHomeBaskets = async () => {
  let axios = Axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  const result = await axios.get(`/baskets/details`);

  return result.data.baskets;
};

const fetchRamadanBaskets = async () => {
  let axios = Axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  const result = await axios.get(`/ramadanbaskets/details`);

  return result.data.baskets;
};

const updateBasketById = async (id, editFields) => {
  let JWT_TOKEN = DashboardUserStorage.getToken();

  let axios = Axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  const response = await axios.put('/dashboard/baskets', { id, editFields });

  return response.data;
}

export { fetchBaskets, fetchCustomBasket, fetchHomeBaskets, fetchRamadanBaskets, updateBasketById };
