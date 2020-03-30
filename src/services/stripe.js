import Axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import uuid from 'uuid/v4';

const BACKEND_URL = process.env.GATSBY_BACKEND_URL;

const redirectToCheckout = async (id) => {
  const stripe = await loadStripe(process.env.GATSBY_STRIPE_PUSHABLE_API_KEY);

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
}

const createPayment = async (order, userEmail) => {
  const origin = window.location.origin;
  const randomId = uuid();
  const orderRef = randomId.substr(0, 8);
  let JWT_TOKEN = window.localStorage.getItem('userToken');
  const success_url = `${origin}/orders?ref=${orderRef}`;

  let axios = Axios.create({
    baseURL: BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

	const response = await axios.post('/stripe/pay', {
    order: { ...order, ref: orderRef },
    user: { email: userEmail },
    success_url,
  });

  if (response.data.id === 'test') {
    redirectToOrder(success_url);
  } else {
    redirectToCheckout(response.data.id);
  }
};

export default { createPayment };
