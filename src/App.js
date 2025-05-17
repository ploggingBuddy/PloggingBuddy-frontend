import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import CreateMeetup from './pages/CreateMeetup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/create" element={<CreateMeetup />} />
      </Routes>
    </Router>
  );
}

export default App;
