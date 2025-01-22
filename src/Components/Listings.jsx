import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import './Listings.css';
// Uncomment to bring the Footer back when you want to use it
// import Footer from './Footer';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ListOrdered, MessageSquare, Wallet, User, CalendarDays } from 'lucide-react';

function Listings() {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('https://run.mocky.io/v3/4757bff2-a5d3-41ac-b920-c190ef93895a');
        const data = await response.json();
        setListings(data.Listings || []);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);

  const handleRegisterNewJobClick = () => {
    navigate('/jobregistration');
  };

  const handleEditClick = (listingId) => {
    navigate(`/edit-vendor-profile/${listingId}`);
  };

  // Sidebar Styles
  const sidebarStyle = {
    width: '80px',
    backgroundColor: 'white',
    borderRight: '1px solid #eee',
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px 0',
  };

  const logoStyle = {
    width: '24px',
    height: '24px',
    marginBottom: '16px',
  };

  const sidebarItemStyle = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '8px 0',
    color: '#666',
    fontSize: '11px',
    cursor: 'pointer',
    textDecoration: 'none',
    marginBottom: '4px',
  };

  const activeItemStyle = {
    ...sidebarItemStyle,
    color: '#2563eb',
    position: 'relative',
  };

  const iconContainerStyle = {
    marginBottom: '4px',
  };

  const activeDotStyle = {
    width: '3px',
    height: '100%',
    backgroundColor: '#2563eb',
    position: 'absolute',
    left: 0,
    top: 0,
  };

  // Main Content Styles
  const styles = {
    container: {
      display: 'flex',
      fontFamily: 'Arial, sans-serif',
      height: '100vh',
      marginLeft: isMobile ? '0' : '80px', // Adjust for sidebar visibility
      flexDirection: 'column',
    },
    content: {
      marginLeft: isMobile ? '0' : '80px', // Content starts after sidebar on desktop
      width: '100%',
      paddingBottom: isMobile ? '60px' : '0', // Add padding to avoid footer overlap on mobile
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      borderBottom: '1px solid #ddd',
      backgroundColor: '#fff',
      borderColor: 'white',
      marginBottom: '30px',
    },
    headerTitle: {
      fontSize: '24px',
    },
    section: {
      padding: '2px',
    },
    sectionHeader: {
      fontSize: '18px',
      marginBottom: '10px',
    },
  };

  const MobileNav = () => (
    <nav className="mobile-nav">
      <Link to="/vendordashboard" className="nav-item">
        <Home size={20} />
        <span>Home</span>
      </Link>
      <Link to="/listings" className="nav-item active">
        <ListOrdered size={20} />
        <span>Listings</span>
      </Link>
      <Link to="/booking" className="nav-item">
        <CalendarDays size={20} />
        <span>Booking</span>
      </Link>
      <Link to="/messages" className="nav-item">
        <MessageSquare size={20} />
        <span>Messages</span>
      </Link>
      <Link to="/payments" className="nav-item">
        <Wallet size={20} />
        <span>Payments</span>
      </Link>
      <Link to="/profile" className="nav-item">
        <User size={20} />
        <span>Profile</span>
      </Link>
    </nav>
  );

  return (
    <div style={styles.container}>
      {/* Sidebar for Desktop */}
      {!isMobile && (
        <div style={sidebarStyle}>
          <img
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMkw0IDdWMjJIMjBWN0wxMiAyWiIgc3Ryb2tlPSIjMjU2M2ViIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg=="
            alt="Logo"
            style={logoStyle}
          />
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Link to="/vendordashboard" style={activeItemStyle}>
              <div style={activeDotStyle}></div>
              <span style={iconContainerStyle}><Home size={20} /></span>
              <span>Home</span>
            </Link>
            <Link to="/listings" style={sidebarItemStyle}>
              <span style={iconContainerStyle}><ListOrdered size={20} /></span>
              <span>Listings</span>
            </Link>
            <Link to="/booking" style={sidebarItemStyle}>
              <span style={iconContainerStyle}><CalendarDays size={20} /></span>
              <span>Booking</span>
            </Link>
            <Link to="/messages" style={sidebarItemStyle}>
              <span style={iconContainerStyle}><MessageSquare size={20} /></span>
              <span>Messages</span>
            </Link>
            <Link to="/payments" style={sidebarItemStyle}>
              <span style={iconContainerStyle}><Wallet size={20} /></span>
              <span>Payments</span>
            </Link>
            <Link to="/profile" style={sidebarItemStyle}>
              <span style={iconContainerStyle}><User size={20} /></span>
              <span>Profile</span>
            </Link>
          </div>
        </div>
      )}

      <div style={styles.content}>
        <h1 className="listings-title">Vendor Listings</h1>
        <div className="listings-container">
          <button className="register-button" onClick={handleRegisterNewJobClick}>
            <Plus size={16} />
            Register New Job
          </button>
          <div className="outer-container">
            <div className="inner-containers">
              {Array.isArray(listings) && listings.length > 0 ? (
                listings.map((listing) => (
                  <div key={listing.name} className="listing-container">
                    <div className="listing-info">
                      <h3 className="listing-name">{listing.name}</h3>
                      <p className="listing-detail">Category: {listing.category}</p>
                      <p className="listing-detail">Location: {listing.location}</p>
                      <button
                        className="edit-button"
                        onClick={() => handleEditClick(listing.id)}
                      >
                        Edit List
                      </button>
                    </div>
                    <div className="listing-image">
                      <img src={listing.imageUrl} alt={listing.title} />
                    </div>
                  </div>
                ))
              ) : (
                <p>No listings available</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Footer Navigation */}
      {isMobile && <MobileNav />}

      {/* Uncomment the footer when you want to use it */}
      {/* <Footer /> */}
    </div>
  );
}

export default Listings;
