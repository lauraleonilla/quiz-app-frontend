import React from 'react'
import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react'
import './quizForm.scss'

const MultiQuizInput = ({
  handleresetText,
  newTextHandler,
  fieldText,
  numberOfAnswers
}) => {
  const renderAnswerInput = () => {
    const rows = []
    for (let i = 0; i < numberOfAnswers; i++) {
      rows.push(
        <Input
          className='inputField'
          icon={<Icon name='delete' link onClick={handleresetText} />}
          placeholder='Answer'
          value={fieldText}
          onChange={newTextHandler}
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
        icon={<Icon name='delete' link onClick={handleresetText} />}
        placeholder='Question'
        value={fieldText}
        onChange={newTextHandler}
      />
      {renderAnswerInput()}
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
