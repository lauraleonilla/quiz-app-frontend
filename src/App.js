import React from 'react'
import QuizContainer from './components/QuizContainer'
import { withRouter } from 'react-router'
import Header from './components/Header'
import './App.scss'

const App = props => {
  console.log(props)
  return (
    <div className='App'>
      <Header />
      <QuizContainer/>
    </div>
  )
}

export default withRouter(App)
