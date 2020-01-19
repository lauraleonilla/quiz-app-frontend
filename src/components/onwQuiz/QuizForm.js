import React, { useState } from 'react'
import Header from './Header'
import MultiQuizInput from './MultiQuizInput'
import BooleanQuizInput from './BooleanQuizInput'
import { Dropdown } from 'semantic-ui-react'
import './quizForm.scss'

const QuizForm = () => {
  const [fieldText, setFieldText] = useState('')
  const [numberOfQuestions, setNumberOfQuestions] = useState('')
  const [numberOfAnswers, setNumberOfAnswers] = useState('')
  const [quizType, setQuizType] = useState('')
  const [error, setError] = useState('')

  const newTextHandler = event => {
    setFieldText(event.target.value)
  }

  const handleresetText = () => {
    setFieldText('')
  }

  const errorHandler = errorMessage => {
    setError(errorMessage)
    setTimeout(() => {
      setError('')
    }, 3000)
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
            numberOfAnswers={numberOfAnswers}
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

  const handleQuestionDropDownChange = e => {
    !quizType
      ? errorHandler('Select a quiz type')
      : setNumberOfQuestions(e.target.textContent)
  }

  const handleAnswerDropDownChange = e => {
    quizType !== 'Multiple choice'
      ? errorHandler('Select a quiz type')
      : setNumberOfAnswers(e.target.textContent)
  }

  const renderDropDown = () => {
    const options = []
    for (let i = 0; i <= 15; i++) {
      options.push({ key: i, text: i, value: i })
    }
    return (
      <div className='dropDown'>
        <p style={{ color: 'red' }}>{error}</p>
        <div className='dropDownWrapper'>
          <p>Number of questions</p>
          <Dropdown
            placeholder='Select the number of questions'
            fluid
            selection
            options={options}
            onChange={handleQuestionDropDownChange}
          />
        </div>
        {quizType === 'Multiple choice' ? (
          <div className='dropDownWrapper'>
            <p>Number of answer choices</p>
            <Dropdown
              placeholder='Select the number of answers'
              fluid
              selection
              options={options}
              onChange={handleAnswerDropDownChange}
            />
          </div>
        ) : null}
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
