import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Profile.css';

const Profile = () => {
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Aadhar', checked: true, content: 'Content', size: '5kb' },
    { id: 2, name: 'PAN', checked: false, content: 'Content', size: '10kb' },
    { id: 3, name: 'Driving Licence', checked: false, content: 'Content', size: '10kb' },
    { id: 4, name: 'Certifications', checked: false, content: 'Content', size: '25kb' }
  ]);

  const [activeTab, setActiveTab] = useState('Documents');
  const [linkText, setLinkText] = useState('https://app.ahiregro...'); // State for the link text
  const navigate = useNavigate(); 

  const handleCheckbox = (id) => {
    setDocuments(documents.map(doc => 
      doc.id === id ? { ...doc, checked: !doc.checked } : doc
    ));
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'Account Settings') {
      navigate('/accountsettings'); // Navigate to AccountSettings page
    } else if (tab === 'Bank Details') {
      navigate('/bankdetails'); // Navigate to BankDetails page
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('https://app.ahiregro...');
    setLinkText('Copied'); // Set text to "Copied"
    
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

        {activeTab === 'Documents' && (
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
                        onChange={() => handleCheckbox(doc.id)}
                      />
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
        )}
      </div>
    </div>
  );
};

export default Profile;
