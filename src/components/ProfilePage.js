import React from 'react'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import Cat from '../assets/cat.jpeg'
import './ProfilePage.scss'

const ProfilePage = ({ user }) => {
  if(!user) {
    return null
  }

  const getScores = () => {
    if(user.scores && user.scores.length) {
      return user.scores.map(score => {
        return (
          <div key={score.id}>
            <p>{score.quiz}</p>
            <p>{score.score}</p>
          </div>
        )
      })
    }
  }

  return (
    <div className='container'>
      {user.username? <p className='title'>{user.username}</p> : null}
      {user.name ? <p className='title'>{user.name}</p> : null}
      {user.image ? <img src={user.image} alt={user.image}/> : (
        <img className='image' src={Cat} alt='You!' />
      )}
      <div className='scoreBoard'>
        <p>SCOREBOARD</p>
        {getScores()}
      </div>
      <Button content='Edit profile' basic color='purple' />
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.appState.user
})

export default connect(
  mapStateToProps
)(ProfilePage)
