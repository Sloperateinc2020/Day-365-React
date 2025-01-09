import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
        width: '100%',
        maxWidth: '1400px',
        margin: '50px auto',
        fontFamily: 'Arial, sans-serif',
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        padding: '15px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          marginBottom: '20px',
        }}
      >
        <h1
          style={{
            marginBottom: '8px',
            fontSize: '26px',
            fontWeight: 'bold',
          }}
        >
          {service.service} - Providers
        </h1>
        <p style={{ color: '#777', fontSize: '14px' }}>{service.details}</p>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'flex-start',
          marginLeft: '20px',
        }}
      >
        {service.persons.map((person, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: '12px',
              padding: '10px',
              width: '250px',
              backgroundColor: '#fff',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              position: 'relative',
            }}
          >
            {/* Person Image */}
            <img
              src={person.personimageUrl}
              alt={person.name}
              style={{
                width: '230px',
                height: '130px',
                objectFit: 'cover',
                border: '2px solid #007bff',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
                position: 'relative',
                top: '10px', // Move the image down within the box
              }}
            />

            {/* Person Name */}
            <h2
              style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#333',
                margin: '8px 0',
              }}
            >
              {person.name}
            </h2>

            {/* City and State */}
            <p
              style={{
                color: '#777',
                fontSize: '12px',
                marginBottom: '5px',
              }}
            >
              {person.city}, {person.state}
            </p>

            {/* Service Name */}
            <p
              style={{
                color: '#007bff',
                fontSize: '12px',
                fontWeight: 'bold',
                marginBottom: '8px',
              }}
            >
              {service.service}
            </p>

            {/* Rating */}
            <div
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#333',
                marginBottom: '10px',
              }}
            >
              <span
                style={{
                  fontSize: '16px',
                  color: '#FFD700',
                  marginRight: '5px',
                }}
              >
                ★
              </span>
              {person.rating}
            </div>

            {/* Action Buttons */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                justifyContent: 'center',
              }}
            >
              <button
                style={{
                  flex: 1,
                  backgroundColor: '#007bff',
                  color: '#fff',
                  border: 'none',
                  padding: '8px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
                onClick={() => handleAvailabilityClick(person)}
              >
                Availability
              </button>
              <button
                style={{
                  flex: 1,
                  backgroundColor: '#28a745',
                  color: '#fff',
                  border: 'none',
                  padding: '8px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                Call Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiceDetails;
