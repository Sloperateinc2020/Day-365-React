import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faListAlt, faInfoCircle, faEnvelope, faUser, faStore } from '@fortawesome/free-solid-svg-icons';

export default function Header({ selectedMenu, setSelectedMenu }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Detect screen resize to adjust header layout dynamically
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [location.pathname]);

  // Function to handle navigation and update selected menu
  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);

    if (menu === 'Contact') {
      navigate('/contact');
    } else if (menu === 'Home') {
      navigate('/home');
    } else if (menu === 'All Services') {
      navigate('/allservices');
    } else if (menu === 'About') {
      navigate('/about');
    } else if (menu === 'Login/Register') {
      navigate('/signup');
    }
  };

  const handleVendorClick = () => {
    navigate('/join-as-vendor');
  };

  const outerContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    position: 'fixed',
    width: '100%',
    zIndex: 1000,
    top: isMobile ? 'unset' : 0, // Top for desktop
    bottom: isMobile ? 0 : 'unset', // Bottom for mobile
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    width: '100%',
    maxWidth: 1500,
    height: 60,
    boxSizing: 'border-box',
    justifyContent: isMobile ? 'space-around' : 'flex-start',
  };

  const logoTextStyle = {
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 10,
    marginLeft: 20,
    display: isMobile ? 'none' : 'block', // Hide logo on mobile
  };

  const menuContainerStyle = {
    display: 'flex',
    gap: isMobile ? 0 : 20, // Remove gap for mobile to fit in one line
    flexGrow: 1,
    justifyContent: isMobile ? 'space-around' : 'flex-start',
    width: '100%',
  };

  const textWithGapStyle = (isSelected) => ({
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: isMobile ? 12 : 16, // Smaller font size for mobile
    color: isSelected ? 'blue' : 'black', // Highlight selected menu with blue
  });

  const vendorButtonStyle = {
    backgroundColor: '#8a6ded',
    color: 'white',
    padding: '5px 10px',
    borderRadius: 25,
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 'auto',
  };

  return (
    <div style={outerContainerStyle}>
      <div style={containerStyle}>
        <h1 style={logoTextStyle}>LOGO</h1>

        <div style={menuContainerStyle}>
          <button
            onClick={() => handleMenuClick('Home')}
            style={textWithGapStyle(selectedMenu === 'Home')}
          >
            <FontAwesomeIcon icon={faHome} /> Home
          </button>
          <button
            onClick={() => handleMenuClick('All Services')}
            style={textWithGapStyle(selectedMenu === 'All Services')}
          >
            <FontAwesomeIcon icon={faListAlt} /> All Services
          </button>
          <button
            onClick={() => handleMenuClick('About')}
            style={textWithGapStyle(selectedMenu === 'About')}
          >
            <FontAwesomeIcon icon={faInfoCircle} /> About
          </button>
          <button
            onClick={() => handleMenuClick('Contact')}
            style={textWithGapStyle(selectedMenu === 'Contact')}
          >
            <FontAwesomeIcon icon={faEnvelope} /> Contact
          </button>

          {/* Display Login/Register only on desktop/laptop */}
          {!isMobile && (
            <button
              onClick={() => handleMenuClick('Login/Register')}
              style={textWithGapStyle(selectedMenu === 'Login/Register')}
            >
              <FontAwesomeIcon icon={faUser} /> Login/Register
            </button>
          )}

          {/* Hide "Join As A Vendor" button on mobile */}
          {!isMobile && (
            <button style={vendorButtonStyle} onClick={handleVendorClick}>
              <FontAwesomeIcon icon={faStore} /> Join As A Vendor
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
