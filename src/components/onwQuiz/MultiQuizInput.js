import React from 'react'
import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react'

const MultiQuizInput = ({ handleresetText, newTextHandler, fieldText }) => {
  return (
    <div>
      <Input
        className='inputField'
        icon={<Icon name='delete' link onClick={handleresetText} />}
        placeholder='Question'
        value={fieldText}
        onChange={newTextHandler}
      />
      <Input
        className='inputField'
        icon={<Icon name='delete' link onClick={handleresetText} />}
        placeholder='Answer'
        value={fieldText}
        onChange={newTextHandler}
      />
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

export default MultiQuizInput
