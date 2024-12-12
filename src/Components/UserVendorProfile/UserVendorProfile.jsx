import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserVendorProfile.css';
import Footer from '../Footer';

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState('Account Settings');
  const [linkText, setLinkText] = useState('https://app.ahiregro...');
  const [selectedCity, setSelectedCity] = useState('');
  const [isEditable, setIsEditable] = useState(false); // State to track whether the form is editable
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

  // Handle city selection change
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value); // Update the selected city
  };

  // Toggle the edit state
  const handleEditProfileClick = () => {
    setIsEditable(!isEditable); // Toggle editability
  };

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
            <div className="stat-item" style={{ borderLeft: 'black', borderRight: 'black', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span>Explore Services</span>
              <span className="stat-number green"></span>
            </div>
            <div className="stat-item" style={{ borderLeft: 'black', borderRight: 'black', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }} onClick={handlePreviousBookingsClick}>
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
                  <input 
                    type="text" 
                    placeholder="Enter first name" 
                    disabled={!isEditable} // Disable input if not editable
                  />
                </div>
                <div className="form-data right-column">
                  <label>Last Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter last name" 
                    disabled={!isEditable} // Disable input if not editable
                  />
                </div>
                <div className="form-data left-column">
                  <label>Phone Number</label>
                  <input 
                    type="text" 
                    placeholder="Enter phone number" 
                    disabled={!isEditable} // Disable input if not editable
                  />
                </div>
                <div className="form-data right-column">
                  <label>Email address</label>
                  <input 
                    type="email" 
                    placeholder="Enter email address" 
                    disabled={!isEditable} // Disable input if not editable
                  />
                </div>
                <div className="form-data left-column">
                  <label>City</label>
                  <select 
                    value={selectedCity} 
                    onChange={handleCityChange} 
                    disabled={!isEditable} // Disable select if not editable
                  >
                    <option value="" disabled>Select city</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                <div className="form-data right-column">
                  <label>State</label>
                  <input 
                    type="text" 
                    placeholder="Enter state" 
                    disabled={!isEditable} // Disable input if not editable
                  />
                </div>
                <div className="form-data left-column">
                  <label>Address</label>
                  <input 
                    type="text" 
                    placeholder="Enter Address" 
                    disabled={!isEditable} // Disable input if not editable
                  />
                </div>
                <div style={{ marginBottom: '20px', marginLeft: '80px' }}></div> 
                <div className="form-data right-column">
                  <label style={{ marginLeft: '3px' }}>Country</label>
                  <select 
                    defaultValue="" 
                    disabled={!isEditable} // Disable select if not editable
                  >
                    <option value="" disabled>Select country</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
                <div className="form-data left-column">
                  <label>Pincode</label>
                  <input 
                    type="text" 
                    placeholder="Enter pincode" 
                    disabled={!isEditable} // Disable input if not editable
                  />
                </div>
              </form>
            </div>
          )}

          <div className="update-button-container">
            <button 
              type="button" 
              className="update-button"
              onClick={handleEditProfileClick} // Toggle edit mode
            >
              {isEditable ? 'Save Changes' : 'Edit Profile'} {/* Change button text based on edit mode */}
            </button>
          </div>
        </div>
      </div>

      <Footer /> 
    </>
  );
};

export default AccountSettings;
