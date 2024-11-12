import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BankDetails.css';

const BankDetails = () => {
  const [activeTab, setActiveTab] = useState('Bank Details');
  const [linkText, setLinkText] = useState('https://app.ahiregro...'); // Link text state
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'Documents') {
      navigate('/profile'); // Navigate to Profile page when Documents is clicked
    } else if (tab === 'Account Settings') {
      navigate('/accountsettings'); // Navigate to AccountSettings page when Account Settings is clicked
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(linkText); // Copy the link text to clipboard
    setLinkText('Copied'); // Temporarily change link text to "Copied"
    
    // Revert back to the original link text after a delay
    setTimeout(() => {
      setLinkText('https://app.ahiregro...');
    }, 2000); // 2-second delay
  };

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
            onClick={() => setActiveTab('Bank Details')}
          >
            Bank Details
          </button>
        </div>

        {activeTab === 'Bank Details' && (
          <div className="bank-details-wrapper">
            <form className="bank-form">
              <div className="form-data left-column">
                <label>First Name</label>
                <input type="text" placeholder="" />
              </div>
              <div className="form-data right-column">
                <label>Last Name</label>
                <input type="text" placeholder="" />
              </div>
              <div className="form-data left-column">
                <label>Account Number</label>
                <input type="text" placeholder="+91 " />
              </div>
              <div className="form-data right-column">
                <label>Confirm Account Number</label>
                <input type="text" placeholder="nathaniel.poole@microsoft.com" />
              </div>
              <div className="form-data left-column">
                <label>IFSC</label>
                <input type="text" placeholder="" />
              </div>
              <div className="form-data right-column">
                <label>Branch</label>
                <input type="text" placeholder="Hyderabad" />
              </div>
              <div className="form-data left-column">
                <label>Mobile</label>
                <input type="text" placeholder="" />
              </div>
              <div className="form-data right-column">
                <label>Email</label>
                <input type="email" placeholder="" />
              </div>
            </form>

            <div className="update-button-container">
              <button type="submit" className="update-button">Update</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BankDetails;
