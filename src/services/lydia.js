import axios from 'axios'
import uuid from 'uuid/v4'

const BACKEND_URL = 'https://myfa-website-backend-js.herokuapp.com/lydia'

const requestPayment = async (basketInfo, form) => {
  const randomId = uuid()
  const orderRef = `myfa-${randomId}`
  const browser_success_url = `https://www.myfa.fr/orders?ref=${orderRef}`
  const confirm_url = `${BACKEND_URL}/confirm_payment?order_ref=${orderRef}`
  const cancel_url = `${BACKEND_URL}/cancel_payment?order_ref=${orderRef}`

	const response = await axios.post(`${BACKEND_URL}/pay`, {
    amount: basketInfo.price, // amount in €
    type: 'email',
    currency: 'EUR',
    recipient: form.email, // cellphone or email of your client. Leave it like this for your test
    message : basketInfo.message, //object of the payment
    browser_success_url,
    display_confirmation: 'no',
    payment_mail_description: `Vous avez commandé le panier ${basketInfo.name}. Suivez la livraison ici : https://www.myfa.fr/orders?ref=${orderRef}`,
    confirm_url,
    cancel_url,
    basket: {
      orderRef,
      userEmail: form.email,
      ...basketInfo,
      recipientPhone: form.recipientPhone,
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
