'use client'
import { useEffect, useState } from 'react'
import { User } from '@clerk/nextjs/server'

export default function Home() {
  const [clerkUser, setClerkUser] = useState<User | null>(null)
  const [message, setMessage] = useState<string>('')
  const [messages, setMessages] = useState<
    { createdAt: Date; sender: string; message: string }[]
  >([])
  const [socket, setSocket] = useState<WebSocket | null>(null)

  useEffect(() => {
    const setup = async () => {
      try {
        const response = await fetch('/api/user')
        const result = (await response.json()) as { userData: User }
        setClerkUser(result.userData)
        const ws = new WebSocket(
          'ws://localhost:8000?email=' +
            result.userData.emailAddresses[0].emailAddress
        )

        ws.onmessage = (ev) => {
          const data = ev.data as string
          const parsedData = JSON.parse(data)

          if (parsedData.type == 'messageList') {
            setMessages(parsedData.data.messages)
          }
        }
        ws.onopen = () => {
          ws.send(JSON.stringify({ type: 'getMessages' }))
          console.log('connected.')
          setSocket(ws)
        }

        ws.onclose = () => {
          console.log('disconnected.')
          setSocket(null)
        }
      } catch (error) {
        console.error('Error fetching current user:', error)
      }
    }

    setup()
  }, []) // Empty dependency array ensures this effect runs only once

  const handleMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessage(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (socket) {
      socket.send(JSON.stringify({ type: "postMessage", data: message }))
    }
    setMessage('')
  }

  if (!clerkUser) {
    return (
      <div className="h-screen w-screen justify-center items-center text-3xl flex">
        loading
      </div>
    )
  } else {
    return (
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <p>
              {message.sender} ({message.createdAt.toLocaleString()}):
            </p>
            <p>{message.message}</p>
          </div>
        ))}{' '}
        <form onSubmit={handleSubmit}>
          <textarea
            value={message}
            onChange={handleMessageChange}
            placeholder="Type your message here..."
            className="w-full h-24 p-2 border border-gray-300 rounded-md resize-none"
          />
          <button
            type="submit"
            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Send
          </button>
        </form>
      </div>
    )
  }
}
