import Axios from 'axios'

const saveMember = async (member) => {
  let JWT_TOKEN = window.localStorage.getItem('myfaDashboardToken');

  let axios = Axios.create({
    baseURL: 'https://myfa-website-backend.herokuapp.com',
    headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
  });

  await axios.post('/mailchimp', member)
}

export { saveMember }
