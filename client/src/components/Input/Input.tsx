import React from 'react';

import './Input.css';

interface IProps {
  setMessage(value: string): void,
  sendMessage(event: any): void,
  message: string
}

const Input = ({ setMessage, sendMessage, message }: IProps) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <button className="sendButton" onClick={event => sendMessage(event)}>Send</button>
  </form>
)

export default Input;