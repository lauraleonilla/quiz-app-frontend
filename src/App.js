import React, { useEffect } from 'react'
import { Button } from 'semantic-ui-react'
import { withRouter, Redirect } from 'react-router'
import Header from './components/Header'
import { connect } from 'react-redux'
// import Login from './components/Login'
import CONSTANTS from './constants'
import userService from './api/userService'
import './App.scss'

const App = (props) => {

  const { gotUser } = props

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      gotUser(user)
      userService.setToken(user.token)
    }
  }, [gotUser])

  const clickHandler = () => {
    const path = 'quiz'
    props.history.push(path)
  }

  return (
    <div className='App'>
      {!props.user ? <Redirect push to='/login'/> : (
        <div>
          <Header />
          <Button content='Click to start!' onClick={() => clickHandler()}/>
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
)(App))
