import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react'
import { Dropdown } from 'semantic-ui-react'
import './quizForm.scss'

const QuizForm = () => {
  const [fieldText, setFieldText] = useState('')

  const newTextHandler = event => {
    setFieldText(event.target.value)
  }

  const handleresetText = () => {
    setFieldText('')
  }

  const renderDropDown = () => {
    const options = []
    for (let i = 0; i <= 15; i++) {
      options.push({ key: i, text: i, value: i })
    }
    return (
      <div className='dropDown'>
        <Dropdown
          placeholder='Select the number of questions'
          fluid
          selection
          options={options}
        />
      </div>
    )
  }

  //   const messageHandler = async event => {
  //     event.preventDefault()
  //     const payload = {
  //       message: newMessage,
  //       time: moment().unix()
  //     }
  //     await chatService.sendChatMessage(payload)
  //   }

  return (
    <div>
      <form>
        {renderDropDown()}
        <Input
          className='inputField'
          icon={<Icon name='delete' link onClick={handleresetText} />}
          placeholder='Question'
          value={fieldText}
          onChange={newTextHandler}
        />
        <Button
          className='loginBtn'
          content='Save'
          type='submit'
          basic
          color='purple'
        />
      </form>
    </div>
  )
}

export default QuizForm
