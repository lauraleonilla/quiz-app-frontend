import React, { useState } from 'react'
import CONSTANTS from '../constants'
import { Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const QuizPage = props => {
  console.log('Quiz props', props)
  const [currentQuestion, setcurrentQuestion] = useState(0)

  const renderQuestions = () => {
    return props.selectedQuiz[currentQuestion].question
  }

  const clickHandler = () => {
    console.log('lol')
  }

  return (
    <div>
      {renderQuestions()}
      {props.selectedQuiz[currentQuestion].type === CONSTANTS.BOOLEAN ? (
        <div>
          <Button basic color='purple' content='True' onClick={() => clickHandler()} />
          <Button basic color='purple' content='False' onClick={() => clickHandler()} />
        </div>)
        : null}
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
