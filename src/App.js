import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Routes from './routes'
import LoginRoutes from './loginroutes'
import CONSTANTS from './constants'
import './App.scss'

const App = props => {
  const { gotUser, gotToken } = props

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      if (user && user.token) {
        gotUser(user)
        gotToken(user.token)
      }
    }
  }, [gotUser, gotToken])

  return <div className='App'>{!props.user ? <LoginRoutes /> : <Routes />}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(App)
