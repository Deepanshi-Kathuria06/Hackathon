import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import TalentRegistrationPage from './components/TalentRegistrationPage';
import AdminDashboardPage from './components/AdminDashboardPage';
import ClientDashboardPage from './components/ClientDashboardPage';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/talent-register" element={<TalentRegistrationPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
          <Route path="/client-dashboard" element={<ClientDashboardPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
