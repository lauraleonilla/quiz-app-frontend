import React from 'react'
import { Button } from 'semantic-ui-react'

const MultipleChoice = ({ currentQuestion, nextQuestionHandler }) => {
  const renderAnswers = () => {
    return currentQuestion.incorrect_answers.map(answer => (
      <Button
        key={answer}
        basic
        color='purple'
        content={atob(answer)}
        onClick={() => nextQuestionHandler(answer)}
      />
    ))
  }

  return (
    <div>
      <Button
        basic
        color='purple'
        content={atob(currentQuestion.correct_answer)}
        onClick={() => nextQuestionHandler(currentQuestion.correct_answer)}
      />
      {renderAnswers()}
    </div>
  )
}

export default MultipleChoice
