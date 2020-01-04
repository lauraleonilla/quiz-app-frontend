import axios from 'axios'

// const create = async newObject => {
//   const config = {
//     headers: { Authorization: token }
//   }
//   const response = await axios.post(baseUrl, newObject, config)
//   return response.data
// }

const getAll = async () => {
  const baseUrl =
    'https://opentdb.com/api.php?amount=10&category=27&type=boolean'
  const data = await axios.get(baseUrl)
  return data.data.results
}

const getAllFilmQuiz = async () => {
  const baseUrl =
    'https://opentdb.com/api.php?amount=10&category=11&type=boolean'
  const data = await axios.get(baseUrl)
  return data.data.results
}

const saveScore = async payload => {
  const scoreUrl = '/api/quiz/score'
  const response = await axios.post(scoreUrl, payload)
  let user = window.localStorage.getItem('loggedInUser')
  user = JSON.parse(user)
  const updateScore = user.scores.find(score => {
    return score.id === response.data.id
  })
  if (updateScore) {
    const index = user.scores.indexOf(updateScore)
    user.scores.splice(index, 1)
    user.scores.push(response.data)
    window.localStorage.setItem('loggedInUser', JSON.stringify(user))
  }
  return response.data
}

export default { getAll, saveScore, getAllFilmQuiz }
