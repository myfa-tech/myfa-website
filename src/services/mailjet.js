import axios from 'axios'

const BACKEND_URL = 'https://myfa-website-backend.herokuapp.com';

const saveNewsletterMember = async (member) => {
  await axios.post(`${BACKEND_URL}/newsletter/member`, member);
};

export { saveNewsletterMember }
