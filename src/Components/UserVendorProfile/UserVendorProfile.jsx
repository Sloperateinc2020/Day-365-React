import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserVendorProfile.css';
import Footer from '../Footer';
import UserVendorProfileMobile from './UserVendorProfileMobile';

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState('Account Settings');
  const [isEditable, setIsEditable] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    phone: '',
    accountNumber: '',
    ifsc: '',
    branch: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Load user data from localStorage
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      setUserData(prevData => ({
        ...prevData,
        ...parsedData,
        firstName: parsedData.fullName.split(' ')[0] || '',
        lastName: parsedData.fullName.split(' ').slice(1).join(' ') || ''
      }));
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleEditProfileClick = () => {
    if (isEditable) {
      // Save the changes to localStorage
      const updatedUserData = {
        ...userData,
        fullName: `${userData.firstName} ${userData.lastName}`.trim()
      };
      localStorage.setItem('userData', JSON.stringify(updatedUserData));
    }
    setIsEditable(!isEditable);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
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
                <h3>{userData.fullName}</h3>
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
                      <input
                        type="text"
                        name="firstName"
                        value={userData.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter first name"
                        disabled={!isEditable}
                      />
                    </div>
                    <div className="form-data right-column">
                      <label>Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={userData.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter last name"
                        disabled={!isEditable}
                      />
                    </div>
                    <div className="form-data left-column">
                      <label>Account Number</label>
                      <input
                        type="text"
                        name="accountNumber"
                        value={userData.accountNumber}
                        onChange={handleInputChange}
                        placeholder="Enter account number"
                        disabled={!isEditable}
                      />
                    </div>
                    <div className="form-data right-column">
                      <label>Confirm Account Number</label>
                      <input
                        type="text"
                        placeholder="Confirm account number"
                        disabled={!isEditable}
                      />
                    </div>
                    <div className="form-data left-column">
                      <label>IFSC</label>
                      <input
                        type="text"
                        name="ifsc"
                        value={userData.ifsc}
                        onChange={handleInputChange}
                        placeholder="Enter IFSC"
                        disabled={!isEditable}
                      />
                    </div>
                    <div className="form-data right-column">
                      <label>Branch</label>
                      <input
                        type="text"
                        name="branch"
                        value={userData.branch}
                        onChange={handleInputChange}
                        placeholder="Enter branch"
                        disabled={!isEditable}
                      />
                    </div>
                    <div className="form-data left-column">
                      <label>Mobile</label>
                      <input
                        type="text"
                        name="phone"
                        value={userData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter mobile"
                        disabled={!isEditable}
                      />
                    </div>
                    <div className="form-data right-column">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        placeholder="Enter email"
                        disabled={!isEditable}
                      />
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