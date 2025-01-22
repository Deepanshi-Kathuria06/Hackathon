import React, { useState, useEffect } from "react";
import { FaUserShield, FaSignInAlt } from "react-icons/fa";
import TalentRegistration from "./Talent/TalentRegistrationForm";
import "../App.css";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAboutVisible, setIsAboutVisible] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById("about");
      const sectionTop = aboutSection.getBoundingClientRect().top;
      const triggerHeight = window.innerHeight / 1.3;

      if (sectionTop < triggerHeight) {
        setIsAboutVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="App">
      <header className="header">
        <div className="logo">
          JPD<span>HUB</span>
        </div>
        <nav>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact Us</a></li>
            <li><a href="/admin-signup">
              <FaUserShield className="nav-icon" />
            </a></li>
          </ul>
        </nav>
      </header>

      <section className="hero">
        <video autoPlay muted loop id="bg-video">
          <source src="./bg.mp4" type="video/mp4" />
        </video>
        <div className="content">
          <h1>
            Showcase, <span>Get Approved</span>, <span>Get Hired</span>
          </h1>
          <p>Fill out the form, get noticed, and take the next step in your career.</p>
          <div className="buttons">
            <button className="primary-btn" onClick={openModal}>
              Join as Talent
            </button>
            <button className="secondary-btn">Browse Talents</button>
          </div>
        </div>
      </section>

      <div className="about" id="about">
        <div className="about-content">
          <h2 className="about-title">About Us</h2>
          <p className="about-description">
            We believe in the power of talent and collaboration. Our mission is to connect skilled individuals with clients who need expertise. Our platform allows freelancers to showcase their skills and experience, while clients can discover the perfect match for their projects.
          </p>

          <div className="interactive-infographic">
            {[{
                icon: <img src="./signup.svg" alt="Sign Up" className="svg-icon animate-icon" />,
                title: "Sign Up & Register",
                description: "Talents create a profile by filling out a registration form, highlighting their skills, experience, and portfolio."
              },
              {
                icon: <img src="./approval.svg" alt="Admin Approval" className="svg-icon animate-icon" />,
                title: "Admin Approval",
                description: "Once submitted, profiles go through an approval process by our admin team to ensure quality and professionalism."
              },
              {
                icon: <img src="/discover.svg" alt="Get Discovered" className="svg-icon animate-icon" />,
                title: "Get Discovered",
                description: "Once approved, talents are visible to clients who are actively seeking experts in their respective fields."
              },
              {
                icon: <img src="/handshake.svg" alt="Hire & Collaborate" className="svg-icon animate-icon" />,
                title: "Hire & Collaborate",
                description: "Clients browse through profiles and hire the best talent for their project. It's that simple."
              }
            ].map((step, index) => (
              <div
                className={`step ${isAboutVisible ? "animate-step" : ""}`}
                key={index}
              >
                {step.icon}
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="contact-section" id="contact">
        <div className="contact-container">
          <div className="contact-left">
            <h1 className="contact-heading">Where Innovation Meets Passion.</h1>
            <div className="contact-image">
              <img src="/gallery.jpg" alt="Contact Us" />
            </div>
          </div>
          <div className="contact-right">
            <h2>Do you have any questions, suggestions or feedback?</h2>
            <p>We'd love to hear from you!</p>
            <form className="contact-form">
              <input type="text" placeholder="Name" required />
              <input type="email" placeholder="Email" required />
              <textarea placeholder="Your message" rows="5" required></textarea>
              <button type="submit" className="contact-submit">Submit</button>
            </form>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-links">
          <a href="#about">About Us</a> | <a href="#contact">Contact Us</a>
        </div>
        <p>&copy; 2025 JPDHUB. All rights reserved.</p>
        <div className="social-icons">
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">LinkedIn</a>
        </div>
      </footer>

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
