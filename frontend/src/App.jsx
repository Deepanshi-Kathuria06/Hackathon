import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importing required components
import HomePage from './components/HomePage';
import TalentRegistrationForm from './components/Talent/TalentRegistrationForm';


import './App.css';
import ClientPage from './components/browse/clients';


const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Define routes with the element prop */}
          <Route path="/" element={<HomePage />} />
          <Route path="/talent-register" element={<TalentRegistrationForm />} />
<<<<<<< HEAD
          <Route path="/client" component={ClientPage} />
=======
         
          
>>>>>>> ff00770b421cbe6adadc65603a0e1424036d0e17
        </Routes>
      </div>
    </Router>
  );
};

export default App;