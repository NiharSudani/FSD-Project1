import React, { useState, useEffect } from 'react';

const Sidebar = () => {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'John Doe',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      lastMessage: 'Hey, how are you doing?',
      timestamp: '10:30 AM',
      isOnline: true,
      unreadCount: 2,
    },
    {
      id: 2,
      name: 'Jane Smith',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      lastMessage: 'Can we meet tomorrow?',
      timestamp: 'Yesterday',
      isOnline: false,
      unreadCount: 0,
    },
    {
      id: 3,
      name: 'Mike Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      lastMessage: 'I sent you the files',
      timestamp: 'Yesterday',
      isOnline: true,
      unreadCount: 0,
    },
    {
      id: 4,
      name: 'Sarah Williams',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
      lastMessage: 'Thanks for your help!',
      timestamp: 'Monday',
      isOnline: false,
      unreadCount: 0,
    },
    {
      id: 5,
      name: 'David Brown',
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
      lastMessage: 'Let me know when you are free',
      timestamp: 'Monday',
      isOnline: true,
      unreadCount: 3,
    },
    {
      id: 6,
      name: 'Emily Davis',
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
      lastMessage: 'See you at the meeting',
      timestamp: 'Sunday',
      isOnline: false,
      unreadCount: 0,
    },
    {
      id: 7,
      name: 'Alex Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
      lastMessage: 'Did you check the proposal?',
      timestamp: 'Last week',
      isOnline: true,
      unreadCount: 0,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContacts, setFilteredContacts] = useState(contacts);

  useEffect(() => {
    // Filter contacts based on search query
    const filtered = contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredContacts(filtered);
  }, [searchQuery, contacts]);

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-300">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-gray-100">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
            <img 
              src="https://randomuser.me/api/portraits/men/1.jpg" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex space-x-2 text-gray-600">
          <button className="p-1 rounded-full hover:bg-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
          <button className="p-1 rounded-full hover:bg-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-2 bg-gray-100">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search or start new chat"
            className="pl-10 pr-4 py-2 w-full bg-white rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Contact List */}
      <div className="flex-1 overflow-y-auto">
        {filteredContacts.map((contact) => (
          <div 
            key={contact.id} 
            className="flex items-center p-3 border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img 
                  src={contact.avatar} 
                  alt={contact.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              {contact.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div className="ml-3 flex-1">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold">{contact.name}</h3>
                <span className="text-xs text-gray-500">{contact.timestamp}</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <p className="text-xs text-gray-600 truncate w-40">{contact.lastMessage}</p>
                {contact.unreadCount > 0 && (
                  <div className="bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {contact.unreadCount}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;