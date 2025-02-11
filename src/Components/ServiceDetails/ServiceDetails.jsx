import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ServiceDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const service = location.state?.service;

  // State for window size detection
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Update state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Early return if there's no service or service data is missing
  if (!service || !service.persons || service.persons.length === 0) {
    return <div>No service details available.</div>;
  }

  // Banner image URL
  const bannerImageUrl = service?.imageUrl || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=1674&q=80';

  // Handle "Book Now" button click
  const handleBookNowClick = (person) => {
    navigate('/vendoravailability', { state: { person } });
  };

  // Extract unique services dynamically from service.persons
  const availableServices = Array.from(new Set(service.persons.map(person => person.serviceCategory)));

  return (
    <div style={{ backgroundColor: '#f8fafc' }}>
      {/* Banner Section */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: isMobile ? '150px' : '250px',
        overflow: 'hidden',
        marginBottom: '24px',
        marginTop: isMobile ? '0px' : '50px',
        
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${bannerImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.7)'
        }} />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7))'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '50%',
          left: '50%',
          transform: 'translate(-50%, 50%)',
          textAlign: 'center',
          color: 'white',
          width: '90%',
          maxWidth: '800px'
        }}>
          <h1 style={{
            fontSize: isMobile ? '24px' : '32px',
            fontWeight: '700',
            marginBottom: '8px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            {service.service}
          </h1>
          <p style={{
            fontSize: isMobile ? '14px' : '16px',
            marginBottom: '16px',
            opacity: 0.9
          }}>
            Find the best {service.service.toLowerCase()} professionals in your area
          </p>
        </div>
      </div>

      <div className="services-container" style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '16px',
        fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '12px',
          background: 'white',
          padding: '16px',
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
          marginTop: isMobile ? '-40px' : '-20px'
        }}>
          <div style={{
            position: 'relative',
            width: isMobile ? '100%' : '250px'
          }}>
            <input
              type="search"
              placeholder={`Search ${service.service.toLowerCase()}...`}
              style={{
                padding: '10px 14px',
                paddingLeft: '36px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                width: '100%',
                fontSize: '14px',
                background: '#f8fafc'
              }}
            />
            <span style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#64748b'
            }}>
              🔍
            </span>
          </div>
          <div style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap'
          }}>
            {/* Dynamically display available services */}
            {availableServices.map((category, index) => (
              <button
                key={index}
                style={{
                  padding: '8px 16px',
                  borderRadius: '16px',
                  border: 'none',
                  background: category === service.service ? '#8b5cf6' : '#f8fafc',
                  color: category === service.service ? 'white' : '#64748b',
                  fontSize: '13px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontWeight: category === service.service ? '600' : '500',
                  boxShadow: category === service.service ? '0 2px 4px rgba(139, 92, 246, 0.25)' : 'none'
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(250px, 5fr))',
          gap: '16px',
          padding: '8px 0',
          marginBottom:"30px",
          marginTop:"-40px"
        }}>
          {service.persons.map((person, index) => (
            <div
              key={index}
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: 'white',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer',
                ':hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
                }
              }}
            >
              <div style={{ position: 'relative', paddingTop: '56%' }}>
                <img
                  src={person.personimageUrl}
                  alt={service.service}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  background: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  backdropFilter: 'blur(4px)'
                }}>
                  <span>⏱</span>
                  {person.duration || '60'} mins
                </div>
              </div>

              <div style={{ padding: '12px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '8px'
                }}>
                  <div>
                    <h3 style={{
                      fontSize: '15px',
                      fontWeight: '600',
                      marginBottom: '2px',
                      color: '#1e293b'
                    }}>
                      {person.name}
                    </h3>
                    <p style={{
                      fontSize: '13px',
                      color: '#64748b',
                      marginBottom: '4px'
                    }}>
                      {person.availableServices}
                    </p>
                  </div>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#8b5cf6'
                  }}>
                    ₹{person.price || '999'}
                  </div>
                </div>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: '#f8fafc',
                    padding: '3px 8px',
                    borderRadius: '8px'
                  }}>
                    <span style={{ color: '#ffd700' }}>★</span>
                    <span style={{ color: '#64748b', fontSize: '12px', fontWeight: '600' }}>
                      {person.rating} Rating
                    </span>
                  </div>
                  {person.availability && (
                    <span style={{
                      fontSize: '11px',
                      color: '#10b981',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '2px'
                    }}>
                      <span style={{ fontSize: '6px' }}>●</span>
                      Available Today
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleBookNowClick(person)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    background: '#8b5cf6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 4px rgba(139, 92, 246, 0.25)'
                  }}
                >
                  <span>Book Now</span>
                  <span style={{ fontSize: '14px' }}>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ServiceDetails;
