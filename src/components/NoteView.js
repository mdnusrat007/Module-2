import React, { useState } from 'react';
import { Send, ArrowLeft } from 'lucide-react';
import { useUserContext } from '../context/Usercontext';
import '../css/NoteView.css';

const getInitials = (name) => {
  return name.split(' ').map(word => word[0]).join('').toUpperCase().substring(0, 2);
};

const NoteView = () => {
  const { selectedNote, setSelectedNote, addMessage, isMobile } = useUserContext();
  const [messageText, setMessageText] = useState('');

  const handleSendMessage = () => {
    if (messageText.trim()) {
      addMessage(messageText.trim());
      setMessageText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const goBack = () => {
    setSelectedNote(null);
  };

  if (!selectedNote) return null;

  return (
    <div className="note-view">
      <header className="note-header">
        {isMobile && (
          <button onClick={goBack} className="back-button">
            <ArrowLeft size={20} />
          </button>
        )}
        <div className="note-avatar-header" style={{ backgroundColor: selectedNote.color }}>
          {getInitials(selectedNote.name)}
        </div>
        <h2 className="note-title-header">{selectedNote.name}</h2>
      </header>

      <div className="messages-container">
        {selectedNote.messages.map((message) => (
          <div key={message.id} className="message-card">
            <p className="message-text">{message.text}</p>
            <p className="message-timestamp">{message.timestamp}</p>
          </div>
        ))}
      </div>

      <footer className="message-input-area">
        <textarea
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter your text here..........."
          className="message-textarea"
        />
        <button onClick={handleSendMessage} disabled={!messageText.trim()} className="send-button">
          <Send size={20} />
        </button>
      </footer>
    </div>
  );
};

export default NoteView;