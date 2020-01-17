
import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'https://myfa-website-backend-js.herokuapp.com',
});

const fetchBaskets = async () => {
  const result = await axios.get('/dashboard/baskets');

  return result.data.baskets;
};

export { fetchBaskets };
