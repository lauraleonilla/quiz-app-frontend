import React from 'react'
import QuizContainer from './components/QuizContainer'
import './App.scss'
import { connect } from 'react-redux'

const App = () => {

  return (
    <div className='App'>
      <h1>Welcome to play quizzes!</h1>
      <QuizContainer/>
    </div>
  )
}

// const mapStateToProps = () => {
// }

// const mapDispatchToProps = {
// }

export default connect(
  null,
  null
)(App)
