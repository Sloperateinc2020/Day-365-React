import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header({ selectedMenu, setSelectedMenu }) {
  const navigate = useNavigate();

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu); 
    if (menu === 'Contact') {
      navigate('/contact');
    } else if (menu === 'Home') {
      navigate('/home');
    } else if (menu === 'All Services') {
      navigate('/all-services');
    }
  };

  const handleVendorClick = () => {
    navigate('/join-as-vendor'); 
  };

  return (
    <div style={styles.outerContainer}>
      <div style={styles.container}>
        <h1 style={styles.logoText}>LOGO</h1>
        
        <div style={styles.menuContainer}>
          <button
            onClick={() => handleMenuClick('Home')}
            style={{
              ...styles.textWithGap,
              ...(selectedMenu === 'Home' ? styles.selectedText : {}),
            }}
          >
            Home
          </button>
          <button
            onClick={() => handleMenuClick('All Services')}
            style={{
              ...styles.textWithGap,
              ...(selectedMenu === 'All Services' ? styles.selectedText : {}),
            }}
          >
            All Services
          </button>
          <button
            onClick={() => handleMenuClick('About')}
            style={{
              ...styles.textWithGap,
              ...(selectedMenu === 'About' ? styles.selectedText : {}),
            }}
          >
            About
          </button>
          <button
            onClick={() => handleMenuClick('Contact')}
            style={{
              ...styles.textWithGap,
              ...(selectedMenu === 'Contact' ? styles.selectedText : {}),
            }}
          >
            Contact
          </button>
          <button
            onClick={() => handleMenuClick('Login/Register')}
            style={{
              ...styles.textWithGap,
              ...(selectedMenu === 'Login/Register' ? styles.selectedText : {}),
            }}
          >
            Login/Register
          </button>
          {/* Add onClick for vendor button */}
          <button style={styles.vendorButton} onClick={handleVendorClick}>
            Join As Vendor
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  outerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    position: 'fixed', 
    top: 0, 
    width: '100%', 
    zIndex: 1000, 
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    width: '100%', 
    maxWidth: 1500,
    height: 60,
    borderRadius: 8,
    boxSizing: 'border-box', 
  },
  logoText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 10,
    marginLeft: 20,
  },
  menuContainer: {
    display: 'flex',
    marginLeft: 65,
    gap: 20,
    flexGrow: 1,
  },
  textWithGap: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: 16,
    color: 'black',
  },
  selectedText: {
    color: 'blue', 
  },
  vendorButton: {
    backgroundColor: '#8a6ded',
    color: 'white',
    padding: '10px 25px',
    borderRadius: 25,
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: 12,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
    marginLeft: 'auto', 
  },
};
