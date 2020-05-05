
import Axios from 'axios';
import DashboardUserStorage from './DashboardUserStorage';

const fetchStocks = async () => {
  let JWT_TOKEN = DashboardUserStorage.getToken();

  let axios = Axios.create({
    baseURL: process.env.GATSBY_BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  const result = await axios.get('/dashboard/stocks');

  return result.data;
};

export { fetchStocks };
