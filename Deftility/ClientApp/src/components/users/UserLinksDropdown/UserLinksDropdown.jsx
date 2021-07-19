import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './UserLinksDropdown.scss';
import DefaultAvatar from '../../../images/profile-placeholder.jpg';

export default function UserLinksDropdown({ triggerLogout }) {
  const [isDropdownShown, setIsDropdownShown] = useState(false);

  function toggleDropdown() {
    setIsDropdownShown(!isDropdownShown);
  }

  return (
    <>
    <div className="user-dropdown-toggle-wrapper" onClick={toggleDropdown}>
      <div className="user-avatar">
        <img src={DefaultAvatar} alt="avatar" />
      </div>
      <div className="user-data-wrapper">
        <p>test123</p>
        <p>€{"0.00"} EUR</p>
      </div>
    </div>
    {
      isDropdownShown &&
      <div className="user-dropdown-links-wrapper">
        <div className="dropdown-links-section">
          <p>FINANCES</p>
          <div className="dropdown-item">
            <Link to='/'>Make a deposit</Link>
          </div>
          <div className="dropdown-item">
            <Link to='/'>Withdraw funds</Link>
          </div>
        </div>
        <div className="dropdown-links-section">
          <p>ACCOUNT</p>
          <div className="dropdown-item">
            <Link to='/'>View profile</Link>
          </div>
          <div className="dropdown-item">
            <Link to='/' onClick={triggerLogout}>Logout</Link>
          </div>
        </div>
      </div>
    }
    </>
  );
}
