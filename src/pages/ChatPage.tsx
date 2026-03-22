import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, AlertTriangle } from 'lucide-react'
import './Pages.css'

interface Message { id: number; text: string; isUser: boolean; crisis?: boolean }

export function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi! I'm TheraBuddy, your AI wellness companion. How are you feeling today?", isUser: false },
  ])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, thinking])

  const handleSend = () => {
    if (!input.trim() || thinking) return
    const userMsg: Message = { id: Date.now(), text: input, isUser: true }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setThinking(true)
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: Date.now() + 1, text: "Thank you for sharing. I'm here to listen and support you. Would you like to tell me more about how you're feeling?", isUser: false },
      ])
      setThinking(false)
    }, 1500)
  }

  return (
    <div className="page chat-page">
      <h1 className="page-title">Chat</h1>

      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-bubble ${msg.isUser ? 'user' : 'bot'} fade-in`}>
              <div className="bubble-avatar">
                {msg.isUser ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className="bubble-content">
                <p>{msg.text}</p>
                {msg.crisis && (
                  <div className="crisis-badge">
                    <AlertTriangle size={14} /> Emergency support available
                  </div>
                )}
              </div>
            </div>
          ))}
          {thinking && (
            <div className="chat-bubble bot fade-in">
              <div className="bubble-avatar"><Bot size={16} /></div>
              <div className="bubble-content typing">
                <span className="dot" /><span className="dot" /><span className="dot" />
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <form className="chat-input-bar" onSubmit={(e) => { e.preventDefault(); handleSend() }}>
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="send-btn" disabled={!input.trim() || thinking}>
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  )
}
