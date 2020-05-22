
import Axios from 'axios';

import DashboardUserStorage from '../services/DashboardUserStorage';

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const fetchRequests = async () => {
  let JWT_TOKEN = DashboardUserStorage.getToken();

  let axios = Axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  const result = await axios.get('/dashboard/finance/requests');

  return result.data.requests;
};

const updateRequestById = async (id, data) => {
  let JWT_TOKEN = DashboardUserStorage.getToken();

  let axios = Axios.create({
    baseURL: REACT_APP_BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  const response = await axios.put(`/dashboard/finance/requests?id=${id}`, data);

  return response.data;
};

const deleteRequestById = async (id) => {
  let JWT_TOKEN = DashboardUserStorage.getToken();

  let axios = Axios.create({
    baseURL: REACT_APP_BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  await axios.delete(`/dashboard/finance/requests?id=${id}`);
};

const saveFinanceRequest = async (data) => {
  let JWT_TOKEN = DashboardUserStorage.getToken();

  let axios = Axios.create({
    baseURL: REACT_APP_BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  await axios.post('/dashboard/finance/requests', data);
};

export { deleteRequestById, fetchRequests, saveFinanceRequest, updateRequestById };
