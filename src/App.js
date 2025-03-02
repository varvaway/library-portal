import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import EventsPage from './EventsPage';
import OtherPage from './OtherPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/other" element={<OtherPage />} />
      </Routes>
    </Router>
  );
}

export default App;