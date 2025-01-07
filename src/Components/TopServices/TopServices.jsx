import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import config from '../../config'; // Import the config
import Footer from '../Footer';

function TopServices({ limit, hideFooter, hideDescription }) {
  const [topServices, setTopServices] = useState([]);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

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

  const servicesToDisplay = limit ? topServices.slice(0, limit) : topServices;

  // Check if we're on the TopServices page
  const isTopServicesPage = location.pathname === '/top-services';

  return (
    <div style={{ padding: '20px' }}>
      <h2
        style={{
          textAlign: 'center',
          fontSize: '32px',
          fontWeight: 'bold',
          marginBottom: '20px',
          marginLeft: '50px',
          color: isTopServicesPage ? 'black' : '#6666ff', // Black color only for TopServices page
        }}
      >
        Top Services
      </h2>

      {/* Conditionally render description based on hideDescription */}
      {!hideDescription && (
        <h2
          style={{
            textAlign: 'center',
            fontSize: '15px',
            fontWeight: 'bold',
            marginBottom: '20px',
          }}
        >
          <span style={{ color: '#666' }}>Browse through our comprehensive list of services</span>
        </h2>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isTopServicesPage ? 'repeat(4, 1fr)' : 'repeat(auto-fill, minmax(220px, 1fr))', // 4 items per row on TopServices page
          gap: '0px', // No gaps between cards
          padding: '10px',
        }}
      >
        {servicesToDisplay.map((service, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#f9f9f9',
              borderRadius: '10px',
              padding: '15px',
              textAlign: 'center',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              width: '100%',
              maxWidth: isTopServicesPage ? '300px' : '220px', // Adjust width for TopServices page
              marginLeft: isTopServicesPage ? '20px' : '170px', // Adjust margin for TopServices page
              marginTop: isTopServicesPage ? '20px' : '0px', // Adjust margin for TopServices page
            }}
          >
            <img
              src={service.iconUrl}
              alt={service.title}
              style={{
                width: '40px',
                height: '40px',
                marginBottom: '10px',
              }}
            />
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#333',
                marginBottom: '8px',
              }}
            >
              {service.title}
            </h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '3px' }}>
              <p style={{ fontSize: '12px', color: 'blue', fontWeight: 'bold' }}>{service.jobCount} |</p>
              <p style={{ fontSize: '12px', color: '#666' }}>{service.location}</p>
            </div>
            {/* Add View Details with arrow only on /top-services page */}
            {isTopServicesPage && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '1px',
                  cursor: 'pointer',
                }}
                onClick={() => navigate(`/service/${service.id}`)} // Adjust as per your routing
              >
                <p style={{ fontSize: '12px', color: 'black', fontWeight: 'bold', marginRight: '5px' }}>View Details</p>
                <span style={{ fontSize: '12px', color: 'blue' }}>→</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Conditionally render footer based on hideFooter */}
      {!hideFooter && <Footer />}
    </div>
  );
}

export default TopServices;
