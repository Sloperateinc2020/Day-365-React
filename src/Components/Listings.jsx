import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import './Listings.css';  // Assuming you added the CSS in Listings.css
import Footer from './Footer';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { Bell, Home, ListOrdered, MessageSquare, Wallet, User, CalendarDays } from 'lucide-react';

// Sidebar Component
const Sidebar = () => {
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
    overflowX: 'hidden', // Prevent horizontal scrolling in the sidebar
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

  return (
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
  );
};

function Listings() {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook for routing

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('https://run.mocky.io/v3/864ba685-8d15-4cd6-ba18-d08e081bc7ad');
        const data = await response.json();
        console.log('Fetched Data:', data);  // Log to check the structure
        setListings(data.Listings || []);  // Ensure 'Listings' key exists in response
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);

  const handleRegisterNewJobClick = () => {
    // Navigate to the job registration page
    navigate('/jobregistration');
  };

  const handleEditClick = (listingId) => {
    // Navigate to the EditVendorProfile page with the listingId
    navigate(`/edit-vendor-profile/${listingId}`);
  };

  return (
    <>
      <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div style={{ marginLeft: '80px', width: '100%', paddingBottom: '80px' }}>
          <div className="listings-container">
            <div className="listings-header">
              <h1 className="listings-title">Vendor Listings</h1>
              <button className="register-button" onClick={handleRegisterNewJobClick}>
                <Plus size={16} />
                Register New Job
              </button>
            </div>

            <div className="outer-container">
              <div className="inner-containers">
                {/* Only render if listings is an array and has items */}
                {Array.isArray(listings) && listings.length > 0 ? (
                  listings.map((listing) => {
                    return (
                      <div key={listing.name} className="listing-container">
                        <div className="listing-info">
                          <h3 className="listing-name">{listing.name}</h3> {/* Display name */}
                          <p className="listing-detail">Category: {listing.category}</p>
                          <p className="listing-detail">Location: {listing.location}</p>
                          <button
                            className="edit-button"
                            onClick={() => handleEditClick(listing.id)} // Pass listing.id to handleEditClick
                          >
                            Edit List
                          </button>
                        </div>
                        <div className="listing-image">
                          <img src={listing.imageUrl} alt={listing.title} /> {/* Display image */}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p>No listings available</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer (Moved outside the main container) */}
        <Footer />
      </div>
    </>
  );
}

export default Listings;
