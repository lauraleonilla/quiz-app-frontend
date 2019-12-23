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
  default: return state
  }
}