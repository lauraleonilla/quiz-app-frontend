import React, { useEffect } from 'react'
import CONSTANTS from '../constants'
import { Button } from 'semantic-ui-react'
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
      <Button content='Click to start!' />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizContainer)
