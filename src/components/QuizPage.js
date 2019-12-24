import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const QuizPage = props => {
  console.log('Quiz props', props)
  return (
    <div>
         Here will be qustion
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
