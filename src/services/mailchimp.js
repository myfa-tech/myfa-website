import Axios from 'axios'

const axios = Axios.create({
  baseURL: 'https://myfa-website-backend-js.herokuapp.com',
})

const saveMember = async (member) => {
  await axios.post('/mailchimp', member)
}

export { saveMember }
