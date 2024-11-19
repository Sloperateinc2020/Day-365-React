import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import './Listings.css';
import Footer from './Footer';  

function Listings() {
  const [listings, setListings] = useState([]); // Renamed state variable to 'listings'

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('https://run.mocky.io/v3/542a25d5-d003-4b76-a1bb-37ac4923db52');
        const data = await response.json();
        console.log('Fetched Data:', data);  // Log to check the structure
        setListings(data.Listings || []);  // Ensure 'Listings' key exists in response
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);  // Empty array ensures this effect runs only once when the component mounts

  return (
    <>
      <div className="listings-container">
        <div className="listings-header">
          <h1 className="listings-title">Vendor Listings</h1>
          <button className="register-button">
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
                      {/* <h2 className="listing-title">{listing.title}</h2> */}
                      <h3 className="listing-name">{listing.name}</h3> {/* Display name */}
                      <p className="listing-detail">Category: {listing.category}</p>
                      <p className="listing-detail">Location: {listing.location}</p>
                      <button className="edit-button">Edit List</button>
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
      
      <Footer /> 
    </>
  );
}

export default Listings;
