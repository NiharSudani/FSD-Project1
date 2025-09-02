import React from 'react';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';

const WhatsAppClone = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/3 h-full">
        <Sidebar />
      </div>
      <div className="w-2/3 h-full">
        <ChatWindow />
      </div>
    </div>
  );
};

export default WhatsAppClone;