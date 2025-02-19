import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faListAlt, faInfoCircle, faEnvelope, faUser, faStore, faShoppingCart, faUserCircle
} from '@fortawesome/free-solid-svg-icons';

export default function Header({ selectedMenu, setSelectedMenu }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [location.pathname]);

  useEffect(() => {
    const handleLoginStatus = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    };

    window.addEventListener('storage', handleLoginStatus);
    window.addEventListener('login', handleLoginStatus);
    window.addEventListener('logout', handleLoginStatus);

    return () => {
      window.removeEventListener('storage', handleLoginStatus);
      window.removeEventListener('login', handleLoginStatus);
      window.removeEventListener('logout', handleLoginStatus);
    };
  }, []);

  // Add click outside handler to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.profile-section')) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    setDropdownOpen(false);

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
    } else if (menu === 'Beauty') {
      navigate('/beautyServices');
    }
  };

  const handleVendorClick = () => {
    navigate('/join-as-vendor');
    setDropdownOpen(false);
  };

  const handleProfileClick = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    window.dispatchEvent(new Event('logout'));
    setDropdownOpen(false);
    navigate('/home'); // Navigate to home after logout
  };

  if (location.pathname === '/payments') {
    return null;
  }

  const outerContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    position: 'fixed',
    width: '100%',
    zIndex: 1000,
    top: isMobile ? 'unset' : 0,
    bottom: isMobile ? 0 : 'unset',
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
    justifyContent: isMobile ? 'space-around' : 'space-between',
  };

  const logoTextStyle = {
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 10,
    marginLeft: 20,
    display: isMobile ? 'none' : 'block',
  };

  const menuContainerStyle = {
    display: 'flex',
    gap: isMobile ? 0 : 20,
    flexGrow: 1,
    justifyContent: isMobile ? 'space-around' : 'flex-start',
    width: '100%',
  };

  const textWithGapStyle = (isSelected) => ({
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: isMobile ? 12 : 16,
    color: isSelected ? 'blue' : 'black',
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: 'center',
    gap: isMobile ? '4px' : '10px',
  });

  const profileIconStyle = {
    cursor: 'pointer',
    marginLeft: 'auto',
    fontSize: '33px',
    color: '#8a6ded',
    marginBottom: '-20px'  // Adjusted marginBottom for more space at the bottom
};


  const vendorButtonStyle = {
    backgroundColor: '#8a6ded',
    color: 'white',
    border: 'none',
    padding: '10px 10px',
    cursor: 'pointer',
    borderRadius: '25px',
    fontSize: '12px',
    marginLeft: '380px',
  };

  const dropdownMenuStyle = {
    position: 'absolute',
    right: '10px',
    top: '70px',
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    zIndex: 1001,
    listStyle: 'none',
    padding: '0',
    margin: '0',
  };

  const dropdownItemStyle = {
    padding: '12px 20px',
    cursor: 'pointer',
    color: 'black',
    borderBottom: '1px solid #eee',
    transition: 'background-color 0.2s',
    whiteSpace: 'nowrap',
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
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
            <FontAwesomeIcon icon={faHome} />
            {isMobile ? 'Home' : 'Home'}
          </button>
          <button
            onClick={() => handleMenuClick('All Services')}
            style={textWithGapStyle(selectedMenu === 'All Services')}
          >
            <FontAwesomeIcon icon={faListAlt} />
            {isMobile ? 'All Services' : 'All Services'}
          </button>
          <button
            onClick={() => handleMenuClick('Beauty')}
            style={textWithGapStyle(selectedMenu === 'Beauty')}
          >
            <FontAwesomeIcon icon={faStore} />
            {isMobile ? 'Beauty' : 'Beauty'}
          </button>
          <button
            onClick={() => handleMenuClick('About')}
            style={textWithGapStyle(selectedMenu === 'About')}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            {isMobile ? 'About' : 'About'}
          </button>
          <button
            onClick={() => handleMenuClick('Contact')}
            style={textWithGapStyle(selectedMenu === 'Contact')}
          >
            <FontAwesomeIcon icon={faEnvelope} />
            {isMobile ? 'Contact' : 'Contact'}
          </button>

          {!isMobile && !isLoggedIn && (
            <>
              <button
                onClick={() => handleMenuClick('Login/Register')}
                style={textWithGapStyle(selectedMenu === 'Login/Register')}
              >
                <FontAwesomeIcon icon={faUser} />
                Login/Register
              </button>
              <button
  onClick={handleVendorClick}
  style={{ ...vendorButtonStyle, marginLeft: '393px' }}  // Adjust the 20px as per your need
>
  Join As Vendor
</button>

            </>
          )}

          {isLoggedIn && !isMobile && (
            <div className="profile-section" style={{ marginLeft: 'auto', position: 'relative' }}>
              <FontAwesomeIcon
                icon={faUserCircle}
                style={profileIconStyle}
                onClick={handleProfileClick}
              />
              {isDropdownOpen && (
                <div style={dropdownMenuStyle}>
                  <div
                    style={{...dropdownItemStyle, backgroundColor: location.pathname === '/uservendorprofile' ? '#f0f0f0' : 'white'}}
                    onClick={() => {
                      navigate('/uservendorprofile');
                      setDropdownOpen(false);
                    }}
                  >
                    Profile
                  </div>
                  <div
                    style={dropdownItemStyle}
                    onClick={handleVendorClick}
                  >
                    Join as a Vendor
                  </div>
                  <div
                    style={dropdownItemStyle}
                    onClick={() => {
                      alert('Upgrade Plan Clicked');
                      setDropdownOpen(false);
                    }}
                  >
                    Upgrade Plan
                  </div>
                  <div
                    style={dropdownItemStyle}
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div> 
          )}
        </div>
      </div>
    </div>
  );
}