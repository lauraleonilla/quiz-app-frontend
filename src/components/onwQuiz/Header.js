import React from 'react'
import { Form, Radio } from 'semantic-ui-react'
import './quizForm.scss'

const Header = ({ quizType, handleRadioButnChange }) => {
  return (
    <div className='quizSelectionForm'>
      <Form>
        <Form.Field style={{ fontSize: 20, marginBottom: 35 }}>
          Create your own quiz here, start by selecting quiz type:
        </Form.Field>
        <Form.Field>
          <Radio
            label='Multiple choice'
            name='radioGroup'
            value='multiple'
            checked={quizType === 'Multiple choice'}
            onChange={handleRadioButnChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='True / False'
            name='radioGroup'
            value='boolean'
            checked={quizType === 'True / False'}
            onChange={handleRadioButnChange}
          />
        </Form.Field>
      </Form>
    </div>
  )
}

export default Header
