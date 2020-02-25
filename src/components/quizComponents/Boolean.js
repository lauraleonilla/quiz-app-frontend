import React from 'react'
import { Button } from 'semantic-ui-react'

const Boolean = ({ nextQuestionHandler }) => {
  return (
    <div>
      <Button
        basic
        color='purple'
        content='True'
        onClick={() => nextQuestionHandler('True')}
      />
      <Button
        basic
        color='purple'
        content='False'
        onClick={() => nextQuestionHandler('False')}
      />
    </div>
  )
}

export default Boolean
