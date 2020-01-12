import React from 'react'
import { Form, Radio } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react'
import './quizForm.scss'

const BooleanQuizInput = ({ handleresetText, newTextHandler, fieldText }) => {
  return (
    <div className='booleanWrapper'>
      <Input
        className='inputField'
        icon={<Icon name='delete' link onClick={handleresetText} />}
        placeholder='Question'
        value={fieldText}
        onChange={newTextHandler}
      />
      <div>
        <Form className='answerForm'>
          <Form.Field>
            <Radio label='False' name='radioGroup' value='multiple' />
          </Form.Field>
          <Form.Field>
            <Radio label='True' name='radioGroup' value='boolean' />
          </Form.Field>
        </Form>
      </div>
      <Button
        className='saveBtn'
        content='Save'
        type='submit'
        basic
        color='purple'
      />
    </div>
  )
}

export default BooleanQuizInput
