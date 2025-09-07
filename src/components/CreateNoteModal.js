import React, { useState, useRef, useEffect } from 'react';
import { useUserContext } from '../context/Usercontext'
import '../css/CreateNoteModal.css';

const COLORS = [ '#8481cc', '#ed66c9', '#6dedeb', '#f09f4f', '#0933bd', '#7693f5'];

const CreateNoteModal = () => {
  const { notes, createNote, closeModal } = useUserContext();
  const [noteName, setNoteName] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [error, setError] = useState('');
  const modalRef = useRef(null);

  // Close modal if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeModal]);

  // Check for duplicate group names
  useEffect(() => {
    if (noteName.trim()) {
      const exists = notes.some(note => 
        note.name.toLowerCase() === noteName.trim().toLowerCase()
      );
      if (exists) {
        setError('Group already exists!');
      } else {
        setError('');
      }
    } else {
      setError('');
    }
  }, [noteName, notes]);

  const handleCreate = () => {
    if (noteName.trim() && !error) {
      createNote(noteName.trim(), selectedColor);
    }
  };

  return (
    <div className="modal-overlay">
      <div ref={modalRef} className="modal-content">
        <h2 className="modal-title">Create New Group</h2>
        
        <div className="form-group-inline">
          <label>Group Name</label>
          <input
            type="text"
            value={noteName}
            onChange={(e) => setNoteName(e.target.value)}
            placeholder="Enter group name"
            className={error ? 'error-input' : ''}
          />
        </div>
        
        <div className="form-group-inline">
          <label>Choose Color</label>
          <div className="color-options">
            {COLORS.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`color-button ${selectedColor === color ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
        
        <div className="modal-actions">
          {error && <span className="error-message">{error}</span>}
          <button 
            onClick={handleCreate} 
            disabled={!noteName.trim() || error} 
            className="create-button"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNoteModal;