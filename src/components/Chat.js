import React, { useEffect, useState } from 'react'
import chatService from '../api/chatService'
import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react'
import ErrorMessage from './ErrorMessage'
import './chat.scss'

const Chat = () => {
  const [chatMessages, setChatMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [errorMessage, setErrorMessge] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const data = await chatService.getChatmessages()
      setChatMessages(data)
    }
    fetchData()
  }, [])

  const renderMessages = () => {
    return chatMessages.map((message, index) => {
      return <p key={index}>{message.message}</p>
    })
  }

  const newMessageHandler = event => {
    setNewMessage(event.target.value)
  }

  const handleresetMessage = () => {
    setNewMessage('')
  }

  const messageHandler = async event => {
    event.preventDefault()
    const payload = {
      message: newMessage
    }
    try {
      chatService.sendChatMessage(payload)
    } catch (error) {
      setErrorMessge(error.response.data.error)
    }
  }

  return (
    <div>
      <h1>Chat with other players here</h1>
      <ErrorMessage message={errorMessage} />
      <div className='chatWrapper'>
        <div className='messageContainer'>{renderMessages()}</div>
        <form onSubmit={messageHandler} className='chatForm'>
          <Input
            className='inputField'
            icon={<Icon name='delete' link onClick={handleresetMessage} />}
            placeholder='Write a message!'
            value={newMessage}
            onChange={newMessageHandler}
          />
          <Button
            className='loginBtn'
            content='Send'
            type='submit'
            basic
            color='purple'
          />
        </form>
      </div>
    </div>
  )
}

export default Chat
