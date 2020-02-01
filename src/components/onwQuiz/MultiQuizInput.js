import React, { useState } from 'react'
import { connect } from 'react-redux'
import CONSTANTS from '../../constants'
import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react'
import './quizForm.scss'

const MultiQuizInput = ({ numberOfAnswers, errorHandler, saveQuizData }) => {
  const [question, setQuestion] = useState('')
  const [answerText, setAnswer] = useState('')
  const [questionSaved, setquestionSaved] = useState('')

  const newTextHandler = event => {
    setQuestion(event.target.value)
  }

  const handleresetText = () => {
    setQuestion('')
  }

  const handleresetAnswer = () => {
    setAnswer('')
  }

  const newAnswerHandler = event => {
    setAnswer(event.target.value)
  }

  const buttonHandler = () => {
    if (question.length < 5) {
      errorHandler('Question should be at least 5 characters')
      return false
    }
    saveQuizData({ question, answerText })
    setquestionSaved('Question saved!')
  }
  const renderAnswerInput = () => {
    const rows = []
    for (let i = 0; i < numberOfAnswers; i++) {
      rows.push(
        <Input
          className='inputField'
          icon={<Icon name='delete' link onClick={() => handleresetAnswer()} />}
          placeholder='Answer'
          value={answerText}
          onChange={newAnswerHandler}
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
