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
          <form style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
  {/* Left Column */}
  <div style={{ flex: '1 1 45%', display: 'flex', flexDirection: 'column', marginRight: '2rem' }}>
    <label style={{ fontWeight: 'bold', marginBottom: '0.3rem', textAlign: 'Left' }}>First Name</label>
    <input type="text" style={{ padding: '0.5rem', width:"250px", border: '1px solid #ccc', borderRadius: '4px' }} />

    <label style={{ fontWeight: 'bold', marginTop: '1rem', textAlign: 'Left' }}>Account Number</label>
    <input type="text" style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', width:"250px" }} />

    <label style={{ fontWeight: 'bold', marginTop: '1rem', textAlign: 'Left' }}>IFSC</label>
    <input type="text" style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', width:"250px" }} />

    <label style={{ fontWeight: 'bold', marginTop: '1rem', textAlign: 'Left' }}>Mobile</label>
    <input type="text" style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', width:"250px" }} />
  </div>

  {/* Right Column - Move Slightly Left */}
  <div style={{ flex: '1 1 45%', display: 'flex', flexDirection: 'column', marginLeft: '-450px' }}>
    <label style={{ fontWeight: 'bold', marginBottom: '0.3rem', textAlign: 'left' }}>Last Name</label>
    <input type="text" style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', width:"250px" }} />

    <label style={{ fontWeight: 'bold', marginTop: '1rem', textAlign: 'left' }}>Confirm Account Number</label>
    <input type="text" style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', width:"250px" }} />

    <label style={{ fontWeight: 'bold', marginTop: '1rem', textAlign: 'left' }}>Branch</label>
    <input type="text" style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', width:"250px" }} />

    <label style={{ fontWeight: 'bold', marginTop: '1rem', textAlign: 'left' }}>Email</label>
    <input type="email" style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', width:"250px" }} />
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
