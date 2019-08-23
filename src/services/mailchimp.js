import Axios from 'axios'

const axios = Axios.create({
  baseURL: 'https://dry-hollows-37141.herokuapp.com',
})

const saveMember = async (member) => {
  await axios.post('/mailchimp', member)
}

export { saveMember }
