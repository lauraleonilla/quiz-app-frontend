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

  const newTextHandler = event => {
    setQuestion(event.target.value)
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
    props.saveQuizData({ question, correctAnswer })
  }

  return (
    <div className='booleanWrapper'>
      <Input
        className='inputField'
        icon={<Icon name='delete' link onClick={props.handleresetText} />}
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
