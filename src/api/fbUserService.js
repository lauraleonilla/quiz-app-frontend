import axios from 'axios'
const baseUrl = '/api/fbuser'

const createFbUser = async payload => {
  const response = await axios.post(baseUrl, payload)
  return response.data
}

export default { createFbUser }