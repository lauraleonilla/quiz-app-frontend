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
    if (state.booleanQuizData.length) {
      const indexExists = state.booleanQuizData.findIndex(
        e => e.questionIndex === action.payload.questionIndex
      )
      if (indexExists >= 0) {
        state.booleanQuizData[indexExists] = action.payload
        newState = Object.assign({}, state, {
          booleanQuizData: [...state.booleanQuizData]
        })
      } else {
        newState = Object.assign({}, state, {
          booleanQuizData: [...state.booleanQuizData, action.payload]
        })
      }
    } else {
      newState = Object.assign({}, state, {
        booleanQuizData: [...state.booleanQuizData, action.payload]
      })
    }
    return newState
  }
  case CONSTANTS.MULTI_QUIZ_DATA: {
    if (state.multiQuizData.length) {
      const indexExists = state.multiQuizData.findIndex(
        e => e.questionIndex === action.payload.questionIndex
      )
      if (indexExists >= 0) {
        state.multiQuizData[indexExists] = action.payload
        newState = Object.assign({}, state, {
          multiQuizData: [...state.multiQuizData]
        })
      } else {
        newState = Object.assign({}, state, {
          multiQuizData: [...state.multiQuizData, action.payload]
        })
      }
    } else {
      newState = Object.assign({}, state, {
        multiQuizData: [...state.multiQuizData, action.payload]
      })
    }
    return newState
  }
  default:
    return state
  }
}

export default appStateReducer
