import axios from 'axios'
const baseUrl = '/api/user'

const createUser = async payload => {
  const response = await axios.post(baseUrl, payload)
  console.log(`AAAAAAAA`, response)
  return response.data
}

export default { createUser }
