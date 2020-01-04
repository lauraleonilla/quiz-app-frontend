import React from 'react'
import { Menu } from 'semantic-ui-react'
import { withRouter, Link } from 'react-router-dom'
import './Header.scss'

const Header = props => {
  const logout = () => {
    window.localStorage.removeItem('loggedInUser')
    props.history.push('/')
    window.location.reload()
  }

  return (
    <div style={{ padding: 20 }}>
      <Menu>
        <Menu.Item>
          <Link to='/'>Start page</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to='/chat'>Chat</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to='/ownQuizzes'>Own quizzes</Link>
        </Menu.Item>
        <Menu.Item className='profileBtn'>
          <Link to='/profile'>My profile</Link>
        </Menu.Item>
        <Menu.Item onClick={() => logout()}>Logout</Menu.Item>
      </Menu>
    </div>
  )
}

export default withRouter(Header)
