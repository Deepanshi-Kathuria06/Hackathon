import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import "./AdminLogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate(); // Initialize navigate hook

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add admin authentication logic here
    if (email === "" || password === "") {
      setError("Please fill in all fields.");
    } else if (email !== "admin@example.com" || password !== "admin123") {
      setError("Invalid email or password.");
    } else {
      setError("");
      alert("Login successful!");
      // Redirect to the admin dashboard
    }
  };

  const handleBackClick = () => {
    navigate("/"); // Redirect to the home page
  };

  return (
    <div className="outer-container">
    <div className="admin-login-container">
      <div className="login-box">
        <div className="logo">
          <h1>Admin Panel</h1>
          <p>Fast & Easy Management</p>
        </div>
        
        {/* Back Button */}
        <button className="back-btn" onClick={handleBackClick}>
          Back to Home
        </button>

        <h2>Welcome Back!</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
        <div className="footer-links">
          <a href="/">Forgot My Password</a>
          <p>Terms of use | Privacy policy</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdminLogin;
