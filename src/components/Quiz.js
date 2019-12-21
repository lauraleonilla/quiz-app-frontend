import React, { useEffect } from 'react'
import quizService from '../api/quizService'

const Quiz = () => {
  useEffect(() => {
    quizService.getAll()
  },[])
  return (
    <div>
      <h1>MOI</h1>
    </div>
  )
}

export default Quiz
