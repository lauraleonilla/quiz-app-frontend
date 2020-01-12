import React, { useState } from 'react'
import Header from './Header'
import MultiQuizInput from './MultiQuizInput'
import BooleanQuizInput from './BooleanQuizInput'
import { Dropdown } from 'semantic-ui-react'
import './quizForm.scss'

const QuizForm = () => {
  const [fieldText, setFieldText] = useState('')
  const [numberOfQuestions, setNumberOfQuestions] = useState('')
  const [quizType, setQuizType] = useState('')

  const newTextHandler = event => {
    setFieldText(event.target.value)
  }

  const handleresetText = () => {
    setFieldText('')
  }

  const renderQuestionField = () => {
    const rows = []
    if (quizType && quizType === 'Multiple choice' && numberOfQuestions) {
      for (let i = 0; i < numberOfQuestions; i++) {
        rows.push(
          <MultiQuizInput
            handleresetText={handleresetText}
            newTextHandler={newTextHandler}
            fieldText={fieldText}
          />
        )
      }
    }
    if (quizType && quizType === 'True / False' && numberOfQuestions) {
      for (let i = 0; i < numberOfQuestions; i++) {
        rows.push(
          <BooleanQuizInput
            handleresetText={handleresetText}
            newTextHandler={newTextHandler}
            fieldText={fieldText}
          />
        )
      }
    }
    return (
      <div>
        {rows.map((row, index) => (
          <div key={index}>{row}</div>
        ))}
      </div>
    )
  }

  const handleDropDownChange = e => {
    setNumberOfQuestions(e.target.textContent)
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
          onChange={handleDropDownChange}
        />
      </div>
    )
  }

  const handleRadioButnChange = e => {
    setQuizType(e.target.textContent)
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
      <Header
        quizType={quizType}
        handleRadioButnChange={handleRadioButnChange}
      />
      {renderDropDown()}
      {renderQuestionField()}
    </div>
  )
}

export default QuizForm
