import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importing required components
import HomePage from './components/HomePage';
import TalentRegistrationForm from './components/Talent/TalentRegistrationForm';

import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Define routes with the element prop */}
          <Route path="/" element={<HomePage />} />
          <Route path="/talent-register" element={<TalentRegistrationForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;