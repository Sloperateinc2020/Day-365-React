import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import config from '../../config';
import Footer from '../Footer';

const TopServices = ({ limit, hideFooter, hideDescription, isMobile }) => {
  const [topServices, setTopServices] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

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
  const isTopServicesPage = location.pathname === '/top-services';

  return (
    <>
      <div
        style={{
          padding: isMobile ? '10px' : '20px',
          maxWidth: isMobile ? '100%' : '900px',
          margin: '0 auto',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: isMobile ? 'flex-start' : 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            paddingRight: isMobile ? '10px' : '0',
          }}
        >
          <h2
            style={{
              fontSize: isMobile ? '22px' : '28px',
              fontWeight: 'bold',
              color: isTopServicesPage ? 'black' : '#6666ff',
              textAlign: isMobile ? 'left' : 'center',
              width: '100%',
            }}
          >
            Top Services
          </h2>

          {isMobile && (
            <button
              onClick={() => navigate('/top-services')}
              style={{
                fontSize: '14px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              More
            </button>
          )}
        </div>

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
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: isMobile ? '10px' : '15px',
            justifyContent: 'center',
            alignItems: 'center',
            padding: isMobile ? '5px' : '10px',
            marginBottom: isMobile ? '50px' : '',
          }}
        >
          {servicesToDisplay.map((service, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#f9f9f9',
                borderRadius: '10px',
                padding: isMobile ? '10px' : '15px',
                textAlign: 'center',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                width: isMobile ? '100%' : '93%',
                maxWidth: isMobile ? 'none' : '180px',
                margin: '0 auto',
              }}
            >
              <img
                src={service.iconUrl}
                alt={service.title}
                style={{
                  width: isMobile ? '30px' : '40px',
                  height: isMobile ? '30px' : '40px',
                  marginBottom: isMobile ? '5px' : '10px',
                }}
              />
              <h3
                style={{
                  fontSize: isMobile ? '12px' : '14px',
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
                    fontSize: isMobile ? '10px' : '12px',
                    color: 'blue',
                    fontWeight: 'bold',
                  }}
                >
                  {service.jobCount} |
                </p>
                <p style={{ fontSize: isMobile ? '10px' : '12px', color: '#666' }}>
                  {service.location}
                </p>
              </div>
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
      {!hideFooter && <Footer />}
    </>
  );
};

export default TopServices;