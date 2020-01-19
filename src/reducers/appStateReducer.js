import CONSTANTS from '../constants'
import initialState from '../initialState'

const appStateReducer = (state = initialState.appState, action) => {
  let newState = null
  switch (action.type) {
    case CONSTANTS.QUIZ_DATA: {
      newState = Object.assign({}, state, {
        quizData: action.payload
      })
      return newState
    }
    case CONSTANTS.FILM_QUIZ_DATA: {
      newState = Object.assign({}, state, {
        filmQuizData: action.payload
      })
      return newState
    }
    case CONSTANTS.GOT_USER: {
      newState = Object.assign({}, state, {
        user: action.payload
      })
      return newState
    }
    case CONSTANTS.SELECT_QUIZ: {
      newState = Object.assign({}, state, {
        selectedQuiz: action.payload
      })
      return newState
    }
    case CONSTANTS.GOT_TOKEN: {
      newState = Object.assign({}, state, {
        token: action.payload
      })
      return newState
    }
    case CONSTANTS.BOOLEAN_QUIZ_DATA: {
      newState = Object.assign({}, state, {
        booleanQuizData: [...state.booleanQuizData, action.payload]
      })
      return newState
    }
    default:
      return state
  }
}

export default appStateReducer
