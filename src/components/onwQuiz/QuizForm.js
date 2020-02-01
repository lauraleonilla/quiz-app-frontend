import React, { useState } from 'react'
import Header from './Header'
import { connect } from 'react-redux'
import { Input } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react'
import MultiQuizInput from './MultiQuizInput'
import BooleanQuizInput from './BooleanQuizInput'
import { Button } from 'semantic-ui-react'
import { Dropdown } from 'semantic-ui-react'
import quizService from '../../api/userQuizService'
import './quizForm.scss'

const QuizForm = props => {
  const [fieldText, setFieldText] = useState('')
  const [numberOfQuestions, setNumberOfQuestions] = useState('')
  const [numberOfAnswers, setNumberOfAnswers] = useState('')
  const [quizType, setQuizType] = useState('')
  const [error, setError] = useState('')
  const [quizTitle, setQuizTitle] = useState('')

  const newTextHandler = event => {
    setFieldText(event.target.value)
  }

  const handleresetText = () => {
    setFieldText('')
  }

  const titleHandler = event => {
    setQuizTitle(event.target.value)
  }

  const errorHandler = errorMessage => {
    setError(errorMessage)
    setTimeout(() => {
      setError('')
    }, 3000)
  }

  const validateQuizInput = data => {
    if (data.quizTitle.length < 5) {
      errorHandler('Quiz title should be at least 5 characters')
      return false
    }
    return true
  }

  const saveQuizHandler = async () => {
    const payload = {
      quizTitle: quizTitle,
      questions: props.booleanQuizData
    }
    if (!validateQuizInput(payload)) {
      return false
    } else {
      const response = await quizService.createBooleanQuiz(payload)
      if (response.error) {
        errorHandler(response.error.message)
      }
    }
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
            quizTitle={quizTitle}
            errorHandler={errorHandler}
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

  return (
    <div className='wrapper'>
      <Header
        quizType={quizType}
        handleRadioButnChange={handleRadioButnChange}
      />
      <Input
        className='inputField'
        icon={<Icon name='delete' link onClick={handleresetText} />}
        placeholder='Quiz title'
        value={quizTitle}
        onChange={titleHandler}
      />
      {renderDropDown()}
      {renderQuestionField()}
      <Button
        className='saveBtn'
        content='Save'
        type='submit'
        basic
        color='purple'
        onClick={() => saveQuizHandler()}
      />
    </div>
  )
}

const mapStateToProps = state => ({
  booleanQuizData: state.appState.booleanQuizData
})

export default connect(mapStateToProps)(QuizForm)
