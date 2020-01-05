import axios from 'axios'
import CONSTANTS from '../constants'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getQuizdata = async selectedQuiz => {
  let baseUrl = null
  if (selectedQuiz === CONSTANTS.ANIMAL_QUIZ) {
    baseUrl =
      'https://opentdb.com/api.php?amount=10&category=27&type=boolean&encode=base64'
  }
  if (selectedQuiz === CONSTANTS.FILM_QUIZ) {
    baseUrl =
      'https://opentdb.com/api.php?amount=10&category=11&type=boolean&encode=base64'
  }
  if (selectedQuiz === CONSTANTS.BOOK_QUIZ) {
    baseUrl =
      'https://opentdb.com/api.php?amount=10&category=10&difficulty=easy&type=multiple&encode=base64'
  }
  if (selectedQuiz === CONSTANTS.COMPUTER_QUIZ) {
    baseUrl =
      'https://opentdb.com/api.php?amount=10&category=18&type=boolean&encode=base64'
  }
  if (selectedQuiz === CONSTANTS.GENERAL_QUIZ) {
    baseUrl =
      'https://opentdb.com/api.php?amount=10&category=9&type=multiple&encode=base64'
  }
  const data = await axios.get(baseUrl)
  return data.data.results
}

const saveScore = async payload => {
  const scoreUrl = '/api/quiz/score'
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(scoreUrl, payload, config)
  let user = window.localStorage.getItem('loggedInUser')
  user = JSON.parse(user)
  if (response.data.message) {
    const updateScore = user.scores.find(score => {
      return score.id === response.data.newScore.id
    })
    const index = user.scores.indexOf(updateScore)
    user.scores.splice(index, 1)
    user.scores.push(response.data.newScore)
    window.localStorage.setItem('loggedInUser', JSON.stringify(user))
  } else {
    user.scores.push(response.data)
    window.localStorage.setItem('loggedInUser', JSON.stringify(user))
  }
  return response.data
}

export default { getQuizdata, saveScore, setToken }
