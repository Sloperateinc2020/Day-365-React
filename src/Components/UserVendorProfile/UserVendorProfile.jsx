import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserVendorProfile.css';
import Footer from '../Footer';
import UserVendorProfileMobile from './UserVendorProfileMobile'; // Importing mobile version

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState('Account Settings');
  const [isEditable, setIsEditable] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleEditProfileClick = () => {
    setIsEditable(!isEditable);
  };

  return (
    <>
      {/* Mobile Version */}
      {isMobile ? (
        <UserVendorProfileMobile />
      ) : (
        <>
          <div className="cover-text">
            <i className="fas fa-camera" style={{ marginRight: '8px', fontSize: '20px' }}></i>
            Change Cover
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
                  <span>Opportunities Applied</span>
                  <span className="stat-number">2</span>
                </div>
                <div className="stat-item">
                  <span>Completed Bookings</span>
                  <span className="stat-number">26</span>
                </div>
                <div className="stat-item">
                  <span>Upcoming Bookings</span>
                  <span className="stat-number">6</span>
                </div>
              </div>
              <button className="view-profile-button">View Public Profile</button>
            </div>

            <div className="profile-content">
              <div className="tabs">
                <button
                  className={activeTab === 'Account Settings' ? 'active' : ''}
                  onClick={() => setActiveTab('Account Settings')}
                >
                  Account Settings
                </button>
              </div>

              {activeTab === 'Account Settings' && (
                <div className="account-settings-wrapper">
                  <form className="account-form">
                    <div className="form-data left-column">
                      <label>First Name</label>
                      <input type="text" placeholder="Enter first name" disabled={!isEditable} />
                    </div>
                    <div className="form-data right-column">
                      <label>Last Name</label>
                      <input type="text" placeholder="Enter last name" disabled={!isEditable} />
                    </div>
                    <div className="form-data left-column">
                      <label>Account Number</label>
                      <input type="text" placeholder="Enter account number" disabled={!isEditable} />
                    </div>
                    <div className="form-data right-column">
                      <label>Confirm Account Number</label>
                      <input type="text" placeholder="Confirm account number" disabled={!isEditable} />
                    </div>
                    <div className="form-data left-column">
                      <label>IFSC</label>
                      <input type="text" placeholder="Enter IFSC" disabled={!isEditable} />
                    </div>
                    <div className="form-data right-column">
                      <label>Branch</label>
                      <input type="text" placeholder="Enter branch" disabled={!isEditable} />
                    </div>
                    <div className="form-data left-column">
                      <label>Mobile</label>
                      <input type="text" placeholder="Enter mobile" disabled={!isEditable} />
                    </div>
                    <div className="form-data right-column">
                      <label>Email</label>
                      <input type="email" placeholder="Enter email" disabled={!isEditable} />
                    </div>
                  </form>
                </div>
              )}

              <div className="update-button-container">
                <button
                  type="button"
                  className="update-button"
                  onClick={handleEditProfileClick}
                >
                  {isEditable ? 'Save Changes' : 'Edit Profile'}
                </button>
              </div>
            </div>
          </div>

          {!isMobile && <Footer />}
        </>
      )}
    </>
  );
};

export default AccountSettings;