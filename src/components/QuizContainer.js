import React, { useEffect } from 'react'
import CONSTANTS from '../constants'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import quizService from '../api/quizService'

const QuizContainer = ({ gotQuizData }) => {
  useEffect(() => {
    const fetchData = async () => {
      const data = await quizService.getAll()
      gotQuizData(data)
    }
    fetchData()
  },[gotQuizData])

  return (
    <div>
      <h1>QUIZ WILL BE HERE</h1>
    </div>
  )
}

const mapStateToProps = state => ({
  quizData: state.appState.quizData
})

const mapDispatchToProps = dispatch => ({
  gotQuizData: data => {
    dispatch({
      type: CONSTANTS.QUIZ_DATA,
      payload: data
    })
  }
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizContainer))
