import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Talent Hub</h1>
      <Link to="/talent-register">Register as a Talent</Link>
    </div>
  );
};

export default HomePage;
