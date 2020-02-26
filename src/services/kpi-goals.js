
import Axios from 'axios';

const fetchGoals = async () => {
  let JWT_TOKEN = window.localStorage.getItem('myfaDashboardToken');

  let axios = Axios.create({
    baseURL: process.env.GATSBY_BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  const result = await axios.get('/dashboard/goals');

  return result.data;
};

const updateGoalById = async (id, value) => {
  let JWT_TOKEN = window.localStorage.getItem('myfaDashboardToken');

  let axios = Axios.create({
    baseURL: process.env.GATSBY_BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  await axios.put(`/dashboard/goals?id=${id}`, { value });
};

export { fetchGoals, updateGoalById };
