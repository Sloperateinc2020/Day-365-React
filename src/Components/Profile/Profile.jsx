import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import Footer from '../Footer'; // Import Footer component
import ProfileMobile from './ProfileMobile'; // Import the mobile version

function Profile() {
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Aadhar', checked: true, content: 'Content', size: '5kb' },
    { id: 2, name: 'PAN', checked: false, content: 'Content', size: '10kb' },
    { id: 3, name: 'Driving Licence', checked: false, content: 'Content', size: '10kb' },
    { id: 4, name: 'Certifications', checked: false, content: 'Content', size: '25kb' }
  ]);
  const [activeTab, setActiveTab] = useState('Documents');
  const [linkText, setLinkText] = useState('https://app.ahiregro...');
  const [isMobile, setIsMobile] = useState(false); // Track mobile view
  const navigate = useNavigate();

  // Check if the device is mobile
  const checkIfMobile = () => {
    setIsMobile(window.innerWidth <= 768); // Adjust the threshold as needed
  };

  useEffect(() => {
    checkIfMobile(); // Check initially
    window.addEventListener('resize', checkIfMobile); // Check on window resize

    return () => {
      window.removeEventListener('resize', checkIfMobile); // Clean up the event listener
    };
  }, []);

  const handleCheckbox = (id) => {
    setDocuments(documents.map(doc => doc.id === id ? { ...doc, checked: !doc.checked } : doc));
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'Account Settings') {
      navigate('/accountsettings');
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

  if (isMobile) {
    // Render ProfileMobile for mobile screens
    return <ProfileMobile />;
  }

  // Render Profile for desktop
  return (
    <>
      {/* Desktop Profile - Hidden on mobile screens */}
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
              onClick={() => setActiveTab('Documents')}
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

          <div className={activeTab === 'Documents' ? 'active-section' : ''}>
            <div className="documents-section">
              <h2>Uploaded Documents</h2>
              <table className="documents-table">
                <thead>
                  <tr>
                    <th>Check</th>
                    <th>Document Name</th>
                    <th>Comment</th>
                    <th>Size</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map(doc => (
                    <tr key={doc.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={doc.checked}
                          onChange={() => handleCheckbox(doc.id)} />
                      </td>
                      <td>{doc.name}</td>
                      <td>{doc.content}</td>
                      <td>{doc.size}</td>
                      <td>
                        <button className="edit-btn">✏️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="document-actions">
                <button className="upload-btn">Upload</button>
                <button className="delete-btn">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Footer */}
      <Footer />
    </>
  );
}

export default Profile;
