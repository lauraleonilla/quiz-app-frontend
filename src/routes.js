import React from 'react'
import App from './App'
import QuizContainer from './components/QuizContainer'
import Login from './components/Login'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

const Routes = () => {
  return (
    <div>
      <Router>
        <Route exact path='/' render={() => <App />} />
        <Route exact path='/quiz' render={() => <QuizContainer />} />
        <Route exact path='/login' render={() => <Login />} />
      </Router>
    </div>
  )
}

export default Routes
