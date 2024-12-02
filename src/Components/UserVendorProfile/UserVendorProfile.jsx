import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserVendorProfile.css';
import Footer from '../Footer';

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState('Account Settings');
  const [linkText, setLinkText] = useState('https://app.ahiregro...');
  const navigate = useNavigate();  // Use navigate hook

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

  const handlePreviousBookingsClick = () => {
    navigate('/previousbooking');  // Navigate to the Previous Booking page
  };

  useEffect(() => {
    document.body.classList.add('scroll-locked');
    
    return () => {
      document.body.classList.remove('scroll-locked');
    };
  }, []);

  return (
    <>
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
              <span>Explore Services</span>
              <span className="stat-number green"></span>
            </div>
            <div className="stat-item">
              <span>Previous Bookings</span>
              <span className="stat-number">2</span>
            </div>
          </div>
          <div className="profile-actions">
            {/* Add a button to trigger navigation to Previous Booking */}
            <button onClick={handlePreviousBookingsClick} className="previous-booking-button">
              Previous Bookings
            </button>
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
                  <label>Address</label>
                  <input type="text" placeholder="Enter Address" />
                </div>
                <div className="form-data right-column">
                  <label>Country</label>
                  <input type="text" placeholder="Enter country" />
                </div>
                <div className="form-data full-width">
                  <label>Pincode</label>
                  <select>
                    <option>Select Pincode</option>
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
