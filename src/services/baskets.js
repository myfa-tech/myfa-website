
import Axios from 'axios';

const fetchBaskets = async () => {
  let JWT_TOKEN = window.localStorage.getItem('myfaDashboardToken');

  let axios = Axios.create({
    baseURL: 'https://myfa-website-backend.herokuapp.com',
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  const result = await axios.get('/dashboard/baskets');

  return result.data.baskets;
};

export { fetchBaskets };
