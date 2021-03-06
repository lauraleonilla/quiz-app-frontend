import React, { useEffect, useState } from 'react'
import moment from 'moment'
import chatService from '../api/chatService'
import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react'
import './chat.scss'

const Chat = () => {
  const [chatMessages, setChatMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const data = await chatService.getChatmessages()
      setChatMessages(data)
    }
    fetchData()
    const timeOut = setInterval(() => {
      fetchData()
    }, 15000)
    return () => {
      clearTimeout(timeOut)
    }
  }, [])

  const renderMessages = () => {
    return chatMessages.map((message, index) => {
      if (message.user && message.message) {
        return (
          <span key={index} className='chatMessage'>
            <p className='timeStamp'>
              {moment.unix(message.time).format('YYYY/MM/DD HH:mm')}
            </p>
            {message.user.username ? (
              <p className='userName'>{message.user.username}: </p>
            ) : (
              <p className='userName'>{message.user.name}: </p>
            )}
            <p className='messagetext'>{message.message}</p>
          </span>
        )
      } else {
        return null
      }
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
      message: newMessage,
      time: moment().unix()
    }
    await chatService.sendChatMessage(payload)
    handleresetMessage()
  }

  return (
    <div>
      <div className='chatWrapper'>
        <h1>Chat with other players here</h1>
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
