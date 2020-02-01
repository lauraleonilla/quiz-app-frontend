import axios from 'axios'
import store from '../store'

const createBooleanQuiz = async payload => {
  const baseUrl = '/api/booleanQuiz'
  const state = store.getState()
  const config = {
    headers: { Authorization: `bearer ${state.appState.token}` }
  }
  try {
    const response = await axios.post(baseUrl, payload, config)
    return response.data
  } catch (error) {
    return error.response.data
  }
}

const createMultiChoiceQuiz = async payload => {
  const baseUrl = '/api/multiQuiz'
  const state = store.getState()
  const config = {
    headers: { Authorization: `bearer ${state.appState.token}` }
  }
  try {
    const response = await axios.post(baseUrl, payload, config)
    return response.data
  } catch (error) {
    return error.response.data
  }
}

export default { createBooleanQuiz, createMultiChoiceQuiz }
