import React, { useState } from "react";
import "./ChatApp.css";

const ChatApp = () => {
  const [messages, setMessages] = useState({
    "Ravi Kumar": [
      { id: 1, sender: "Ravi Kumar", text: "Hi" },
      { id: 2, sender: "Ravi Kumar", text: "Are you available to work on Monday at 10:30 AM?" }
    ],
    "Prasad": [{ id: 1, sender: "Prasad", text: "Hi, how are you?" }]
  });

  const [activeChat, setActiveChat] = useState("Ravi Kumar");
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showOptions, setShowOptions] = useState(false); // Toggle for the active chat options
  const [showSidebarOptions, setShowSidebarOptions] = useState(null); // Toggle for the sidebar options

  // Handle sending a message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = { id: Date.now(), sender: "You", text: newMessage };

      // Update messages for the active chat (sent message)
      setMessages(prevMessages => ({
        ...prevMessages,
        [activeChat]: [...prevMessages[activeChat], newMsg]
      }));

      // Update messages for the recipient chat (received message)
      const recipient = activeChat === "Ravi Kumar" ? "Prasad" : "Ravi Kumar"; // Alternate between Ravi and Prasad
      const receivedMsg = { id: Date.now(), sender: activeChat, text: newMessage };

      setMessages(prevMessages => ({
        ...prevMessages,
        [recipient]: [...prevMessages[recipient], receivedMsg]
      }));

      setNewMessage("");
    }
  };

  // Handle chat switch
  const handleChatSwitch = (userName) => {
    setActiveChat(userName);
    setShowSidebarOptions(null); // Close the sidebar options when switching chats
  };

  // Filter contacts based on the search query
  const filteredContacts = Object.keys(messages).filter(contact =>
    contact.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle the clear chat option
  const handleClearChat = (contact) => {
    setMessages(prevMessages => ({
      ...prevMessages,
      [contact]: [] // Clear the chat messages for the selected contact
    }));
    setShowOptions(false); // Close the options menu after clearing chat
    setShowSidebarOptions(null); // Close sidebar options after clearing chat
  };

  // Avatars for contacts
  const avatars = {
    "Ravi Kumar": "https://th.bing.com/th/id/OIP.aZuNENHWyTAHLzGmN1yEVgHaGq?pid=ImgDet&w=179&h=161&c=7&dpr=1.5",
    "Prasad": "https://tpdigitaltechnologies.com/frontend_assets/images/testimonials/dummy-profile.png"
  };

  return (
    <div className="chat-container">
      <div className="sidebar">
        {/* Search Box */}
        <input
          type="text"
          placeholder="Search contacts"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-box"
        />

        {/* Display filtered contacts */}
        {filteredContacts.map((contact) => (
          <div
            key={contact}
            className={`contact ${contact === activeChat ? "active" : ""}`}
            onClick={() => handleChatSwitch(contact)}
          >
            <img src={avatars[contact]} alt={contact} className="avatar" />
            <div className="contact-info">
              <span className="contact-name">{contact}</span>
              <span className="last-seen">
                {contact === activeChat ? "Active" : "Last seen 2:00 PM"}
              </span>
            </div>

            {/* Sidebar Three Dots Menu */}
            <div className="options" onClick={() => setShowSidebarOptions(contact)}>
              &#8226;&#8226;&#8226; {/* Three dots */}
            </div>

            {/* Sidebar Options Dropdown */}
            {showSidebarOptions === contact && (
              <div className="dropdown">
                <button onClick={() => handleClearChat(contact)} className="dropdown-option">
                  Clear Chat
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="chat-window">
        {/* Active Profile in the Top-Right of the Chat Window */}
        <div className="active-profile-top">
          <img src={avatars[activeChat]} alt={activeChat} className="avatar" />
          <div className="contact-info">
            <span className="contact-name">{activeChat}</span>
            <span className="last-seen">
              {activeChat === "Ravi Kumar" || activeChat === "Prasad" ? "Active" : "Last seen 2:00 PM"} 
            </span> {/* Show "Active" for both Ravi and Prasad */}
          </div>

          {/* Three Dots Menu for Active Chat */}
          <div className="options" onClick={() => setShowOptions(!showOptions)}>
            &#8226;&#8226;&#8226; {/* Three dots */}
          </div>

          {/* Options Dropdown for Active Chat */}
          {showOptions && (
            <div className="dropdown">
              <button onClick={() => handleClearChat(activeChat)} className="dropdown-option">
                Clear Chat
              </button>
            </div>
          )}
        </div>

        <div className="messages">
          {messages[activeChat].map((msg) => (
            <div key={msg.id} className={`message ${msg.sender === "You" ? "sent" : "received"}`}>
              <span>{msg.text}</span>
            </div>
          ))}
        </div>

        <div className="message-input">
          <input
            type="text"
            placeholder="Type message here"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
