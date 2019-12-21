import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import appStateReducer from './reducers/appStateReducer'

const reducer = combineReducers({
  appState: appStateReducer,
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store