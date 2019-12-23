import axios from 'axios'
const baseUrl = '/api/users'

const createUser = async payload => {
  const response = await axios.post(baseUrl, payload)
  return response.data
}

export default { createUser }