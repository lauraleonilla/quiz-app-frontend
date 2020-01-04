import React, { useState, useEffect } from 'react'
import CONSTANTS from '../../constants'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import quizService from '../../api/quizService'
import Boolean from './Boolean'
import MultipleChoice from './MultipleChoice'
import './QuizPage.scss'

const QuizPage = props => {
  const [currentQuestion, setcurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [message, setMessage] = useState(null)

  const { gotQuizData, match } = props

  useEffect(() => {
    const fetchData = async () => {
      const selectedQuiz = match.params.selectedQuiz
      const data = await quizService.getQuizdata(selectedQuiz)
      gotQuizData(data)
    }
    fetchData()
  }, [gotQuizData, match])

  const scoreHandler = async () => {
    const payload = {
      quiz: atob(props.quizData[0].category),
      userId: props.user.id,
      score
    }
    const response = await quizService.saveScore(payload)
    if (!response.message) {
      const concatScores = props.user.scores.concat(response)
      props.gotUser({ ...props.user, scores: concatScores })
    } else {
      setMessage(`Your new score is ${response.newScore.score}`)
    }
  }

  const nextQuestionHandler = async answer => {
    const correctAnswer = atob(props.quizData[currentQuestion].correct_answer)
    if (answer === correctAnswer) {
      const newScore = score + 1
      setScore(newScore)
    }
    const newIndex = currentQuestion + 1
    if (newIndex === props.quizData.length) {
      setcurrentQuestion(null)
      scoreHandler()
    } else {
      setcurrentQuestion(newIndex)
    }
  }

  const renderQuestion = () => {
    return (
      <div className='questionContainer'>
        <h3>{atob(props.quizData[currentQuestion].question)}</h3>
      </div>
    )
  }

  const renderOptions = () => {
    if (atob(props.quizData[currentQuestion].type) === CONSTANTS.BOOLEAN) {
      return <Boolean nextQuestionHandler={nextQuestionHandler} />
    }
    if (atob(props.quizData[currentQuestion].type) === CONSTANTS.MULTIPLE) {
      return (
        <MultipleChoice
          nextQuestionHandler={nextQuestionHandler}
          currentQuestion={props.quizData[currentQuestion]}
        />
      )
    }
  }

  return (
    <div>
      <h2>{message}</h2>
      {props.quizData[currentQuestion] ? (
        <div>
          {renderQuestion()}
          {renderOptions()}
        </div>
      ) : (
        <Link to='/quiz'>Back to quizzes</Link>
      )}
      <h3>Score: {score}</h3>
    </div>
  )
}

const mapStateToProps = state => ({
  quizData: state.appState.quizData,
  currentScore: state.appState.currentScore,
  user: state.appState.user
})

const mapDispatchToProps = dispatch => ({
  gotQuizData: data => {
    dispatch({
      type: CONSTANTS.QUIZ_DATA,
      payload: data
    })
  },
  gotUser: user => {
    dispatch({
      type: CONSTANTS.GOT_USER,
      payload: user
    })
  }
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(QuizPage)
)
