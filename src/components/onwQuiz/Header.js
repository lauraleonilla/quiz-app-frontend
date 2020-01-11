import React from 'react'
import { Form, Radio } from 'semantic-ui-react'
import './quizForm.scss'

const Header = ({ quizType, handleRadioButnChange }) => {
  return (
    <div className='quizSelectionForm'>
      <Form>
        <Form.Field>Selected value:</Form.Field>
        <Form.Field>
          <Radio
            label='Multipple choice'
            name='radioGroup'
            value='multiple'
            checked={quizType === 'Multipple choice'}
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
