import React, { useState } from 'react'
import { withRouter, Redirect } from 'react-router'
import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react'
import './Login.scss'
import { connect } from 'react-redux'
import CONSTANTS from '../constants'
import loginService from '../api/loginService'
import FacebookLogin from 'react-facebook-login'


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
      userName: response.name,
      token: response.accessToken
    }
    if(user) {
      props.gotUser(user)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
    }
  }

  return (
    <div className='loginContainer'>
      {props.user ? <Redirect push to='/'/> : (
        <div>
          <h1>Login</h1>
          <form onSubmit={loginHandler} className='inputForm'>
            <Input  icon={<Icon name='delete' link onClick={handleDeleteUserName}/>} placeholder='Username...' value={userName} onChange={usernameHandler}/>
            <Input type='password' icon={<Icon name='delete' link onClick={handleDeletePassword}/>}  placeholder='Password...' value={passWord} onChange={passwordHandler}/>
            <Button content='Login' type='submit'/>
          </form>
          <FacebookLogin
            appId="2238566619796019"
            autoLoad={false}
            fields="name,email,picture"
            // onClick={() => responseFacebook}
            callback={responseFacebook}
          />
        </div>
      )}
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

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Login))
