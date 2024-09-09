import React from "react";
import { Link } from "react-router-dom";
import "./RoleNavbar.css";
import { useState } from "react";

function LoginRegisterMenu() {
  const [activeLink, setActiveLink] = useState("");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <ul className="navbar-nav align-items-center">
      <li className="nav-item">
        <Link className={`nav-link nav-link-hover ${activeLink === 'products' ? 'active' : ''}`} to="/cart">Products </Link>
      </li>
      <li className="nav-item">
        <a className={`nav-link nav-link-hover ${activeLink === 'contact' ? 'active' : ''}`} href="https://pinevox.com/contact/" target="_blank"  rel="noopener noreferrer">Contact</a>
      </li>
      <li className="nav-item">
        <Link className={`nav-link nav-link-hover ${activeLink === 'login' ? 'active' : ''}`} to="/clogin" ><i className="fa fa-sign-in"></i> Login</Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link nav-link-hover ${activeLink === 'register' ? 'active' : ''}`} to="/register" ><i className="fa fa-user-plus"></i> Register</Link>
      </li>
    </ul>
  );
}

export default LoginRegisterMenu;

