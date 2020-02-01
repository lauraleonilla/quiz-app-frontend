import React, { useState } from 'react'
import { connect } from 'react-redux'
import CONSTANTS from '../../constants'
import { Form, Radio } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react'
import './quizForm.scss'

const BooleanQuizInput = props => {
  const [question, setQuestion] = useState('')
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [questionSaved, setquestionSaved] = useState('')

  const newTextHandler = event => {
    setQuestion(event.target.value)
  }

  const handleresetText = () => {
    setQuestion('')
  }

  const handleRadioButnChange = e => {
    if (e.target.textContent === 'True') {
      setCorrectAnswer(true)
    }
    if (e.target.textContent === 'False') {
      setCorrectAnswer(false)
    }
  }

  const buttonHandler = () => {
    if (question.length < 5) {
      props.errorHandler('Question should be at least 5 characters')
      return false
    }
    props.saveQuizData({ question, correctAnswer })
    setquestionSaved('Question saved!')
  }

  return (
    <div className='booleanWrapper'>
      <Input
        className='inputField'
        icon={<Icon name='delete' link onClick={() => handleresetText()} />}
        placeholder='Question'
        value={question}
        onChange={newTextHandler}
      />
      <div>
        <Form className='answerForm'>
          <Form.Field>
            <Radio
              label='False'
              name='radioGroup'
              value='false'
              onChange={handleRadioButnChange}
              // checked={correctAnswer === false}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label='True'
              name='radioGroup'
              value='true'
              onChange={handleRadioButnChange}
              // checked={correctAnswer === true}
            />
          </Form.Field>
        </Form>
      </div>
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
  saveQuizData: booleanQuizData => {
    dispatch({
      type: CONSTANTS.BOOLEAN_QUIZ_DATA,
      payload: booleanQuizData
    })
  }
})

export default connect(null, mapDispatchToProps)(BooleanQuizInput)
