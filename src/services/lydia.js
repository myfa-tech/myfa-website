import Axios from 'axios';
import uuid from 'uuid/v4';

const BACKEND_URL = process.env.GATSBY_BACKEND_URL;

const requestPayment = async (order, userEmail) => {
  const origin = window.location.origin;
  const randomId = uuid();
  const orderRef = randomId.substr(0, 8);
  const browser_success_url = `${origin}/orders?ref=${orderRef}`;

  let JWT_TOKEN = window.localStorage.getItem('userToken');

  let axios = Axios.create({
    baseURL: BACKEND_URL,
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

	const response = await axios.post(`/lydia/pay`, {
    amount: order.price, // amount in €
    type: 'email',
    currency: 'EUR',
    recipient: userEmail, // cellphone or email
    message : `Commande MYFA`, // object of the payment
    browser_success_url,
    display_confirmation: 'no',
    payment_mail_description: `Commande MYFA`,
    order: { ...order, ref: orderRef },
  });

  if (response.data.error == 0) {
    const redirectUrl = response.data.mobile_url;

    window.location.assign(redirectUrl);
  } else {
    console.log(response.data);
  }
};

export default { requestPayment };
