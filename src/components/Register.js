import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import userService from '../api/userService'
import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react'
import './Register.scss'

const Register = props => {
  const [userName, setuserName] = useState('')
  const [name, setName] = useState('')
  const [passWord, setpassWord] = useState('')

  const loginHandler = async () => {
    const payload = {
      userName,
      name,
      passWord
    }
    const response = await userService.createUser(payload)
    if (response && response.success) {
      props.history.push('/login')
    } else {
      return null
    }
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
      <h1>Create an account</h1>
      <form onSubmit={loginHandler} className='inputForm'>
        <Input
          className='inputField'
          icon={<Icon name='delete' link onClick={handleDeleteUserName} />}
          placeholder='Username...'
          value={userName}
          onChange={usernameHandler}
        />
        <Input
          className='inputField'
          icon={<Icon name='delete' link onClick={handleDeletename} />}
          placeholder='Name...'
          value={name}
          onChange={nameHandler}
        />
        <Input
          type='password'
          className='inputField'
          icon={<Icon name='delete' link onClick={handleDeletePassword} />}
          placeholder='Password...'
          value={passWord}
          onChange={passwordHandler}
        />
        <Button
          className='registerBtn'
          content='Register'
          type='submit'
          basic
          color='purple'
        />
      </form>
      <Link to='/'>Or login here</Link>
    </div>
  )
}

export default Register
