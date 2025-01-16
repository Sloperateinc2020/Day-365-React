import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import './Listings.css';
import Footer from './Footer';
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
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      flexDirection: 'column',
      paddingBottom: isMobile ? '60px' : '0'
    }}>
      <div style={{ 
        width: '100%', 
        paddingBottom: isMobile ? '80px' : '0'
      }}>
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
      {isMobile ? <MobileNav /> : <Footer />}
    </div>
  );
}

export default Listings;
