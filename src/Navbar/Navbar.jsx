import React, { useState } from "react";
import "./Navbar.scss";
import { FaCoffee, FaBars } from "react-icons/fa"; // Coffee icon + Hamburger icon

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <FaCoffee className="navbar-icon" />
        <span className="navbar-title">Coffee Explorer</span>
      </div>

      <div className="navbar-right" onClick={toggleMenu}>
        <FaBars className="hamburger-icon" />
      </div>

      {isOpen && (
        <div className="dropdown-menu">
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
      )}
    </nav>
   
  );
};

export default Navbar;
