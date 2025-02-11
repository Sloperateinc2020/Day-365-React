import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AccountSettings.css';
import Footer from '../Footer';
import AccountSettingsMobile from './AccountSettingsMobile'; // Import mobile version

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState('Account Settings');
  const [linkText, setLinkText] = useState('https://app.ahiregro...');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    city: "",
    state: "",
    postcode: "",
    country: "",
  });
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'Documents') {
      navigate('/documents');
    } else if (tab === 'Bank Details') {
      navigate('/bankdetails');
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  return isMobile ? (
    <AccountSettingsMobile /> // Show only mobile version
  ) : (
    <>
      <div className="desktop-account-settings">
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
                 <form>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {[
              { label: "First Name", name: "firstName", type: "text", isRightColumn: false },
              { label: "Last Name", name: "lastName", type: "text", isRightColumn: true },
              { label: "Phone Number", name: "phone", type: "text", isRightColumn: false },
              { label: "Email Address", name: "email", type: "email", isRightColumn: true },
              { label: "City", name: "city", type: "text", isRightColumn: false },
              { label: "State", name: "state", type: "text", isRightColumn: true },
              { label: "Postcode", name: "postcode", type: "text", isRightColumn: false },
              { label: "Country", name: "country", type: "text", isRightColumn: true },
            ].map((field, index) => (
              <div
                key={index}
                style={{
                  flex: "1 1 calc(50% - 5px)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  marginLeft: field.isRightColumn ? "-390px" : "0px", // Move right-column labels left
                }}
              >
                <label
                  style={{
                    display: "block",
                    fontWeight: "bold",
                    marginBottom: "5px",
                    textAlign: "left",
                    width: "100%",
                  }}
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  value={formData[field.name]}
                  onChange={handleChange}
                  style={{
                    width: "40%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            ))}
          </div>
        </form>
             <div className="update-button-container">
                  <button type="submit" className="update-button">Update</button>
             </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer /> 
    </>
  );
};

export default AccountSettings;
