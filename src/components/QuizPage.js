import React, { useState } from 'react'
import CONSTANTS from '../constants'
import { Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const QuizPage = props => {
  console.log('Quiz props', props)
  const [currentQuestion, setcurrentQuestion] = useState(0)

  const renderQuestion = () => {
    return props.selectedQuiz[currentQuestion].question

  }

  const nextQuestionHandler = () => {
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
              <Button basic color='purple' content='True' onClick={() => nextQuestionHandler()} />
              <Button basic color='purple' content='False' onClick={() => nextQuestionHandler()} />
            </div>)
            : null}
        </div>
        : null }
    </div>
  )
}

const mapStateToProps = state => ({
  selectedQuiz: state.appState.selectedQuiz
})


export default withRouter(connect(
  mapStateToProps,
  null
)(QuizPage))
