

import Axios from 'axios';
import UserStorage from '../UserStorage';

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const loginUser = async (user) => {
  const response = await Axios.post(`${REACT_APP_BACKEND_URL}/users/login`, user);
  const { user: loggedInUser, token } = response.data;

  UserStorage.saveUser(loggedInUser, token, true);
};

export default loginUser;
