// Header.js
import React from 'react';

export default function Header({ selectedMenu, setSelectedMenu }) {
  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <div style={styles.outerContainer}>
      <div style={styles.container}>
        <h1 style={styles.logoText}>LOGO</h1>
        
        {/* Menu Items */}
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
          <button onClick={() => handleMenuClick('About')} style={styles.textWithGap}>
            About
          </button>
          <button onClick={() => handleMenuClick('Contact')} style={styles.textWithGap}>
            Contact
          </button>
          <button onClick={() => handleMenuClick('Login/Register')} style={styles.textWithGap}>
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
    width: '100%',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    width: '120%',
    maxWidth: 1300,
    height: 40,
    borderRadius: 8,
    // boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
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
    marginLeft:"450px"
  },
};
