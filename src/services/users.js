
import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'https://myfa-website-backend-js.herokuapp.com',
});

const fetchUsers = async () => {
  const result = await axios.get('/dashboard/users');

  return result.data.users;
};

export { fetchUsers };
