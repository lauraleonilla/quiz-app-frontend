import React, { useState, useEffect } from 'react'
import CONSTANTS from '../../constants'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import quizService from '../../api/quizService'
import Boolean from './Boolean'
import MultipleChoice from './MultipleChoice'
import './QuizPage.scss'

const QuizPage = props => {
  const [currentQuestion, setcurrentQuestion] = useState(0)

  const { gotQuizData, match } = props

  useEffect(() => {
    const fetchData = async () => {
      const selectedQuiz = match.params.selectedQuiz
      const data = await quizService.getQuizdata(selectedQuiz)
      gotQuizData(data)
    }
    fetchData()
  }, [gotQuizData, match])

  const nextQuestionHandler = async answer => {
    const correctAnswer = atob(props.quizData[currentQuestion].correct_answer)
    if (answer === correctAnswer) {
      props.setScore()
    }
    const newIndex = currentQuestion + 1
    if (newIndex === props.quizData.length) {
      const payload = {
        quiz: atob(props.quizData[0].category),
        userId: props.user.id,
        score: props.currentScore
      }
      const res = await quizService.saveScore(payload)
      const concatScores = props.user.scores.concat(res)
      props.gotUser({ ...props.user, scores: concatScores })
    }
    setcurrentQuestion(newIndex)
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
      {props.quizData[currentQuestion] ? (
        <div>
          {renderQuestion()}
          {renderOptions()}
        </div>
      ) : null}
      <h3>Score: {props.currentScore}</h3>
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
  setScore: () => {
    dispatch({
      type: CONSTANTS.CURRENT_SCORE
    })
  },
  resetScore: () => {
    dispatch({
      type: CONSTANTS.RESET_SCORE
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
