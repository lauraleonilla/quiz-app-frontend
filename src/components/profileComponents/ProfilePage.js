import React from 'react'
import { connect } from 'react-redux'
import Cat from '../../assets/cat.jpeg'
import './ProfilePage.scss'

const ProfilePage = ({ user }) => {
  if (!user) {
    return null
  }

  const getScores = () => {
    if (user.scores && user.scores.length) {
      return user.scores.map(score => {
        return (
          <div className='scoreColumn' key={score.id}>
            <h3>{`${score.quiz}:  ${score.score}`}</h3>
          </div>
        )
      })
    }
  }

  return (
    <div className='pageWrapper'>
      <div className='profileContainer'>
        {user.username ? <p className='title'>{user.username}</p> : null}
        {user.name ? <p className='title'>{user.name}</p> : null}
        {user.image ? (
          <img src={user.image} alt={user.image} />
        ) : (
          <img className='image' src={Cat} alt='You!' />
        )}
      </div>
      <div className='scoreWrapper'>
        <h2>Scoreboard</h2>
        {getScores()}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.appState.user
})

export default connect(mapStateToProps)(ProfilePage)
