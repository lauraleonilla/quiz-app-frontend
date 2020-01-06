import axios from 'axios'
import store from '../store'
const baseUrl = '/api/chat'

const getChatmessages = async () => {
  const { data } = await axios.get(baseUrl)
  return data
}

const sendChatMessage = async payload => {
  const state = store.getState()
  const config = {
    headers: { Authorization: `bearer ${state.appState.token}` }
  }
  const response = await axios.post(baseUrl, payload, config)
  return response
}

export default { getChatmessages, sendChatMessage }
