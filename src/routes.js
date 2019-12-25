import React from 'react'
import Home from './components/Home'
import QuizContainer from './components/QuizContainer'
import Login from './components/Login'
import Header from './components/Header'
import Chat from './components/Chat'
import { connect } from 'react-redux'
import ProfilePage from './components/ProfilePage'
import QuizPage from './components/QuizPage'
import Register from './components/Register'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

const Routes = props => {
  return (
    <div>
      <Router>
        <Header />
        <Route exact path='/home' render={() => <Home />} />
        <Route exact path='/chat' render={() => <Chat />} />
        <Route exact path='/quiz' render={() => <QuizContainer />} />
        <Route exact path='/login' render={() => <Login />} />
        <Route exact path='/register' render={() => <Register />} />
        <Route exact path='/profile' render={() => <ProfilePage />} />
        {props.selectedQuiz && props.selectedQuiz.length ?
          <Route exact path={`/quiz/${props.selectedQuiz[0].category}`} render={() => <QuizPage />} />
          : null}
      </Router>
    </div>
  )
}

const mapStateToProps = state => ({
  selectedQuiz: state.appState.selectedQuiz
})


export default connect(
  mapStateToProps,
  null
)(Routes)
