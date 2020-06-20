
import Axios from 'axios';
import UserStorage from './UserStorage';

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const isPromoValid = async (code) => {
  try {
    let JWT_TOKEN = UserStorage.getToken();

    let axios = Axios.create({
      baseURL: REACT_APP_BACKEND_URL,
      headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
    });

    const result = await axios.get(`/promos?code=${code}`);

    return result.data;
  } catch(e) {
    return false;
  }
};

export { isPromoValid };
