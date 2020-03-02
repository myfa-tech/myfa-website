
import Axios from 'axios';

const BACKEND_URL = process.env.GATSBY_BACKEND_URL;

const fetchRequests = async () => {
  let JWT_TOKEN = window.localStorage.getItem('myfaDashboardToken');

  let axios = Axios.create({
    baseURL: process.env.GATSBY_BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  const result = await axios.get('/dashboard/finance/requests');

  return result.data.requests;
};

const updateRequestById = async (id, data) => {
  let JWT_TOKEN = window.localStorage.getItem('myfaDashboardToken');

  let axios = Axios.create({
    baseURL: BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  await axios.put(`/dashboard/finance/requests?id=${id}`, data);
};

const deleteRequestById = async (id) => {
  let JWT_TOKEN = window.localStorage.getItem('myfaDashboardToken');

  let axios = Axios.create({
    baseURL: BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  await axios.delete(`/dashboard/finance/requests?id=${id}`);
};

const saveFinanceRequest = async (data) => {
  let JWT_TOKEN = window.localStorage.getItem('myfaDashboardToken');

  let axios = Axios.create({
    baseURL: BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  await axios.post('/dashboard/finance/requests', data);
};

export { deleteRequestById, fetchRequests, saveFinanceRequest, updateRequestById };
