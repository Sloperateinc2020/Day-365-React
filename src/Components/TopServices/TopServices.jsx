import React, { useEffect, useState } from 'react';
import config from '../../config'; // Import the config
import Footer from '../Footer';

function TopServices() {
  const [topServices, setTopServices] = useState([]);

  useEffect(() => {
    fetchTopServices();
  }, []);

  const fetchTopServices = async () => {
    try {
      // Fetch data from the URL provided in the config
      const response = await fetch(config.TOPSERVICE_API_URL); 
      const data = await response.json();
      setTopServices(data.topServices);
    } catch (error) {
      console.error('Error fetching top services:', error);
    }
  };

  return (
    <>
      <div style={{ padding: '20px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '32px', fontWeight: 'bold', marginBottom: '-25px' }}>
          <span style={{ color: 'black' }}>Top Services</span>
        </h2>
        <h2 style={{ textAlign: 'center', fontSize: '15px', fontWeight: 'bold', marginBottom: '20px' }}>
          <span style={{ color: '#666' }}>Browse through our comprehensive list of services</span>
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '20px',
          padding: '20px'
        }}>
          {topServices.map((service, index) => (
            <div key={index} style={{
              backgroundColor: '#f9f9f9',
              borderRadius: '10px',
              padding: '15px',
              textAlign: 'center',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            }}>
              <img src={service.iconUrl} alt={service.title} style={{
                width: '60px',
                height: '40px',
                marginBottom: '10px'
              }} />
              <h3 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#333',
                marginBottom: '8px'
              }}>
                {service.title}
              </h3>
              <p style={{ fontSize: '14px', color: '#666' }}>{service.location}</p>
              {/* Jobs count */}
              <p style={{ fontSize: '14px', color: 'black', fontWeight:'bold' }}>
                {service.jobCount} 
              </p>
              
              {/* View Details Section */}
              <div style={{ marginTop: '10px' }}>
                <span style={{
                  fontSize: '14px',
                  color: 'black',  // Changed to black
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}>
                  View Details
                </span>
                {/* Arrow symbol */}
                <span style={{
                  marginLeft: '8px',
                  fontSize: '18px',
                  color: 'black',  // Arrow in black
                  cursor: 'pointer'
                }}>
                  &#8594; {/* This is the Unicode for a right arrow symbol */}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Footer /> 
    </>
  );
}

export default TopServices;
