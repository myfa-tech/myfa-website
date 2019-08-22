import Axios from 'axios'
// const mailchimp = new Mailchimp('4c8e36828bdf708259a9803abdbdafcb-us3')

const axios = Axios.create({
  baseURL: 'https://<dc>.api.mailchimp.com/3.0/',
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },
})

const getListById = async (listId) => {
  const response = await axios.get(`/lists/${listId}`)

  return response
}

export { getListById }
