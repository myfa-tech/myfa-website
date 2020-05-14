import axios from 'axios'

const BACKEND_URL = process.env.BACKEND_URL;

const saveNewsletterMember = async (member) => {
  await axios.post(`${BACKEND_URL}/newsletter/member`, member);
};

export { saveNewsletterMember }
