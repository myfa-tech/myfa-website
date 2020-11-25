import Axios from 'axios';

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const updateRequest = async (_id, values) => {
  const request = { _id, ...values };

  const response = await Axios.put(`${REACT_APP_BACKEND_URL}/requests`, request);
  const createdRequest = response.data.request;

  return createdRequest;
};

export default updateRequest;
