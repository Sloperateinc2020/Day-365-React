import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

function ServiceDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const service = location.state?.service;

  if (!service || !service.persons || service.persons.length === 0) {
    return <div>No service details available.</div>;
  }

  const handleAvailabilityClick = (person) => {
    navigate('/vendoravailability', { state: { person } });
  };

  return (
    <div
      style={{
        width: isMobile ? '100%' : '100%',
        maxWidth: '1400px',
        margin: '8px auto',
        fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        padding: '8px',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
        marginTop: isMobile ? '10px' : '40px',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          marginBottom: '16px',
          padding: '12px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
        }}
      >
        <h1
          style={{
            marginBottom: '6px',
            fontSize: '22px',
            fontWeight: '700',
            background: 'linear-gradient(45deg, #2563eb, #1d4ed8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em',
          }}
        >
          {service.service} - Providers
        </h1>
        <p
          style={{
            color: '#64748b',
            fontSize: '13px',
            margin: '0 auto',
            lineHeight: '1.3',
            maxWidth: '600px',
          }}
        >
          {service.details}
        </p>
      </div>

      <div className="grid-container" style={{ display: 'grid' }}>
        {service.persons.map((person, index) => (
          <div
            key={index}
            style={{
              border: 'none',
              borderRadius: '16px',
              backgroundColor: '#ffffff',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.06)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              height: 'auto',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              cursor: 'pointer',
            }}
          >
            <div style={{ position: 'relative', paddingTop: '55%' }}>
              <img
                src={person.personimageUrl}
                alt={person.name}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                  height: '60%',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '8px',
                  left: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  backdropFilter: 'blur(4px)',
                }}
              >
                <span style={{ color: '#ffd700', fontSize: '14px' }}>★</span>
                <span
                  style={{
                    fontWeight: '600',
                    color: '#1e293b',
                    fontSize: '13px',
                  }}
                >
                  {person.rating}
                </span>
              </div>
            </div>

            <div
              style={{
                padding: '10px',
                background: 'linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px',
                  gap: '8px',
                }}
              >
                <h2
                  style={{
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#1e293b',
                    margin: 0,
                    letterSpacing: '-0.01em',
                    flex: '1',
                  }}
                >
                  {person.name}
                </h2>
                <div
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                    padding: '4px 8px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    color: '#fff',
                    fontWeight: '500',
                    letterSpacing: '0.02em',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)',
                  }}
                >
                  {service.service}
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '6px',
                  marginTop: '6px',
                }}
              >
                <button
                  onClick={() => handleAvailabilityClick(person)}
                  style={{
                    background: 'linear-gradient(45deg, #3b82f6, #2563eb)',
                    color: '#fff',
                    border: 'none',
                    padding: '7px',
                    borderRadius: '8px',
                    fontSize: '8px',
                    fontWeight: '600',
                    marginTop: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 8px rgba(37, 99, 235, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                  }}
                >
                  <span style={{ fontSize: '11px' }}>📅</span>
                  Availability
                </button>
                <button
                  style={{
                    background: 'linear-gradient(45deg, #22c55e, #16a34a)',
                    color: '#fff',
                    border: 'none',
                    padding: '7px',
                    borderRadius: '8px',
                    marginTop: '20px',
                    fontSize: '8px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 8px rgba(22, 163, 74, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                  }}
                >
                  <span style={{ fontSize: '11px' }}>📞</span>
                  Call Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiceDetails;
