
import Axios from 'axios';

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const sendForm = async (values) => {
  let axios = Axios.create({
    baseURL: REACT_APP_BACKEND_URL,
  });

  await axios.post('/forms', values);
};

export default sendForm;
