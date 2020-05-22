import Axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import uuid from 'uuid/v4';
import UserStorage from './UserStorage';

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const redirectToCheckout = async (id) => {
  const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUSHABLE_API_KEY);

  const { error } = await stripe.redirectToCheckout({
    sessionId: id,
  });

  if (error) {
    console.log(error);
  }
};

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
  const success_url = `${origin}/orders?ref=${orderRef}`;

  let axios = Axios.create({
    baseURL: REACT_APP_BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

	const response = await axios.post('/stripe/pay', {
    order: { ...order, ref: orderRef },
    user,
    success_url,
  });

  if (response.data.id === 'test') {
    redirectToOrder(success_url);
  } else {
    redirectToCheckout(response.data.id);
  }
};

export default { createPayment };
