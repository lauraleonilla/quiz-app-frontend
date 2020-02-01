import React, { useState } from 'react'
import { connect } from 'react-redux'
import CONSTANTS from '../../constants'
import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react'
import AnswerField from './AnswerField'
import './quizForm.scss'

const MultiQuizInput = ({ numberOfAnswers, errorHandler, saveQuizData }) => {
  const [question, setQuestion] = useState('')
  // const [answerText, setAnswer] = useState('')
  const [answers, setAnswers] = useState([])
  const [questionSaved, setquestionSaved] = useState('')

  const newTextHandler = event => {
    setQuestion(event.target.value)
  }

  const handleresetText = () => {
    setQuestion('')
  }

  const newAnswerHandler = answer => {
    if (!answers.length) {
      return setAnswers([answer])
    }
    const res = answers.findIndex(e => {
      return e.index === answer.index
    })
    if (res === -1) {
      return setAnswers([...answers, answer])
    }
    answers[res] = answer
    setAnswers([...answers])
  }

  const buttonHandler = () => {
    if (question.length < 5) {
      errorHandler('Question should be at least 5 characters')
      return false
    }
    saveQuizData({ question, answers })
    setquestionSaved('Question saved!')
  }
  const renderAnswerInput = () => {
    const rows = [
      <AnswerField
        key={'correctAnswer'}
        index={'correct'}
        newAnswerHandler={newAnswerHandler}
        placeholder={'Correct answer'}
      />
    ]
    for (let i = 0; i < numberOfAnswers; i++) {
      rows.push(
        <AnswerField
          index={i}
          newAnswerHandler={newAnswerHandler}
          placeholder={'Incorrect answer'}
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
        content='Save'
        type='submit'
        basic
        color='purple'
        onClick={() => buttonHandler()}
      />
      <p>{questionSaved}</p>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  saveQuizData: multiQuizData => {
    dispatch({
      type: CONSTANTS.MULTI_QUIZ_DATA,
      payload: multiQuizData
    })
  }
})

export default connect(null, mapDispatchToProps)(MultiQuizInput)
