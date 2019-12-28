import React from 'react'
import './ErrorMessage.scss'

const ErrorMessage = props => {
  return (
    <div>
      <h3 className='errorMessage'>{props.message}</h3>
    </div>
  )
}

export default ErrorMessage
