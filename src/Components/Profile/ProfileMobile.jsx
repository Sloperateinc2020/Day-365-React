// ProfileMobile.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer'; // Make sure the path is correct

const ProfileMobile = () => {
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Aadhar', checked: true, content: 'Content', size: '5kb' },
    { id: 2, name: 'PAN', checked: false, content: 'Content', size: '10kb' },
    { id: 3, name: 'Driving Licence', checked: false, content: 'Content', size: '10kb' },
    { id: 4, name: 'Certifications', checked: false, content: 'Content', size: '25kb' }
  ]);

  const [activeTab, setActiveTab] = useState('Documents');
  const [linkText, setLinkText] = useState('https://app.ahiregro...');
  const navigate = useNavigate();

  const handleCheckbox = (id) => {
    setDocuments(documents.map(doc =>
      doc.id === id ? { ...doc, checked: !doc.checked } : doc
    ));
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

  return (
    <>
      <div style={{ position: "relative", padding: "20px", fontFamily: "Arial, sans-serif", marginTop: "50px" }}>
        {/* Cover Background */}
        <div style={{
          position: "absolute",
          top: "-100px",
          left: 0,
          width: "100%",
          height: "30%",
          backgroundColor: "#3f51b5",
          zIndex: -1
        }}></div>

        {/* Change Cover Button */}
        <button style={{
          position: "absolute",
          top: "-30px",
          right: "25px",
          backgroundColor: "white",
          color: "#1c237e",
          border: "2px solid #1c237e",
          borderRadius: "8px",
          padding: "8px 12px",
          fontSize: "14px",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          cursor: "pointer",
          boxShadow: "0px 2px 5px rgba(15, 12, 201, 0.2)"
        }}>
          <span>📷</span> Change Cover
        </button>

        {/* Profile Container */}
        <div style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "20px",
          boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
          textAlign: "center",
          marginBottom: "20px"
        }}>
          {/* Profile Picture */}
          <div style={{
            width: "80px",
            height: "80px",
            backgroundColor: "#ccc",
            borderRadius: "50%",
            margin: "0 auto 10px"
          }}></div>

          <h3 style={{ margin: "0 0 5px" }}>Thirupathi Raju Vattem</h3>
          <p style={{ margin: "0", color: "gray" }}>Haryak Inc.</p>

          {/* Stats */}
          <div style={{ display: "flex", justifyContent: "space-around", margin: "20px 0" }}>
            <div><span>Opportunities applied</span><br /><strong style={{ color: "green" }}>2</strong></div>
            <div><span>Completed Bookings</span><br /><strong style={{ color: "green" }}>26</strong></div>
            <div><span>Upcoming Bookings</span><br /><strong style={{ color: "green" }}>6</strong></div>
          </div>

          {/* Public Profile Button */}
          <button style={{
            padding: "10px 15px",
            border: "none",
            backgroundColor: "#007BFF",
            color: "white",
            borderRadius: "5px",
            width: "100%"
          }}>
            View Public Profile
          </button>

          {/* Copy Link */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
            backgroundColor: "#f1f1f1",
            padding: "5px",
            borderRadius: "5px"
          }}>
            <span style={{
              marginRight: "10px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "80%"
            }}>
              {linkText}
            </span>
            <button onClick={handleCopy} style={{
              padding: "5px",
              border: "none",
              backgroundColor: "#ddd",
              cursor: "pointer"
            }}>📋</button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", justifyContent: "space-around", margin: "20px 0" }}>
          {["Account Settings", "Documents", "Bank Details"].map(tab => (
            <button key={tab} onClick={() => handleTabClick(tab)} style={{
              backgroundColor: activeTab === tab ? "#007BFF" : "#ddd",
              padding: "10px",
              borderRadius: "5px"
            }}>
              {tab}
            </button>
          ))}
        </div>

        {/* Documents Section */}
        {activeTab === 'Documents' && (
          <div style={{ width: '100%' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold' }}>Uploaded Documents</h2>
            <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse', marginTop: '10px' }}>
              <thead>
                <tr>
                  <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Check</th>
                  <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Document Name</th>
                  <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Comment</th>
                  <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Size</th>
                  <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {documents.map(doc => (
                  <tr key={doc.id}>
                    <td style={{ padding: '8px' }}>
                      <input
                        type="checkbox"
                        checked={doc.checked}
                        onChange={() => handleCheckbox(doc.id)}
                      />
                    </td>
                    <td style={{ padding: '8px' }}>{doc.name}</td>
                    <td style={{ padding: '8px' }}>{doc.content}</td>
                    <td style={{ padding: '8px' }}>{doc.size}</td>
                    <td style={{ padding: '8px' }}>
                      <button style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '5px', cursor: 'pointer' }}>✏️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
              <button style={{
                width: '20%', padding: '10px', fontSize: '14px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer'
              }}>Upload</button>
              <button style={{
                width: '20%', padding: '10px', fontSize: '14px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer'
              }}>Delete</button>
            </div>
          </div>
        )}
      </div>
      {/* The Footer */}
      <Footer />
    </>
  );
};

export default ProfileMobile;