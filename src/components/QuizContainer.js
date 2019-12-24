import React, { useEffect } from 'react'
import CONSTANTS from '../constants'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import quizService from '../api/quizService'

const QuizContainer = props => {

  const { gotQuizData } = props

  useEffect(() => {
    const fetchData = async () => {
      const data = await quizService.getAll()
      gotQuizData(data)
    }
    fetchData()
  },[gotQuizData])

  const selectQuizHandler = quiz => {
    props.selectQuiz(quiz)
  }

  return (
    <div>
      <h1>Select a quiz</h1>
      {props.quizData && props.quizData.length ? (
        <Link to={`/quiz/${props.quizData[0].category}`}>
          <p onClick={() => selectQuizHandler(props.quizData)}>{props.quizData[0].category}</p>
        </Link>
      ) : null}
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
  },
  selectQuiz: data => {
    dispatch({
      type: CONSTANTS.SELECT_QUIZ,
      payload: data
    })
  }
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizContainer))
