import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Routes from './routes'
import LoginRoutes from './loginroutes'
import CONSTANTS from './constants'
import userService from './api/userService'
import './App.scss'

const App = (props) => {

  const { gotUser } = props

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      if (user && user.token) {
        gotUser(user)
        userService.setToken(user.token)
      }
    }
  }, [gotUser])

  return (
    <div className='App'>
      {!props.user ? <LoginRoutes /> : <Routes />}
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
)(App)
