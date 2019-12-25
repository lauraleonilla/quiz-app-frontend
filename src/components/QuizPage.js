import React, { useState, useEffect } from 'react'
import CONSTANTS from '../constants'
import { Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './QuizPage.scss'

const QuizPage = props => {
  const [currentQuestion, setcurrentQuestion] = useState(0)

  const { resetScore } = props

  useEffect(() => {
    return () => {
      resetScore()
    }
  }, [resetScore])

  const renderQuestion = () => {
    return (<div className='questionContainer'>
      <h3>{props.selectedQuiz[currentQuestion].question}</h3>
    </div>)
  }

  const nextQuestionHandler = (answer) => {
    const correctAnswer = props.selectedQuiz[currentQuestion].correct_answer
    if(answer === correctAnswer) {
      props.setScore()
    }
    const newIndex = currentQuestion + 1
    setcurrentQuestion(newIndex)
  }

  return (
    <div>
      {props.selectedQuiz[currentQuestion] ?
        <div>
          {renderQuestion()}
          {props.selectedQuiz[currentQuestion].type === CONSTANTS.BOOLEAN ? (
            <div>
              <Button basic color='purple' content='True' onClick={() => nextQuestionHandler('True')} />
              <Button basic color='purple' content='False' onClick={() => nextQuestionHandler('False')} />
            </div>)
            : null}
        </div>
        : null }
      <h3>Score: {props.currentScore}</h3>
    </div>
  )
}

const mapStateToProps = state => ({
  selectedQuiz: state.appState.selectedQuiz,
  currentScore: state.appState.currentScore
})

const mapDispatchToProps = dispatch => ({
  setScore: () => {
    dispatch({
      type: CONSTANTS.CURRENT_SCORE
    })
  },
  resetScore: () => {
    dispatch({
      type: CONSTANTS.RESET_SCORE
    })
  }
})


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizPage))
