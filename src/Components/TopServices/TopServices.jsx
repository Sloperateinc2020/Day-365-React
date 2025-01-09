import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import config from '../../config'; // Import the config
import Footer from '../Footer'; // Ensure Footer is correctly imported

const TopServices = ({ limit, hideFooter, hideDescription }) => {
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
    <>
      <div
        style={{
          padding: '20px',
          maxWidth: '900px',
          margin: '0 auto',
          boxSizing: 'border-box',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            fontSize: '28px',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: isTopServicesPage ? 'black' : '#6666ff',
          }}
        >
          Top Services
        </h2>

        {/* Conditionally render description based on hideDescription */}
        {!hideDescription && (
          <h2
            style={{
              textAlign: 'center',
              fontSize: '14px',
              fontWeight: 'bold',
              marginBottom: '20px',
            }}
          >
            <span style={{ color: '#666' }}>
              Browse through our comprehensive list of services
            </span>
          </h2>
        )}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '15px',
            justifyContent: 'center',
            alignItems: 'center',
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
                width: '93%',
                maxWidth: '180px',
                margin: '0 auto',
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
                <p
                  style={{
                    fontSize: '12px',
                    color: 'blue',
                    fontWeight: 'bold',
                  }}
                >
                  {service.jobCount} |
                </p>
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
                  onClick={() => navigate(`/service/${service.id}`)}
                >
                  <p
                    style={{
                      fontSize: '12px',
                      color: 'black',
                      fontWeight: 'bold',
                      marginRight: '5px',
                    }}
                  >
                    View Details
                  </p>
                  <span style={{ fontSize: '12px', color: 'blue' }}>→</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Conditionally render footer based on hideFooter */}
      {!hideFooter && <Footer />}
    </>
  );
};

export default TopServices;
