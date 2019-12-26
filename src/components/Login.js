import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react'
import Home from './Home'
import './Login.scss'
import { connect } from 'react-redux'
import CONSTANTS from '../constants'
import loginService from '../api/loginService'
import FacebookLogin from 'react-facebook-login'
import { Link } from 'react-router-dom'

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

  const responseFacebook = (response) => {
    const user = {
      name: response.name,
      fbId: response.userID,
      image: response.picture.data.url,
      token: response.accessToken
    }
    if(user) {
      props.gotUser(user)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
    }
  }

  return (
    <div className='loginContainer'>
      {props.user ? <Home /> : (
        <div>
          <h1>Login</h1>
          <form onSubmit={loginHandler} className='inputForm'>
            <Input className='inputField' icon={<Icon name='delete' link onClick={handleDeleteUserName}/>} placeholder='Username...' value={userName} onChange={usernameHandler}/>
            <Input className='inputField' type='password' icon={<Icon name='delete' link onClick={handleDeletePassword}/>}  placeholder='Password...' value={passWord} onChange={passwordHandler}/>
            <Button className='loginBtn' content='Login' type='submit' basic color='purple'/>
          </form>
          <div className='facebookButton'>
            <FacebookLogin
              appId="2238566619796019"
              autoLoad={false}
              fields="name,email,picture.type(large)"
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
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
