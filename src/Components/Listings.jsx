import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Plus } from 'lucide-react';
import './Listings.css';
import { Link, useNavigate } from 'react-router-dom';

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
        const response = await fetch('https://run.mocky.io/v3/07dc8e7d-8209-4e73-ac0d-0a11ab3db028');

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

  return (
    <div style={{ display: 'flex', fontFamily: 'Arial, sans-serif', flexDirection: 'column', height: '100vh' }}>
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: isMobile ? '60px' : '0' }}>
        <h1 className="listings-title">Vendor Listings</h1>
        <div
  className="listings-container"
  style={{
    marginLeft: isMobile ? '0px' : '100px', // Move left for desktop only
    paddingLeft: '10px',
  }}
>
  <button className="register-button" onClick={handleRegisterNewJobClick}>
    <Plus size={16} />
    Register New Job
  </button>
  <div className="outer-container">
    <div className="inner-containers">
      {listings.length > 0 ? (
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

      {/* Sidebar for Mobile */}
      <Sidebar isActive="listings" isMobile={isMobile} />
    </div>
  );
}

export default Listings;
