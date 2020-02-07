import Axios from 'axios';
import uuid from 'uuid/v4';

const BACKEND_URL = 'https://myfa-website-backend.herokuapp.com/lydia';

const requestPayment = async (order, userEmail) => {
  const origin = window.location.origin;
  const randomId = uuid();
  const orderRef = randomId.substr(0, 8);
  const browser_success_url = `${origin}/orders?ref=${orderRef}`;
  const confirm_url = `${BACKEND_URL}/confirm_payment?order_ref=${orderRef}`;
  const cancel_url = `${BACKEND_URL}/cancel_payment?order_ref=${orderRef}`;

  let JWT_TOKEN = window.localStorage.getItem('userToken');

  let axios = Axios.create({
    baseURL: 'https://myfa-website-backend.herokuapp.com',
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

	const response = await axios.post(`${BACKEND_URL}/pay`, {
    amount: order.price, // amount in €
    type: 'email',
    currency: 'EUR',
    recipient: userEmail, // cellphone or email
    message : `Commande MYFA`, // object of the payment
    browser_success_url,
    display_confirmation: 'no',
    payment_mail_description: `Commande MYFA`,
    confirm_url,
    cancel_url,
    order,
  });

  if (response.data.error == 0) {
    const redirectUrl = response.data.mobile_url;
    window.location.assign(redirectUrl);
  } else {
    console.log(response.data);
  }
};

export default { requestPayment };
