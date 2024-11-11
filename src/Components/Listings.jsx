import React from 'react';
import { Plus } from 'lucide-react';
import './Listings.css';

const jobListings = [
  {
    id: 1,
    title: 'Plumber Job',
    category: 'Moderated',
    location: 'Karimnagar, Hyderabad',
    image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 2,
    title: 'Driver Job',
    category: 'Verification',
    location: 'Karimnagar, Hyderabad',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=500'
  }
];

function Listings() {
  return (
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
  );
}

export default Listings;