import React from 'react'
import { Link } from 'react-router-dom'
import './NotFoundPage.scss'

const NotFoundPage = () => {
  return (
    <div className='notFound'>
      <div className='infoText'>
        <h1>Not found! <span role='img' aria-label='Emoji'>🥺</span></h1>
        <p>{'The resource you\'re looking for doesn\'t exist.'}</p>
        <Link to='/'>Back to startpage</Link>
      </div>
    </div>
  )
}

// Photo by Tim Trad on Unsplash

export default NotFoundPage
