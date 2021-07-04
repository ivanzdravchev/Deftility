import React from 'react';
import { Link } from 'react-router-dom';

import './Navigation.scss';
import Logo from '../../images/logo.png';

export default function Navigation() {
  return (
    <div className="nav-container">
      <div className="nav-wrapper">
        <div className="nav-logo">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>
        <div className="nav-site-links">
          <div className="nav-item">
            <Link to="#">Find Work</Link>
          </div>
          <div className="nav-item">
            <Link to="#">Find Talent</Link>
          </div>
        </div>
        <div className="nav-user-links">
          <div className="nav-item">
            <Link to="#">Login</Link>
          </div>
          <div className="nav-item">
            <Link to="#">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
    
  );
}