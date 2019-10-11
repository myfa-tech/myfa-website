import Axios from 'axios'

const axios = Axios.create({
  baseURL: 'https://myfa-website-backend.herokuapp.com',
})

const saveMember = async (member) => {
  await axios.post('/mailchimp', member)
}

export { saveMember }
