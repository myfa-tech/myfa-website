import Axios from 'axios';

import UserStorage from './UserStorage';

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const saveNewsletterMember = async (member) => {
  await Axios.post(`${REACT_APP_BACKEND_URL}/newsletter/member`, member);
};

const sendBasketCommentMail = async (data) => {
  let JWT_TOKEN = UserStorage.getToken();

  let axios = Axios.create({
    baseURL: REACT_APP_BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  await axios.post('/baskets/comments', data);
};

export { saveNewsletterMember, sendBasketCommentMail };
