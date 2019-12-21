import CONSTANTS from '../constants'
import initialState from '../initialState'

export default function appStateReducer(state = initialState.appState, action){
  let newState = null
  switch(action.type) {
  case CONSTANTS.QUIZ_DATA: {
    newState = Object.assign({}, state, {
      quizData: action.payload
    })
    console.log('STATTEE', newState)
    return newState
  }
  default: return state
  }
}