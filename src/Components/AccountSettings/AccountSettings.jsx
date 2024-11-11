import React, { useState } from 'react';
import './AccountSettings.css';

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState('Account Settings');
  
  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <div className="profile-image">
          <div className="avatar-placeholder"></div>
        </div>
        <div className="profile-info">
          <h3>Thirupathi Raju Vattem</h3>
          <p>Haryak Inc.</p>
        </div>
        <div className="profile-stats">
          <div className="stat-item">
            <span>Opportunities applied</span>
            <span className="stat-number">2</span>
          </div>
          <div className="stat-item">
            <span>Completed Bookings</span>
            <span className="stat-number green">26</span>
          </div>
          <div className="stat-item">
            <span>Upcoming Bookings</span>
            <span className="stat-number">6</span>
          </div>
        </div>
        <div className="profile-actions">
          <button className="view-profile-btn">View Public Profile</button>
          <div className="profile-link">
            <span>https://app.ahiregro...</span>
            <button className="copy-btn">📋</button>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="tabs">
          <button 
            className={activeTab === 'Account Settings' ? 'active' : ''}
            onClick={() => setActiveTab('Account Settings')}
          >
            Account Settings
          </button>
          <button 
            className={activeTab === 'Documents' ? 'active' : ''}
            onClick={() => setActiveTab('Documents')}
          >
            Documents
          </button>
          <button 
            className={activeTab === 'Bank Details' ? 'active' : ''}
            onClick={() => setActiveTab('Bank Details')}
          >
            Bank Details
          </button>
        </div>

        {activeTab === 'Account Settings' && (
          <form className="account-form">
            <div className="form-group">
              <label>First Name</label>
              <input type="text" placeholder="" />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" placeholder="" />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="text" placeholder="" />
            </div>
            <div className="form-group">
              <label>Email address</label>
              <input type="email" placeholder="nathaniel.poole@mircosoft.com" />
            </div>
            <div className="form-group">
              <label>City</label>
              <input type="text" placeholder="" />
            </div>
            <div className="form-group">
              <label>State</label>
              <input type="text" placeholder="" />
            </div>
            <div className="form-group">
              <label>Postcode</label>
              <input type="text" placeholder="" />
            </div>
            <div className="form-group">
              <label>Country</label>
              <input type="text" placeholder="" />
            </div>
            <div className="form-group">
              <label>Available Locations</label>
              <select>
                <option>Guntur, Chilakaluripet</option>
              </select>
            </div>
            <button type="submit" className="update-button">Update</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AccountSettings;
