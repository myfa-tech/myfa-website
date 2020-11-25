import Axios from 'axios';
import UserStorage from '../UserStorage';

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const saveUser = async (user) => {
  const response = await Axios.post(`${REACT_APP_BACKEND_URL}/users`, user);
  const createdUser = response.data.user;
  const { token } = response.data;

  UserStorage.saveUser(createdUser, token, true);
};

export default saveUser;
