import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Home from './Home'
import ErrorMessage from './ErrorMessage'
import CONSTANTS from '../constants'
import loginService from '../api/loginService'
import FacebookLogin from 'react-facebook-login'
import './Login.scss'

const Login = props => {
  const [userName, setuserName] = useState('')
  const [passWord, setpassWord] = useState('')
  const [errorMessage, setErrorMessge] = useState('')

  const loginHandler = async event => {
    event.preventDefault()
    const payload = {
      userName,
      passWord
    }
    try {
      const user = await loginService.login(payload)
      if (user) {
        props.gotUser(user)
        props.gotToken(user.token)
      }
    } catch (error) {
      setErrorMessge(error.response.data.error)
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

  const responseFacebook = async response => {
    const user = {
      name: response.name,
      fbId: response.userID
    }
    if (user) {
      try {
        const loggedInuser = await loginService.fblogin(user)
        const userToSave = {
          ...loggedInuser,
          image: response.picture.data.url
        }
        props.gotUser(userToSave)
        props.gotToken(userToSave.token)
        window.localStorage.setItem('loggedInUser', JSON.stringify(userToSave))
      } catch (error) {
        setErrorMessge(error.response.data.error)
      }
    }
  }

  return (
    <div className='loginContainer'>
      {props.user ? (
        <Home />
      ) : (
        <div className='loginElements'>
          <h1>Login</h1>
          <ErrorMessage message={errorMessage} />
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
              type='password'
              icon={<Icon name='delete' link onClick={handleDeletePassword} />}
              placeholder='Password...'
              value={passWord}
              onChange={passwordHandler}
            />
            <Button
              className='loginBtn'
              content='Login'
              type='submit'
              basic
              color='purple'
            />
          </form>
          <div className='facebookButton'>
            <FacebookLogin
              appId='2238566619796019'
              autoLoad={false}
              fields='name,email,picture.type(large)'
              callback={responseFacebook}
            />
          </div>
        </div>
      )}
      <Link to='/register'>Or create an account here</Link>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.appState.user
})

const mapDispatchToProps = dispatch => ({
  gotUser: user => {
    dispatch({
      type: CONSTANTS.GOT_USER,
      payload: user
    })
  },
  gotToken: token => {
    dispatch({
      type: CONSTANTS.GOT_TOKEN,
      payload: token
    })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
