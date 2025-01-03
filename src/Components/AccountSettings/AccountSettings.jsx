import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AccountSettings.css';
import Footer from '../Footer';

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState('Account Settings');
  const [linkText, setLinkText] = useState('https://app.ahiregro...');
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'Documents') {
      navigate('/documents');
    } else if (tab === 'Bank Details') {
      navigate('/bankdetails');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('https://app.ahiregro...');
    setLinkText('Copied');
    setTimeout(() => {
      setLinkText('https://app.ahiregro...');
    }, 2000);
  };
  useEffect(() => {
    document.body.classList.add('scroll-locked');
    
    return () => {
      document.body.classList.remove('scroll-locked');
    };
  }, []);
  
  return (
    <>
    <div className="cover-text">
        <i className="fas fa-camera" style={{ marginRight: '8px', fontSize: '20px' }}></i>
        change cover
      </div>

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
              <span>{linkText}</span>
              <button className="copy-btn" onClick={handleCopy}>📋</button>
            </div>
          </div>
        </div>

        <div className="profile-content">
          <div className="tabs">
            <button 
              className={activeTab === 'Account Settings' ? 'active' : ''}
              onClick={() => handleTabClick('Account Settings')}
            >
              Account Settings
            </button>
            <button 
              className={activeTab === 'Documents' ? 'active' : ''}
              onClick={() => handleTabClick('Documents')}
            >
              Documents
            </button>
            <button 
              className={activeTab === 'Bank Details' ? 'active' : ''}
              onClick={() => handleTabClick('Bank Details')}
            >
              Bank Details
            </button>
          </div>

          {activeTab === 'Account Settings' && (
            <div className="account-settings-wrapper">
              <form className="account-form">
                <div className="form-data left-column">
                  <label>First Name</label>
                  <input type="text" placeholder="Enter first name" />
                </div>
                <div className="form-data right-column">
                  <label>Last Name</label>
                  <input type="text" placeholder="Enter last name" />
                </div>
                <div className="form-data left-column">
                  <label>Phone Number</label>
                  <input type="text" placeholder="Enter phone number" />
                </div>
                <div className="form-data right-column">
                  <label>Email address</label>
                  <input type="email" placeholder="Enter email address" />
                </div>
                <div className="form-data left-column">
                  <label>City</label>
                  <input type="text" placeholder="Enter city" />
                </div>
                <div className="form-data right-column">
                  <label>State</label>
                  <input type="text" placeholder="Enter state" />
                </div>
                <div className="form-data left-column">
                  <label>Postcode</label>
                  <input type="text" placeholder="Enter postcode" />
                </div>
                <div className="form-data right-column">
                  <label>Country</label>
                  <input type="text" placeholder="Enter country" />
                </div>
                <div className="form-data full-width">
                  <label>Available Locations</label>
                  <select>
                    <option>Select location</option>
                    <option>Guntur, Chilakaluripet</option>
                    <option>Guntur, Patnam</option>
                  </select>
                </div>
              </form>

              <div className="update-button-container">
                <button type="submit" className="update-button">Update</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer /> 
    </>
  );
};

export default AccountSettings;