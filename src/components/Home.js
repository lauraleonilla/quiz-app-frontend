import React from 'react'
import { Button } from 'semantic-ui-react'
import { withRouter } from 'react-router'

const Home = props => {

  const clickHandler = () => {
    const path = 'quiz'
    props.history.push(path)
  }
  return (
    <div>
      <h1>Welcome to play quizzes!</h1>
      <Button content='Click to start!' onClick={() => clickHandler()}/>
    </div>
  )
}

export default withRouter(Home)
