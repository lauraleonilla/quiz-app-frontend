import React, { useState } from 'react'
import { withRouter } from 'react-router'
import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react'
import './Login.scss'
import { connect } from 'react-redux'
import CONSTANTS from '../constants'
import loginService from '../api/loginService'

const Login = props => {
  const [userName, setuserName] = useState('')
  const [passWord, setpassWord] = useState('')

  const loginHandler = async event => {
    event.preventDefault()
    const payload = {
      userName,
      passWord
    }
    const user = await loginService.login(payload)
    if(user) {
      props.gotUser(user)
    }
  }
  const usernameHandler = event => {
    setuserName(event.target.value)
  }
  const passwordHandler = event => {
    setpassWord(event.target.value)
  }
  const handleDeleteUserName = () => {
    setuserName('')
  }
  const handleDeletePassword = () => {
    setpassWord('')
  }

  return (
    <div className='loginContainer'>
      <h1>Login</h1>
      <form onSubmit={loginHandler} className='inputForm'>
        <Input  icon={<Icon name='delete' link onClick={handleDeleteUserName}/>} placeholder='Username...' value={userName} onChange={usernameHandler}/>
        <Input type='password' icon={<Icon name='delete' link onClick={handleDeletePassword}/>}  placeholder='Password...' value={passWord} onChange={passwordHandler}/>
        <Button content='Login' type='submit'/>
      </form>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  gotUser: user => {
    dispatch({
      type: CONSTANTS.GOT_USER,
      payload: user
    })
  }
})

export default withRouter(connect(
  null,
  mapDispatchToProps
)(Login))
