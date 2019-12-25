import React from 'react'
import Login from './components/Login'
import Register from './components/Register'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

const LoginRoutes = () => {
  return (
    <div>
      <Router>
        <Route exact path='/' render={() => <Login />} />
        <Route exact path='/register' render={() => <Register />} />
      </Router>
    </div>
  )
}

export default LoginRoutes