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
  const [numberOfQuestions, setNumberOfQuestions] = useState('')
  const [numberOfAnswers, setNumberOfAnswers] = useState('')
  const [quizType, setQuizType] = useState('')
  const [error, setError] = useState('')
  const [quizTitle, setQuizTitle] = useState('')
  const [quizSaved, setquizSaved] = useState('')

  const handleresetTitle = () => {
    setQuizTitle('')
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
    if (!data.questions.length) {
      errorHandler('There are no saved questions')
      return false
    }
    return true
  }

  console.log('LOOOL', props)

  const saveQuizHandler = async () => {
    const payload = { quizTitle: quizTitle, questions: null }
    if (quizType === 'True / False') {
      payload.questions = props.booleanQuizData
    }
    if (quizType === 'Multiple choice') {
      payload.questions = props.multiQuizData
    }
    if (!validateQuizInput(payload)) {
      return false
    } else {
      const response =
        quizType === 'True / False'
          ? await quizService.createBooleanQuiz(payload)
          : await quizService.createMultiChoiceQuiz(payload)
      if (response.error) {
        errorHandler(response.error.message)
      } else {
        setquizSaved('Quiz saved!')
      }
    }
    setQuizType('')
    setQuizTitle('')
    setNumberOfQuestions('')
  }

  const renderQuestionField = () => {
    const rows = []
    if (quizType && quizType === 'Multiple choice' && numberOfQuestions) {
      for (let i = 0; i < numberOfQuestions; i++) {
        rows.push(
          <MultiQuizInput
            numberOfAnswers={numberOfAnswers}
            errorHandler={errorHandler}
            questionIndex={i}
          />
        )
      }
    }
    if (quizType && quizType === 'True / False' && numberOfQuestions) {
      for (let i = 0; i < numberOfQuestions; i++) {
        rows.push(
          <BooleanQuizInput errorHandler={errorHandler} questionIndex={i} />
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
      : setNumberOfAnswers(e.target.textContent - 1)
  }

  const renderDropDown = () => {
    const options = []
    for (let i = 1; i <= 15; i++) {
      options.push({ key: i, text: i, value: i })
    }
    return (
      <div className='dropDown'>
        <p style={{ color: 'red', fontSize: 16 }}>{error}</p>
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
        icon={<Icon name='delete' link onClick={() => handleresetTitle()} />}
        placeholder='Quiz title'
        value={quizTitle}
        onChange={titleHandler}
      />
      {renderDropDown()}
      {renderQuestionField()}
      <Button
        className='saveBtn'
        content='Save quiz'
        type='submit'
        basic
        color='purple'
        onClick={() => saveQuizHandler()}
      />
      <h2 style={{ textAlign: 'initial' }}>{quizSaved}</h2>
    </div>
  )
}

const mapStateToProps = state => ({
  booleanQuizData: state.appState.booleanQuizData,
  multiQuizData: state.appState.multiQuizData
})

export default connect(mapStateToProps)(QuizForm)
