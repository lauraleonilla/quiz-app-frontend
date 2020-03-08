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
      const type = match.path.split('/quiz/')[1]
      let quizData = null
      if (type && type === 'multipleChoice/:selectedQuiz') {
        quizData = await quizService.getQuizdata(
          CONSTANTS.MULTIPLE,
          selectedQuiz
        )
      }
      if (type && type === 'boolean/:selectedQuiz') {
        quizData = await quizService.getQuizdata(
          CONSTANTS.BOOLEAN,
          selectedQuiz
        )
      }
      if (type && type === ':selectedQuiz') {
        quizData = await quizService.getQuizdata(null, selectedQuiz)
      }
      gotQuizData(quizData)
    }
    fetchData()
  }, [gotQuizData, match])

  const scoreHandler = async isOwnQuiz => {
    let payload = {}
    if (!isOwnQuiz) {
      payload = {
        quiz: atob(props.quizData[0].category),
        userId: props.user.id,
        score
      }
    } else {
      payload = {
        quiz: props.quizData.quizTitle,
        userId: props.user.id,
        score
      }
    }
    const response = await quizService.saveScore(payload)
    if (!response.message) {
      const concatScores = props.user.scores.concat(response)
      props.gotUser({ ...props.user, scores: concatScores })
      setMessage(`You scored ${response.score}!`)
    } else {
      setMessage(`Your new score is ${response.newScore.score}!`)
      const updateScore = props.user.scores.find(score => {
        return score.id === response.newScore.id
      })
      const index = props.user.scores.indexOf(updateScore)
      props.user.scores.splice(index, 1)
      props.user.scores.push(response.newScore)
      props.gotUser({ ...props.user })
    }
  }

  const nextQuestionHandler = answer => {
    let correctAnswer = null
    if (!props.quizData.questions) {
      correctAnswer = atob(props.quizData[currentQuestion].correct_answer)
    } else {
      correctAnswer =
        props.quizData.questions[currentQuestion].correctAnswer ||
        props.quizData.questions[currentQuestion].correct_answer
    }
    if (answer === correctAnswer) {
      setScore(score + 1)
    }
    if (
      props.quizData.questions &&
      currentQuestion === props.quizData.questions.length - 1
    ) {
      const isOwnQuiz = true
      scoreHandler(isOwnQuiz)
      setcurrentQuestion(null)
    }
    if (
      !props.quizData.questions &&
      currentQuestion === props.quizData.length - 1
    ) {
      scoreHandler()
      setcurrentQuestion(null)
    } else {
      return setcurrentQuestion(currentQuestion + 1)
    }
  }

  const renderQuestion = () => {
    return (
      <div className='questionContainer'>
        <h3>
          {props.quizData.questions
            ? props.quizData.questions[currentQuestion].question
            : atob(props.quizData[currentQuestion].question)}
        </h3>
      </div>
    )
  }

  const renderOptions = () => {
    if (
      (!props.quizData.questions &&
        atob(props.quizData[currentQuestion].type) === CONSTANTS.BOOLEAN) ||
      (props.quizData.questions &&
        props.quizData.questions[currentQuestion].type === CONSTANTS.BOOLEAN)
    ) {
      return <Boolean nextQuestionHandler={nextQuestionHandler} />
    }
    if (
      (!props.quizData.questions &&
        atob(props.quizData[currentQuestion].type) === CONSTANTS.MULTIPLE) ||
      (props.quizData.questions &&
        props.quizData.questions[currentQuestion].type === CONSTANTS.MULTIPLE)
    ) {
      return (
        <MultipleChoice
          nextQuestionHandler={nextQuestionHandler}
          currentQuestion={
            !props.quizData.questions
              ? props.quizData[currentQuestion]
              : props.quizData.questions[currentQuestion]
          }
        />
      )
    }
  }

  return (
    <div>
      <h2>{message}</h2>
      {(props.quizData && props.quizData[currentQuestion]) ||
      (props.quizData.questions &&
        props.quizData.questions[currentQuestion]) ? (
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
