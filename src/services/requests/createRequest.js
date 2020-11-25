import Axios from 'axios';

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const createRequest = async (values) => {
  const request = { user: { ...values } };

  const response = await Axios.post(`${REACT_APP_BACKEND_URL}/requests`, request);
  const createdRequest = response.data.request;

  return createdRequest;
};

export default createRequest;
