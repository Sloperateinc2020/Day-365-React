import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BankDetails.css';
import Footer from '../Footer'; 
import BankDetailsMobile from './BankDetailsMobile'; // Import the mobile version

const BankDetails = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Check initial screen width
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Update state when resizing
    };

    window.addEventListener('resize', handleResize); // Listen for resize events
    return () => window.removeEventListener('resize', handleResize); // Cleanup
  }, []);

  // Render mobile version if screen is small
  if (isMobile) {
    return <BankDetailsMobile />;
  }

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
              <span>https://app.ahiregro...</span>
              <button className="copy-btn">📋</button>
            </div>
          </div>
        </div>

        <div className="profile-content">
          <div className="tabs">
            <button 
              className="active"
              onClick={() => navigate('/accountsettings')}
            >
              Account Settings
            </button>
            <button onClick={() => navigate('/documents')}>
              Documents
            </button>
            <button className="active">
              Bank Details
            </button>
          </div>

          <div className="bank-details-wrapper">
            <form className="bank-form">
              <div className="form-data left-column">
                <label>First Name</label>
                <input type="text" />
              </div>
              <div className="form-data right-column">
                <label>Last Name</label>
                <input type="text" />
              </div>
              <div className="form-data left-column">
                <label>Account Number</label>
                <input type="text" />
              </div>
              <div className="form-data right-column">
                <label>Confirm Account Number</label>
                <input type="text" />
              </div>
              <div className="form-data left-column">
                <label>IFSC</label>
                <input type="text" />
              </div>
              <div className="form-data right-column">
                <label>Branch</label>
                <input type="text" />
              </div>
              <div className="form-data left-column">
                <label>Mobile</label>
                <input type="text" />
              </div>
              <div className="form-data right-column">
                <label>Email</label>
                <input type="email" />
              </div>
            </form>

            <div className="update-button-container">
              <button type="submit" className="update-button">Update</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BankDetails;
