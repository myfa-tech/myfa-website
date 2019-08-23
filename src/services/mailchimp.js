import Axios from 'axios'

const axios = Axios.create({
  baseURL: 'https://dry-hollows-37141.herokuapp.com',
})

const saveMember = async (member) => {
  const response = await axios.post('/mailchimp', member)

  return response
}

export { saveMember }
