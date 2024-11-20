import React, { useEffect, useState } from 'react';
import config from '../../config';
import Footer from '../Footer'; 

function TopServices() {
  const [topServices, setTopServices] = useState([]);

  useEffect(() => {
    fetchTopServices();
  }, []);

  const fetchTopServices = async () => {
    try {
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
        <h2 style={{ textAlign: 'center', fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>
          All <span style={{ color: '#6666ff' }}>Top Services</span>
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
                height: '60px',
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
              <p style={{ fontSize: '14px', color: '#4A90E2', fontWeight: 'bold' }}>
                {service.jobCount} jobs available
              </p>
            </div>
          ))}
        </div>
      </div>
      
      <Footer /> 
    </>
  );
}

export default TopServices;
