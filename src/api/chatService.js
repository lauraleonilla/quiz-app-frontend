import axios from 'axios'
const baseUrl = '/api/chat'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getChatmessages = async () => {
  const { data } = await axios.get(baseUrl)
  return data
}

const sendChatMessage = async payload => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, payload, config)
  return response
}

export default { getChatmessages, setToken, sendChatMessage }
