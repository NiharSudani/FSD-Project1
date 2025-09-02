import React, { useState, useEffect, useRef } from 'react';

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hey there! How are you?',
      sender: 'other',
      timestamp: '10:30 AM',
    },
    {
      id: 2,
      text: 'I\'m good, thanks for asking! How about you?',
      sender: 'me',
      timestamp: '10:31 AM',
    },
    {
      id: 3,
      text: 'Doing well! Just wanted to check in.',
      sender: 'other',
      timestamp: '10:32 AM',
    },
    {
      id: 4,
      text: 'Are we still meeting tomorrow for coffee?',
      sender: 'other',
      timestamp: '10:33 AM',
    },
    {
      id: 5,
      text: 'Yes, definitely! Looking forward to it.',
      sender: 'me',
      timestamp: '10:35 AM',
    },
    {
      id: 6,
      text: 'Great! See you at the usual place at 2 PM?',
      sender: 'other',
      timestamp: '10:36 AM',
    },
    {
      id: 7,
      text: 'Perfect, see you then!',
      sender: 'me',
      timestamp: '10:38 AM',
    },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const timestamp = `${formattedHours}:${formattedMinutes} ${ampm}`;

    const message = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'me',
      timestamp,
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-3 bg-gray-100 border-b border-gray-300">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src="https://randomuser.me/api/portraits/women/2.jpg"
              alt="Contact"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-semibold">Jane Smith</h3>
            <p className="text-xs text-gray-500">Online</p>
          </div>
        </div>
        <div className="flex space-x-2 text-gray-600">
          <button className="p-1 rounded-full hover:bg-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="p-1 rounded-full hover:bg-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div 
        className="flex-1 p-4 overflow-y-auto" 
        style={{ backgroundImage: 'url("https://web.whatsapp.com/img/bg-chat-tile-light_a4be512e7195b6b733d9110b408f075d.png")' }}
      >
        <div className="space-y-2">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender === 'me' 
                  ? 'bg-green-100 text-gray-800' 
                  : 'bg-white text-gray-800'}`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-right text-xs text-gray-500 mt-1">{message.timestamp}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="p-3 bg-gray-100">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <button type="button" className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <button type="button" className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>
          <input
            type="text"
            placeholder="Type a message"
            className="flex-1 py-2 px-4 bg-white rounded-full focus:outline-none focus:ring-1 focus:ring-green-500"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button 
            type="submit" 
            className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;