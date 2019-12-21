import React from 'react'
import App from './App'
import QuizContainer from './components/QuizContainer'
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
      </Router>
    </div>
  )
}

export default Routes
