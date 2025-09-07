import React from 'react';
import Sidebar from './components/Sidebar';
import NoteView from './components/NoteView';
import CreateNoteModal from './components/CreateNoteModal';
import WelcomeScreen from './components/WelcomeScreen';
import { useUserContext } from './context/Usercontext';
import './css/App.css';

// Main App Component wrapped with context
function App() {
  const { selectedNote, showModal, isMobile } = useUserContext();

  return (
    <div className="app-container">
      <Sidebar />

      <main className="main-content">
        {selectedNote ? (
          <NoteView />
        ) : (
          !isMobile && <WelcomeScreen />
        )}
      </main>

      {showModal && <CreateNoteModal />}
    </div>
  );
}

export default App;