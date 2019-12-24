import React from 'react'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import './ProfilePage.scss'

const ProfilePage = ({ user }) => {
  if(!user) {
    return null
  }
  return (
    <div className='container'>
      {user.username? <p>Username: {user.username}</p> : null}
      {user.name ? <p className='title'>{user.name}</p> : null}
      {user.image ? <img src={user.image} alt={user.image}/> : null}
      <div className='scoreBoard'>SCOREBOARD</div>
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
