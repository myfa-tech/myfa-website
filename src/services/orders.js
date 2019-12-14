
import axios from 'axios'

const BACKEND_URL = 'https://myfa-website-backend-js.herokuapp.com/baskets'

const getOrdersByRef = async (ref) => {
  const response = await axios.get(`${BACKEND_URL}?ref=${ref}`)
  return response.data
}

export { getOrdersByRef }
