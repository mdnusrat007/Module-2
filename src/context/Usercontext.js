import React, { createContext, useState, useEffect, useContext} from 'react';

// Create the context
export const UserContext = createContext();

// Custom hook to use the context
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  return context;
};

export const UserContextProvider = ({ children }) => {
  // rebdering for first time
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('pocketNotes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [selectedNote, setSelectedNote] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // savr to local storage
  useEffect(() => {
    localStorage.setItem('pocketNotes', JSON.stringify(notes));
  }, [notes]);

  // resizing the window
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const createNote = (noteName, color) => {
    const newNote = {
      id: Date.now(),
      name: noteName,
      color: color,
      messages: []
    };
    setNotes([...notes, newNote]);
    setShowModal(false);
  };

  const addMessage = (text) => {
    if (!selectedNote) return;

    const newMessage = {
      id: Date.now(),
      text: text,
      timestamp: new Date().toLocaleString('en-US', {
        day: 'numeric', month: 'short', year: 'numeric',
        hour: 'numeric', minute: '2-digit', hour12: true
      })
    };

    const updatedNotes = notes.map(note =>
      note.id === selectedNote.id
        ? { ...note, messages: [...note.messages, newMessage] }
        : note
    );

    setNotes(updatedNotes);
    setSelectedNote(prev => ({ ...prev, messages: [...prev.messages, newMessage] }));
  };

  const selectNote = (note) => {
    setSelectedNote(note);
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const value = {
    notes,
    setNotes,
    selectedNote,
    setSelectedNote,
    showModal,
    setShowModal,
    isMobile,
    createNote,
    addMessage,
    selectNote,
    openModal,
    closeModal
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};