import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserVendorProfile.css';
import Footer from '../Footer';

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState('Account Settings');
  const [linkText, setLinkText] = useState('https://app.ahiregro...');
  const navigate = useNavigate();

  const cities = [
    "Chiakaluripet",
    "Hyderabad",
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Kolkata",
    "Pune",
    "Ahmedabad",
    "Jaipur"
  ];

  const countries = [
    "India",
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "Singapore",
    "UAE"
  ];

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
    navigate('/previousbooking');
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
            <div className="stat-item" onClick={handlePreviousBookingsClick}>
              <span>Previous Bookings</span>
              <span className="stat-number">2</span>
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
                  <select defaultValue="">
                    <option value="" disabled>Select city</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
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
                  <select defaultValue="">
                    <option value="" disabled>Select country</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
                <div className="form-data full-width">
                  <label>Pincode</label>
                  <input type="text" placeholder="Enter pincode" />
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