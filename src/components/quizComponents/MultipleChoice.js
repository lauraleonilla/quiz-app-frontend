import React from 'react'
import { Button } from 'semantic-ui-react'

const MultipleChoice = ({ currentQuestion, nextQuestionHandler }) => {
  const shuffle = array => {
    let j, x, i
    for (i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1))
      x = array[i]
      array[i] = array[j]
      array[j] = x
    }
    return array
  }
  const renderAnswers = () => {
    currentQuestion.incorrect_answers.push(currentQuestion.correct_answer)
    const shuffled = shuffle(currentQuestion.incorrect_answers)
    return shuffled.map(answer => (
      <Button
        key={atob(answer)}
        basic
        color='purple'
        content={atob(answer)}
        onClick={() => nextQuestionHandler(atob(answer))}
      />
    ))
  }

  return <div>{renderAnswers()}</div>
}

export default MultipleChoice
