
import Axios from 'axios';
import uuid from 'uuid/v4';
import UserStorage from './UserStorage';

const BACKEND_URL = process.env.BACKEND_URL;

const redirectToOrder = (successUrl) => {
  if (typeof window !== 'undefined') {
    window.location.assign(successUrl);
  }
};

const createPayment = async (order, user) => {
  const origin = window.location.origin;
  const randomId = uuid();
  const orderRef = randomId.substr(0, 8);
  let JWT_TOKEN = UserStorage.getToken();
  const success_url = `${origin}/mobile_money_orders?ref=${orderRef}`;

  let axios = Axios.create({
    baseURL: BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

	await axios.post('/mobile_money/orders', {
    order: { ...order, ref: orderRef },
    user,
  });

  redirectToOrder(success_url);
};

export default { createPayment };
