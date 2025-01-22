import React, { useState, useEffect } from "react";
import { FaUserShield, FaSignInAlt, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import TalentRegistration from "./Talent/TalentRegistrationForm";
import "../App.css";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [securityKey, setSecurityKey] = useState("");
  const [loginError, setLoginError] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openAdminLogin = () => {
    setIsAdminLoginOpen(true);
  };

  const closeAdminLogin = () => {
    setIsAdminLoginOpen(false);
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();

    // Define the correct credentials
    const validEmail = "laughoutlaud75@gmail.com";
    const validPassword = "laugh123";
    const validSecurityKey = "admin@JPD";

    // Check if the credentials match
    if (email === validEmail && password === validPassword && securityKey === validSecurityKey) {
      setLoginError(""); // Clear any previous errors
      alert("Login Successful");
      closeAdminLogin(); // Close the modal on successful login
    } else {
      setLoginError("Invalid credentials. Please try again.");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        const sectionTop = aboutSection.getBoundingClientRect().top;
        const triggerHeight = window.innerHeight / 1.3;

        if (sectionTop < triggerHeight) {
          setIsAboutVisible(true);
        }
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
          <img src="logo1.png" alt="Logo" />
        </div>

        <nav>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact Us</a></li>
            <li>
              <a onClick={openAdminLogin}>
                <FaUserShield className="nav-icon" />
              </a>
            </li>
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
          <p>Unleashing Talents, Connecting Ambitions, Creating Tomorrow</p>
          <div className="buttons">
            <button className="primary-btn" onClick={openModal}>
              Join as Talent
            </button>
            <button className="secondary-btn">Browse Talents</button>
          </div>
        </div>
      </section>

      <div className="about" id="about">
        <div className={`about-content ${isAboutVisible ? "animate-about" : ""}`}>
          <h2 className="about-title">About <span>Us</span></h2>
          <p className="about-description">
             we thrive on innovation and passion. Our mission is to empower talents and foster connections between skilled individuals and clients worldwide. We are committed to creating a platform where talents can shine, showcase their expertise, and find meaningful opportunities to collaborate on projects that make a difference.
          </p>
<<<<<<< HEAD
          <br></br>
          <br></br>
=======
>>>>>>> ff00770b421cbe6adadc65603a0e1424036d0e17
          <div className="interactive-infographic">
            {[
              {
                icon: <img src="./signup.svg" alt="Sign Up" className="svg-icon" />,
                title: "Sign Up & Register",
                description:
                  "Talents create a profile by filling out a registration form, highlighting their skills, experience, and portfolio.",
              },
              {
                icon: <img src="./approval.svg" alt="Admin Approval" className="svg-icon" />,
                title: "Admin Approval",
                description:
                  "Once submitted, profiles go through an approval process by our admin team to ensure quality and professionalism.",
              },
              {
                icon: <img src="/discover.svg" alt="Get Discovered" className="svg-icon" />,
                title: "Get Discovered",
                description:
                  "Once approved, talents are visible to clients who are actively seeking experts in their respective fields.",
              },
              {
                icon: <img src="/handshake.svg" alt="Hire & Collaborate" className="svg-icon" />,
                title: "Hire & Collaborate",
                description:
                  "Clients browse through profiles and hire the best talent for their project. It's that simple.",
              },
            ].map((step, index) => (
              <div className={`step ${isAboutVisible ? "animate-step" : ""}`} key={index}>
                {step.icon}
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="contact-section" id="contact">
        <div className="contact-container">
          <div className="contact-left">
            <h1 className="contact-heading">Where Innovation Meets Passion.</h1>
            <div className="contact-image"></div>
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
          <a href="#" target="_blank" rel="noopener noreferrer"><FaFacebook className="social-icon" /></a>
          <a href="#" target="_blank" rel="noopener noreferrer"><FaTwitter className="social-icon" /></a>
          <a href="#" target="_blank" rel="noopener noreferrer"><FaLinkedin className="social-icon" /></a>
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

      {isAdminLoginOpen && (
        <div className="background-pattern">
          <div className="modal-content admin-login">
            <button className="close-button" onClick={closeAdminLogin}>
              &times;
            </button>
            <h2>Admin Login</h2>
            <form className="admin-login-form" onSubmit={handleAdminLogin}>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Security key"
                value={securityKey}
                onChange={(e) => setSecurityKey(e.target.value)}
                required
              />
              {loginError && <p className="error-message">{loginError}</p>}
              <button type="submit" className="login-submit">Login</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
