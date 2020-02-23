import React, { useState, useEffect } from 'react'
import CONSTANTS from '../../constants'
import quizService from '../../api/quizService'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './QuizPage.scss'

const QuizContainer = props => {
  const [userTopics, setUserQuizTopics] = useState([])

  const selectQuizHandler = quiz => {
    props.selectQuiz(quiz)
  }

  useEffect(() => {
    const fetchData = async () => {
      const userQuizTopics = await quizService.getUserQuizTopics()
      setUserQuizTopics(userQuizTopics)
    }
    fetchData()
  }, [])

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

  const renderUserMultipleChoice = () => {
    if (userTopics.multipleChoie && userTopics.multipleChoie.length) {
      return userTopics.multipleChoie.map(quiz => (
        <Link key={quiz.id} to={`/quiz/multipleChoice/${quiz.id}`}>
          <p onClick={() => selectQuizHandler(quiz.id)}>{quiz.quizTitle}</p>
        </Link>
      ))
    }
  }

  const renderUserBoolean = () => {
    if (userTopics.boolean && userTopics.boolean.length) {
      return userTopics.boolean.map(quiz => (
        <Link key={quiz.id} to={`/quiz/boolean/${quiz.id}`}>
          <p onClick={() => selectQuizHandler(quiz.id)}>{quiz.quizTitle}</p>
        </Link>
      ))
    }
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
      <h2>User generated quizzes</h2>
      <div className='userQuizContainer'>
        <div>
          <h3>Multiple choice quizzes</h3>
          {renderUserMultipleChoice()}
        </div>
        <div>
          <h3>True / False Quizzes</h3>
          {renderUserBoolean()}
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
