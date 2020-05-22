import axios from 'axios'

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const saveNewsletterMember = async (member) => {
  await axios.post(`${REACT_APP_BACKEND_URL}/newsletter/member`, member);
};

export { saveNewsletterMember }
