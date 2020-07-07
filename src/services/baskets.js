
import Axios from 'axios';
import DashboardUserStorage from '../services/DashboardUserStorage';
import UserStorage from '../services/UserStorage';

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

const fetchAllBaskets = async () => {
  let JWT_TOKEN = UserStorage.getToken();

  let axios = Axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  const result = await axios.get('/baskets');

  return result.data.baskets;
};

const fetchPleasureBaskets = async () => {
  let axios = Axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  const result = await axios.get('/baskets/pleasure');

  return result.data.baskets;
};

const fetchPacks = async () => {
  let axios = Axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  const result = await axios.get('/baskets/packs');

  return result.data.packs;
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

export { fetchBaskets, fetchCustomBasket, fetchPacks, fetchPleasureBaskets, fetchAllBaskets, updateBasketById };
