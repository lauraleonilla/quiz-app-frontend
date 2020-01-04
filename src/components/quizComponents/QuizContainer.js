import React from 'react'
import CONSTANTS from '../../constants'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './QuizPage.scss'

const QuizContainer = props => {
  const selectQuizHandler = quiz => {
    props.selectQuiz(quiz)
  }

  const renderBooleanOptions = () => {
    const quizOptions = [
      CONSTANTS.ANIMAL_QUIZ,
      CONSTANTS.FILM_QUIZ,
      CONSTANTS.COMPUTER_QUIZ
    ]
    return quizOptions.map(quiz => (
      <Link key={quiz} to={`/quiz/${quiz}`}>
        <p onClick={() => selectQuizHandler(quiz)}>{quiz}</p>
      </Link>
    ))
  }

  const renderMultipleOptions = () => {
    const quizOptions = [CONSTANTS.BOOK_QUIZ, CONSTANTS.GENERAL_QUIZ]
    return quizOptions.map(quiz => (
      <Link key={quiz} to={`/quiz/${quiz}`}>
        <p onClick={() => selectQuizHandler(quiz)}>{quiz}</p>
      </Link>
    ))
  }

  return (
    <div className='quizWrapper'>
      <h1>Select a quiz</h1>
      <div className='quizTypeContainer'>
        <div>
          <h3>True / False Quizzes</h3>
          {renderBooleanOptions()}
        </div>
        <div>
          <h3>Multiple choice quizzes</h3>
          {renderMultipleOptions()}
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  selectQuiz: data => {
    dispatch({
      type: CONSTANTS.SELECT_QUIZ,
      payload: data
    })
  }
})

export default withRouter(connect(null, mapDispatchToProps)(QuizContainer))
