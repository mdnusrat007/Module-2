import React from 'react';
import { Plus } from 'lucide-react';
import { useUserContext } from '../context/Usercontext';
import '../css/Sidebar.css';

const getInitials = (name) => {
  return name.split(' ').map(word => word[0]).join('').toUpperCase().substring(0, 2);
};

const Sidebar = () => {
  const { notes, selectedNote, selectNote, openModal, isMobile } = useUserContext();

  // On mobile, hide sidebar if a note is being viewed
  if (isMobile && selectedNote) {
    return null;
  }

  return (
    <aside className="sidebar">
      <h1 className="sidebar-title">Pocket Notes</h1>
      <div className="notes-list">
        {notes.map((note) => (
          <div
            key={note.id}
            onClick={() => selectNote(note)}
            className={`note-item ${selectedNote?.id === note.id ? 'selected' : ''}`}
          >
            <div className="note-avatar" style={{ backgroundColor: note.color }}>
              {getInitials(note.name)}
            </div>
            <h3 className="note-name">{note.name}</h3>
          </div>
        ))}
      </div>
      <button onClick={openModal} className="add-note-btn">
        <Plus size={50} />
      </button>
    </aside>
  );
};

export default Sidebar;