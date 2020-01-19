import axios from 'axios'
import store from '../store'
const baseUrl = '/api/booleanQuiz'

const createBooleanQuiz = async payload => {
  const state = store.getState()
  const config = {
    headers: { Authorization: `bearer ${state.appState.token}` }
  }
  const response = await axios.post(baseUrl, payload, config)
  return response.data
}

export default { createBooleanQuiz }
