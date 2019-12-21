import React from 'react'
import { Button } from 'semantic-ui-react'
import { withRouter } from 'react-router'
import Header from './components/Header'
import './App.scss'

const App = props => {

  const clickHandler = () => {
    const path = 'quiz'
    props.history.push(path)
  }

  return (
    <div className='App'>
      <Header />
      <Button content='Click to start!' onClick={() => clickHandler()}/>
    </div>
  )
}

export default withRouter(App)
