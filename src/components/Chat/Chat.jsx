import React, { useState, useEffect } from "react";
import { database } from "../../firebase-config"; 
import { ref, onValue, push } from "firebase/database";
import "./chat.css"; 

const Chat = ({ user }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesRef = ref(database, "chat");

  useEffect(() => {

    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const chatMessages = [];

      for (let id in data) {
        chatMessages.push(data[id]);
      }

      setMessages(chatMessages);
    });
  }, []);

  const handleSendMessage = () => {
    if (!user || !user.uid || !user.email) {
      console.error("User is not defined or uid/email is missing!");
      return;
    }

    // const messagesRef = ref(database, "chat");

    push(messagesRef, {
      user_id: user.uid, 
      email: user.email,
      message: message,
      timestamp: Date.now(),
    });

    setMessage("");
  };

  return (
    <div className="chat-container mt-4">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.user_id === user.uid ? 'sent' : 'received'}`}
          >
            <div className="message-header">{msg.email || "Unknown"}</div>
            <div className="message-body">
              {msg.message}
              <div className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
        />
        <button onClick={handleSendMessage} disabled={!message.trim()}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
