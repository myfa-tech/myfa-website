
import Axios from 'axios';

const fetchBaskets = async (timeFilter) => {
  let JWT_TOKEN = window.localStorage.getItem('myfaDashboardToken');
  let query = '';

  let axios = Axios.create({
    baseURL: process.env.GATSBY_BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  if (!!timeFilter) {
    query = `?time_filter=${timeFilter}`;
  }

  const result = await axios.get(`/dashboard/baskets${query}`);

  return result.data.baskets;
};

const updateBasketById = async (id, editFields) => {
  let JWT_TOKEN = window.localStorage.getItem('myfaDashboardToken');

  let axios = Axios.create({
    baseURL: process.env.GATSBY_BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  const response = await axios.put('/dashboard/baskets', { id, editFields });

  return response.data;
}

export { fetchBaskets, updateBasketById };
