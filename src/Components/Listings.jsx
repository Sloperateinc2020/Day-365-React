import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import './Listings.css';
import Footer from './Footer';  // Footer import remains the same

function Listings() {
  // State to hold job listings data
  const [jobListings, setJobListings] = useState([]);

  // Fetch job listings from the API when the component mounts
  useEffect(() => {
    const fetchJobListings = async () => {
      try {
        const response = await fetch('https://run.mocky.io/v3/35927549-0903-4303-a6b9-494429ca33eb');
        const data = await response.json();
        setJobListings(data.vendorListings);  // Assuming the API response contains a 'vendorListings' field
      } catch (error) {
        console.error('Error fetching job listings:', error);
      }
    };

    fetchJobListings();
  }, []);  // Empty array ensures this effect runs once when the component mounts

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
            {jobListings.map((job) => (
              <div key={job.id} className="listing-container">
                <div className="listing-info">
                  <h2 className="listing-title">{job.title}</h2>
                  <p className="listing-detail">Category: {job.category}</p>
                  <p className="listing-detail">Location: {job.location}</p>
                  <button className="edit-button">Edit List</button>
                </div>
                <div className="listing-image">
                  <img src={job.image} alt={job.title} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />  {/* Footer is now outside the listings container */}
    </>
  );
}

export default Listings;
