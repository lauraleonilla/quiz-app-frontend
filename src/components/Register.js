import React, { useState } from 'react'
import { withRouter } from 'react-router'
import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react'
import './Login.scss'
import userService from '../api/userService'

const Register = () => {
  const [userName, setuserName] = useState('')
  const [name, setName] = useState('')
  const [passWord, setpassWord] = useState('')

  const loginHandler = () => {
    const payload = {
      userName,
      name,
      passWord
    }
    userService(payload)
  }
  const usernameHandler = event => {
    setuserName(event.target.value)
  }
  const passwordHandler = event => {
    setpassWord(event.target.value)
  }
  const nameHandler = event => {
    setName(event.target.value)
  }
  const handleDeleteUserName = () => {
    setuserName('')
  }
  const handleDeletename = () => {
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
        <Input  icon={<Icon name='delete' link onClick={handleDeletename}/>} placeholder='Name...' value={name} onChange={nameHandler}/>
        <Input icon={<Icon name='delete' link onClick={handleDeletePassword}/>}  placeholder='Password...' value={passWord} onChange={passwordHandler}/>
        <Button content='Login' type='submit'/>
      </form>
    </div>
  )
}

export default withRouter(Register)