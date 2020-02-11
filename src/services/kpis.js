
import Axios from 'axios';

const fetchKPIs = async () => {
  let JWT_TOKEN = window.localStorage.getItem('myfaDashboardToken');

  let axios = Axios.create({
    baseURL: process.env.GATSBY_BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  const result = await axios.get('/dashboard/kpis');

  return result.data;
};

export { fetchKPIs };
