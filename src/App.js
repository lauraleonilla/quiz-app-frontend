import React, { useEffect } from 'react'
import Quiz from './components/Quiz'
import './App.scss'
import axios from 'axios'
import { connect } from 'react-redux'

const App = () => {
  const url = 'https://opentdb.com/api.php?amount=10&category=27&type=boolean'
  useEffect(() => {
    const getQuizData = async () => {
      const data = await axios.get(url)
      console.log(data.data.results)
    }
    getQuizData()
  },[])

  return (
    <div className='App'>
      <h1>Welcome to play quizzes!</h1>
      <Quiz/>
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
