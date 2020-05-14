
import Axios from 'axios';
import DashboardUserStorage from './DashboardUserStorage';

const fetchGoals = async () => {
  let JWT_TOKEN = DashboardUserStorage.getToken();

  let axios = Axios.create({
    baseURL: process.env.BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  const result = await axios.get('/dashboard/goals');

  return result.data;
};

const updateGoalById = async (id, value) => {
  let JWT_TOKEN = DashboardUserStorage.getToken();

  let axios = Axios.create({
    baseURL: process.env.BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  await axios.put(`/dashboard/goals?id=${id}`, { value });
};

export { fetchGoals, updateGoalById };
