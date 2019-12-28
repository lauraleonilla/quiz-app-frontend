import axios from 'axios'
const baseUrl = 'https://opentdb.com/api.php?amount=10&category=27&type=boolean'

// const create = async newObject => {
//   const config = {
//     headers: { Authorization: token }
//   }
//   const response = await axios.post(baseUrl, newObject, config)
//   return response.data
// }

const getAll = async () => {
  const data = await axios.get(baseUrl)
  return data.data.results
}

const saveScore = async payload => {
  const scoreUrl = '/api/quiz/score'
  const response = await axios.post(scoreUrl, payload)
  return response.data
}

export default { getAll, saveScore }