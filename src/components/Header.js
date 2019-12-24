import React from 'react'
import { Button } from 'semantic-ui-react'
import { withRouter, Link } from 'react-router-dom'

const Header = () => {
  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome to play quizzes!</h1>
      <Link to='/profile'>
        <Button content='Profile'/>
      </Link>
    </div>
  )
}

export default withRouter(Header)
