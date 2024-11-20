import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header({ selectedMenu, setSelectedMenu }) {
  const navigate = useNavigate();

  // Function to handle navigation and update selected menu
  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);  // Set the selected menu in the parent component
    if (menu === 'Contact') {
      navigate('/booking');  // Navigate to the Booking page
    } else if (menu === 'Home') {
      navigate('/home');  // Navigate to Home page
    } else if (menu === 'All Services') {
      navigate('/allservices');  // Navigate to All Services page
    } else if (menu === 'About') {
      navigate('/about');  // Navigate to About page
    }
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
          <button style={styles.vendorButton}>
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
    color: 'blue', // Highlight selected menu with blue
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
