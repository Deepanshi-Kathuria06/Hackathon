import React, { useState } from "react";
import TalentRegistration from "./Talent/TalentRegistrationForm"; // Import the existing component
import "../App.css"; // Keep existing styles for HomePage

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      {/* Header Section */}
      <header className="header">
        <div className="logo">
          JPD<span>HUB</span>
        </div>
        <nav>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
     
        <img className="image-bg" src="./image.png" alt="Background" />
     
        <div className="content">
          <h1>
            Empowering <span>Your Vision</span> with <span>Technology</span>
          </h1>
          <p>
            Join JPD Hub to showcase your skills or hire the best talent
          </p>
          <div className="buttons">
            {/* Link the existing Join as Talent button */}
            <button className="primary-btn" onClick={openModal}>
              Join as Talent
            </button>
            <button className="secondary-btn">Hire Talent</button>
          </div>
        </div>
        <button className="primary-btn explore-btn">Explore More</button>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="background-pattern">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>
              &times;
            </button>
            <TalentRegistration />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
