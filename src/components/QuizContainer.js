import React, { useEffect } from 'react'
import CONSTANTS from '../constants'
import { Button } from 'semantic-ui-react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import quizService from '../api/quizService'

const QuizContainer = ({ gotQuizData }, props) => {
  console.log(props)
  useEffect(() => {
    const fetchData = async () => {
      const data = await quizService.getAll()
      gotQuizData(data)
    }
    fetchData()
  },[gotQuizData])

  const clickHandler = props => {
    const path = 'quiz'
    props.history.push(path)
  }

  return (
    <div>
      <Button content='Click to start!' onClick={() => clickHandler(props)}/>
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
