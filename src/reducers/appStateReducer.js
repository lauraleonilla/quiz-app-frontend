import CONSTANTS from '../constants'
import initialState from '../initialState'

export default function appStateReducer(state = initialState.appState, action){
  let newState = null
  switch(action.type) {
  case CONSTANTS.QUIZ_DATA: {
    newState = Object.assign({}, state, {
      quizData: action.payload
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
  case CONSTANTS.CURRENT_SCORE: {
    newState = Object.assign({}, state, {
      currentScore: state.currentScore += 1
    })
    return newState
  }
  case CONSTANTS.RESET_SCORE: {
    newState = Object.assign({}, state, {
      currentScore: state.currentScore = 0
    })
    return newState
  }
  default: return state
  }
}