import React, { useState } from 'react'
import { Input } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react'
import './quizForm.scss'

function AnswerField({ placeholder, newAnswerHandler, index, correct }) {
  const [answerText, setAnswer] = useState('')
  const handleresetAnswer = () => {
    setAnswer('')
  }

  const handleAnswer = event => {
    setAnswer(event.target.value)
    newAnswerHandler({
      index: index,
      answer: event.target.value,
      correct: correct
    })
  }

  return (
    <div>
      <Input
        className='inputField'
        icon={<Icon name='delete' link onClick={() => handleresetAnswer()} />}
        placeholder={placeholder}
        value={answerText}
        onChange={handleAnswer}
      />
    </div>
  )
}

export default AnswerField
