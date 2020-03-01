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
    let shuffled = null
    if (currentQuestion._id) {
      const answerOptions = []
      currentQuestion.incorrect_answers.forEach(e => {
        answerOptions.push(e.answer)
      })
      answerOptions.push(currentQuestion.correct_answer.answer)
      shuffled = shuffle(answerOptions)
      return shuffled.map((answer, index) => (
        <Button
          key={index}
          basic
          color='purple'
          content={answer}
          onClick={() => nextQuestionHandler(answer)}
        />
      ))
    } else {
      currentQuestion.incorrect_answers.push(currentQuestion.correct_answer)
      shuffled = shuffle(currentQuestion.incorrect_answers)
      return shuffled.map((answer, index) => (
        <Button
          key={index}
          basic
          color='purple'
          content={atob(answer)}
          onClick={() => nextQuestionHandler(atob(answer))}
        />
      ))
    }
  }

  return <div>{renderAnswers()}</div>
}

export default MultipleChoice
