import axios from 'axios'
import uuid from 'uuid/v4'

import { countBaskets } from './orders'
const BACKEND_URL = 'https://myfa-website-backend.herokuapp.com/lydia'

const requestPayment = async (basketInfo, { recipient, userEmail, zone }) => {
  const origin = window.location.origin;
  const randomId = uuid();
  let basketsCount = await countBaskets();
  const orderRef = randomId.substr(0, 8);
  const browser_success_url = `${origin}/orders?ref=${orderRef}&type=${basketInfo.type}`
  const confirm_url = `${BACKEND_URL}/confirm_payment?order_ref=${orderRef}`
  const cancel_url = `${BACKEND_URL}/cancel_payment?order_ref=${orderRef}`

	const response = await axios.post(`${BACKEND_URL}/pay`, {
    amount: basketInfo.price, // amount in €
    type: 'email',
    currency: 'EUR',
    recipient: userEmail, // cellphone or email
    message : `Commande panier ${basketInfo.name}`, // object of the payment
    browser_success_url,
    display_confirmation: 'no',
    payment_mail_description: `Commande panier ${basketInfo.name}. Suivez la livraison ici : ${origin}/orders?ref=${orderRef}`,
    confirm_url,
    cancel_url,
    basket: {
      orderRef,
      type: basketInfo.type,
      status: 'pending',
      count: `#${Number(basketsCount) + 1}`,
      userEmail,
      recipient,
      zone,
      ...basketInfo,
    }
  })

  if (response.data.error == 0) {
    const redirectUrl = response.data.mobile_url
    window.location.assign(redirectUrl)
  } else {
    console.log(response.data)
  }
}

export default { requestPayment }
