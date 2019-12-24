import React from 'react'
import Home from './components/Home'
import QuizContainer from './components/QuizContainer'
import Login from './components/Login'
import Header from './components/Header'
import Chat from './components/Chat'
import ProfilePage from './components/ProfilePage'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

const Routes = () => {
  return (
    <div>
      <Router>
        <Header />
        <Route exact path='/' render={() => <Home />} />
        <Route exact path='/chat' render={() => <Chat />} />
        <Route exact path='/quiz' render={() => <QuizContainer />} />
        <Route exact path='/login' render={() => <Login />} />
        <Route exact path='/profile' render={() => <ProfilePage />} />
      </Router>
    </div>
  )
}

export default Routes
