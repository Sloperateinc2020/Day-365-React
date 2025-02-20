import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse, faList, faStore, faCircleInfo, faEnvelope, faUser, faUserCircle, faRightToBracket, faRightFromBracket, faUserPlus, faCrown,
  faTasks, faHandshake, faSmile, faTools, faPalette, faEllipsis // Updated icon names
} from '@fortawesome/free-solid-svg-icons';

export default function Header({ selectedMenu, setSelectedMenu }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [hoveredMenu, setHoveredMenu] = useState(null);

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

    if (menu === 'Home') {
      navigate('/home');
    } else if (menu === 'All Services') {
      navigate('/allservices');
    } else if (menu === 'About') {
      navigate('/about');
    } else if (menu === 'Login/Register') {
      navigate('/signup');
    } else if (menu === 'Beauty') {
      navigate('/beautyServices');
    } else if (menu === 'More') {
      // Handle the "More" menu click
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

  const textWithGapStyle = (isSelected, isHovered) => ({
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: isMobile ? 12 : 16,
    color: isSelected ? getMenuColor(selectedMenu) : 'black', // Change color based on selected menu
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: 'center',
    gap: isMobile ? '4px' : '10px',
  });

  const iconStyle = (isSelected) => ({
    color: isSelected ? getMenuColor(selectedMenu) : 'black', // Change color based on selected menu
  });

  const moreIconStyle = (isSelected) => ({
    color: isSelected ? '#FF5733' : 'black', // Change colors to different on hover or select for "More"
  });

  const profileIconStyle = {
    cursor: 'pointer',
    marginLeft: 'auto',
    fontSize: '33px',
    color: 'black', // Changed to black
    marginBottom: '-20px', // Adjusted marginBottom for more space at the bottom
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
  };

  const getMenuColor = (menu) => {
    switch (menu) {
      case 'Home':
        return '#8A2BE2'; // Purple
      case 'All Services':
        return '#FF5733'; // Orange
      case 'Beauty':
        return '#FF33A1'; // Pink
      case 'About':
        return '#3357FF'; // Blue
      case 'More':
        return '#FF33A1'; // Pink
      default:
        return '#ff2c2c';
    }
  };

  return (
    <div style={outerContainerStyle}>
      <div style={containerStyle}>
        <h1 style={logoTextStyle}>LOGO</h1>

        <div style={menuContainerStyle}>
          <button
            onClick={() => handleMenuClick('Home')}
            onMouseEnter={() => setHoveredMenu('Home')}
            onMouseLeave={() => setHoveredMenu(null)}
            style={textWithGapStyle(selectedMenu === 'Home', hoveredMenu === 'Home')}
          >
            <FontAwesomeIcon 
              icon={faHouse} 
              style={iconStyle(selectedMenu === 'Home')}
            />
            <span style={iconStyle(selectedMenu === 'Home')}>Home</span>
          </button>
          <button
            onClick={() => handleMenuClick('All Services')}
            onMouseEnter={() => setHoveredMenu('All Services')}
            onMouseLeave={() => setHoveredMenu(null)}
            style={textWithGapStyle(selectedMenu === 'All Services', hoveredMenu === 'All Services')}
          >
            <FontAwesomeIcon 
              icon={faTools} 
              style={iconStyle(selectedMenu === 'All Services')}
            />
            <span style={iconStyle(selectedMenu === 'All Services')}>All Services</span>
          </button>
          <button
            onClick={() => handleMenuClick('Beauty')}
            onMouseEnter={() => setHoveredMenu('Beauty')}
            onMouseLeave={() => setHoveredMenu(null)}
            style={textWithGapStyle(selectedMenu === 'Beauty', hoveredMenu === 'Beauty')}
          >
            <FontAwesomeIcon 
              icon={faPalette} 
              style={iconStyle(selectedMenu === 'Beauty')}
            />
            <span style={iconStyle(selectedMenu === 'Beauty')}>Beauty</span>
          </button>
          <button
            onClick={() => handleMenuClick('About')}
            onMouseEnter={() => setHoveredMenu('About')}
            onMouseLeave={() => setHoveredMenu(null)}
            style={textWithGapStyle(selectedMenu === 'About', hoveredMenu === 'About')}
          >
            <FontAwesomeIcon 
              icon={faCircleInfo} 
              style={iconStyle(selectedMenu === 'About')}
            />
            <span style={iconStyle(selectedMenu === 'About')}>About</span>
          </button>
          <button
            onClick={() => handleMenuClick('More')}
            onMouseEnter={() => setHoveredMenu('More')}
            onMouseLeave={() => setHoveredMenu(null)}
            style={textWithGapStyle(selectedMenu === 'More', hoveredMenu === 'More')}
          >
            <FontAwesomeIcon 
              icon={faEllipsis} 
              style={moreIconStyle(selectedMenu === 'More')}
            />
            <span style={moreIconStyle(selectedMenu === 'More')}>More</span>
          </button>

          {!isMobile && !isLoggedIn && (
            <React.Fragment>
              <button
                onClick={() => handleMenuClick('Login/Register')}
                onMouseEnter={() => setHoveredMenu('Login/Register')}
                onMouseLeave={() => setHoveredMenu(null)}
                style={textWithGapStyle(selectedMenu === 'Login/Register', hoveredMenu === 'Login/Register')}
              >
                <FontAwesomeIcon 
                  icon={faRightToBracket} 
                  style={iconStyle(selectedMenu === 'Login/Register')}
                />
                <span style={iconStyle(selectedMenu === 'Login/Register')}>Login/Register</span>
              </button>
              <button
                onClick={handleVendorClick}
                style={vendorButtonStyle}
              >
                Join As Vendor
              </button>
            </React.Fragment>
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