
import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'https://myfa-website-backend-js.herokuapp.com',
});

const fetchKPIs = async () => {
  const result = await axios.get('/dashboard/kpis');

  return result.data;
};

export { fetchKPIs };
