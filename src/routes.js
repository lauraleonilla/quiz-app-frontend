import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import QuizContainer from './components/quizComponents/QuizContainer'
import Login from './components/Login'
import Header from './components/Header'
import Chat from './components/Chat'
import ProfilePage from './components/profileComponents/ProfilePage'
import QuizPage from './components/quizComponents/QuizPage'
import NotFoundPage from './components/NotFoundPage'
import Register from './components/Register'

const Routes = () => {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' render={() => <Home />} />
          <Route exact path='/chat' render={() => <Chat />} />
          <Route exact path='/quiz' render={() => <QuizContainer />} />
          <Route exact path='/login' render={() => <Login />} />
          <Route exact path='/register' render={() => <Register />} />
          <Route exact path='/profile' render={() => <ProfilePage />} />
          <Route
            exact
            path={'/quiz/:selectedQuiz'}
            render={() => <QuizPage />}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </div>
  )
}

export default Routes
