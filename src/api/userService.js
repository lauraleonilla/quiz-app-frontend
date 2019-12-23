import axios from 'axios'
const baseUrl = '/api/users'

// eslint-disable-next-line no-unused-vars
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const createUser = async payload => {
  const response = await axios.post(baseUrl, payload)
  return response.data
}

export default { createUser, setToken }