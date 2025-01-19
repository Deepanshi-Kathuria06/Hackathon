import React from "react";
import "../App.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">JPD<span>HUB</span></div>
      <nav>
        <ul>
          <li><a href="#services">Services</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#portfolio">Portfolio</a></li>
          <li><a href="#contact">Contact Us</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
