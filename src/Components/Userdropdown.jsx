import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faStore, faArrowUp, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Header from './Header'; // Adjust the import path as necessary


const UserDropdown = ({ isOpen, onClose }) => {
  return (
    <div className={`user-dropdown ${isOpen ? 'open' : ''}`}>
      <div className="dropdown-header">
        <span>Prasad</span>
        <FontAwesomeIcon icon={faArrowUp} className="dropdown-icon" />
      </div>
      <ul>
        <li onClick={() => alert('Profile Clicked')}>Profile</li>
        <li onClick={() => alert('Join as a Vendor Clicked')}>Join as a Vendor</li>
        <li onClick={() => alert('Upgrade Plan Clicked')}>Upgrade Plan</li>
        <li onClick={() => alert('Logout Clicked')}>Logout</li>
      </ul>
    </div>
  );
};

export default UserDropdown;