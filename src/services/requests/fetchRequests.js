
import Axios from 'axios';
import DashboardUserStorage from '../DashboardUserStorage';

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const fetchRequests = async (timeFilter) => {
  let JWT_TOKEN = DashboardUserStorage.getToken();
  let query = '';

  let axios = Axios.create({
    baseURL: REACT_APP_BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  if (!!timeFilter) {
    query = `?time_filter=${timeFilter}`;
  }

  const result = await axios.get(`/dashboard/requests${query}`);

  return result.data.requests;
};

export default fetchRequests;
