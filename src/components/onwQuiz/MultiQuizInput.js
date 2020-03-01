import React, { useState } from 'react'
import { connect } from 'react-redux'
import CONSTANTS from '../../constants'
import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react'
import AnswerField from './AnswerField'
import './quizForm.scss'

const MultiQuizInput = ({
  numberOfAnswers,
  errorHandler,
  saveQuizData,
  questionIndex
}) => {
  const [question, setQuestion] = useState('')
  const [correct_answer, setCorrectAnswer] = useState('')
  const [incorrect_answers, setAnswers] = useState([])
  const [questionSaved, setquestionSaved] = useState('')

  const newTextHandler = event => {
    setQuestion(event.target.value)
  }

  const handleresetText = () => {
    setQuestion('')
  }

  const newAnswerHandler = answer => {
    if (!incorrect_answers.length) {
      return setAnswers([answer])
    }
    if (answer.index === 'correct') {
      return setCorrectAnswer(answer)
    }
    const res = incorrect_answers.findIndex(e => {
      return e.index === answer.index
    })
    if (res === -1) {
      return setAnswers([...incorrect_answers, answer])
    }
    incorrect_answers[res] = answer
    setAnswers([...incorrect_answers])
  }

  const buttonHandler = () => {
    if (question.length < 5) {
      errorHandler('Question should be at least 5 characters')
      return false
    }
    if (incorrect_answers.length < numberOfAnswers) {
      errorHandler('You have not filled in all the asnwers')
      return false
    }
    saveQuizData({
      questionIndex: questionIndex,
      question,
      correct_answer,
      incorrect_answers
    })
    setquestionSaved('Question saved!')
  }
  const renderAnswerInput = () => {
    const rows = [
      <AnswerField
        key={'correctAnswer'}
        index={'correct'}
        newAnswerHandler={newAnswerHandler}
        placeholder={'Correct answer'}
        correct={true}
      />
    ]
    for (let i = 0; i < numberOfAnswers; i++) {
      rows.push(
        <AnswerField
          index={i}
          newAnswerHandler={newAnswerHandler}
          placeholder={'Incorrect answer'}
          correct={false}
        />
      )
    }
    return (
      <div className='answerRow'>
        {rows.map((row, index) => (
          <div key={index}>{row}</div>
        ))}
      </div>
    )
  }

  return (
    <div className='quizRow'>
      <Input
        className='inputField'
        icon={<Icon name='delete' link onClick={() => handleresetText()} />}
        placeholder='Question'
        value={question}
        onChange={newTextHandler}
      />
      {renderAnswerInput()}
      <Button
        className='saveBtn'
        content='Save question'
        type='submit'
        basic
        color='purple'
        onClick={() => buttonHandler()}
      />
      <p>{questionSaved}</p>
    </div>
  )
}

const mapStateToProps = state => ({
  multiQuizData: state.appState.multiQuizData
})

const mapDispatchToProps = dispatch => ({
  saveQuizData: multiQuizData => {
    dispatch({
      type: CONSTANTS.MULTI_QUIZ_DATA,
      payload: multiQuizData
    })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MultiQuizInput)
