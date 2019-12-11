import axios from 'axios'

const BACKEND_URL = 'https://myfa-website-backend-js.herokuapp.com/lydia'

const requestPayment = async (modalInfo, form) => {
  const { orderRef } = modalInfo
  const browser_success_url = `/order_success?order_ref=${orderRef}`
  const confirm_url = `${BACKEND_URL}/confirm_payment?order_ref=${orderRef}`
  const cancel_url = `${BACKEND_URL}/cancel_payment?order_ref=${orderRef}`

	const response = await axios.post(`${BACKEND_URL}/pay`, {
    amount: modalInfo.amount, // amount in €
    vendor_token: '5dea5304040f5444474416',
    type: 'email',
    currency: 'EUR',
    recipient: form.email, // cellphone or email of your client. Leave it like this for your test
    message : modalInfo.message, //object of the payment
    // browser_success_url,
    confirm_url,
    cancel_url,
    basketRecipient: form.recipientPhone,
  })

  if (response.data.error == 0) {
    const redirectUrl = response.data.mobile_url
    window.location.assign(redirectUrl)
  } else {
    console.log(response.data)
  }
}

export default { requestPayment }
