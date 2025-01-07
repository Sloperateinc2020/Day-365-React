import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from "../Footer";

const LatestServices = ({ hideFooter, limit, hideDescription }) => {
  const navigate = useNavigate();
  const [latestServices, setLatestServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const LATESTSERVICE_API_URL = 'https://run.mocky.io/v3/f07e0bed-0d93-46e0-9f9f-d7ead510e556';

  useEffect(() => {
    const fetchLatestServices = async () => {
      try {
        const response = await fetch(LATESTSERVICE_API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        if (data.latestServices && Array.isArray(data.latestServices)) {
          setLatestServices(data.latestServices);
        } else {
          throw new Error('Data does not contain the latestServices array');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to load services.');
        setLoading(false);
      }
    };

    fetchLatestServices();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const servicesToDisplay = limit ? latestServices.slice(0, limit) : latestServices;

  return (
    <div style={{ padding: '40px 20px', backgroundColor: '#fff' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          marginBottom: '8px',
          textAlign: 'center',
          color: '#6666ff'
        }}>
          Latest <span style={{ color: '#6666ff' }}>Services</span>
        </h2>

        {/* Conditionally render the description */}
        {!hideDescription && (
          <p style={{
            fontSize: '16px',
            color: '#666',
            marginBottom: '40px',
            textAlign: 'center'
          }}>
            Browse through our comprehensive list of services
          </p>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
        }}>
          {Array.isArray(servicesToDisplay) && servicesToDisplay.map((service, index) => (
            <div key={index} style={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '12px'
              
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                marginBottom: '8px'
              }}>
                <img
                  src={service.iconUrl}
                  alt={service.title}
                  style={{
                    width: '40px',
                    height: '40px',
                    marginRight: '12px'
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#333',
                    margin: '0 0 4px 0'
                  }}>
                    {service.title}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#666',
                    margin: 0
                  }}>
                    ₹{service.salaryRange?.minimum || '0'} - ₹{service.salaryRange?.maximum || '0'}
                  </p>
                </div>
                {service.badge && (
                  <span style={{
                    backgroundColor: '#FDEDEC',
                    color: '#FF6666',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    {service.badge}
                  </span>
                )}
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '14px',
                color: '#666',
                gap: '8px'
              }}>
                <img src={service.location?.districtIconUrl} alt="" style={{ width: '16px', height: '16px' }} />
                <span>{service.location?.district || 'Unknown District'}</span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '14px',
                color: '#666',
                gap: '8px'
              }}>
                <img src={service.location?.cityIconUrl} alt="" style={{ width: '16px', height: '16px' }} />
                <span>{service.location?.city || 'Unknown City'}, {service.location?.pincode || '000000'}</span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '14px',
                color: '#666',
                gap: '8px'
              }}>
                <img src={service.workTypeIconUrl} alt="" style={{ width: '16px', height: '16px' }} />
                <span>{service.workType || 'Unknown Work Type'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer is placed outside the content container */}
      {!hideFooter && <Footer />}
    </div>
  );
};

export default LatestServices;
