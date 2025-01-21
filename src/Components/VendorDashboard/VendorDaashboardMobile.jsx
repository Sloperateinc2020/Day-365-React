import React, { useState, useEffect } from 'react';

const VendorDashboard = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [bookings, setBookings] = useState([]);
  const API_URL = 'https://run.mocky.io/v3/754a59cd-a326-47bd-87c8-cc553896732d';

  // Handle screen resizing
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch bookings data from API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setBookings(data.UpcomingBookings || []); // Assuming the API response has an `UpcomingBookings` array
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  if (!isMobile) {
    return null;
  }

  return (
    <div
      style={{
        padding: '20px',
        fontFamily: 'Inter, sans-serif',
        backgroundColor: '#F9FAFB',
        maxWidth: '100%',
        margin: '0 auto',
      }}
    >
      {/* Upcoming Bookings Section */}
      <h2
        style={{
          fontSize: '24px',
          fontWeight: '600',
          marginBottom: '35px',
          color: '#111827',
          marginLeft: '90px',
        }}
      >
        Upcoming Bookings
      </h2>

      {/* Booking Cards */}
      {bookings.length > 0 ? (
        bookings.map((booking, index) => (
          <div
            key={index}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '16px',
              marginBottom: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              border: '1.3px solid gray',
              position: 'relative',
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#111827',
                }}
              >
                {booking.title}
              </h3>
              <p
                style={{
                  color: '#6B7280',
                  fontSize: '14px',
                  margin: '4px 0',
                  fontWeight: '400',
                }}
              >
                Date: {booking.date}
              </p>
              <p
                style={{
                  color: '#6B7280',
                  fontSize: '14px',
                  margin: '4px 0',
                  fontWeight: '400',
                }}
              >
                Customer: {booking.customer}
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '8px',
              }}
            >
              <img
                src={booking.image}
                alt="Booking"
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '8px',
                  objectFit: 'cover',
                }}
              />
              <button
                style={{
                  color: '#6366F1',
                  backgroundColor: 'transparent',
                  border: '1px solid #6366F1',
                  borderRadius: '20px',
                  padding: '8px 16px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {booking.buttonText}
              </button>
              {booking.notificationDot && (
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#FCD34D',
                  }}
                />
              )}
            </div>
          </div>
        ))
      ) : (
        <p
          style={{
            textAlign: 'center',
            color: '#6B7280',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          No upcoming bookings available.
        </p>
      )}

      {/* Payments Section */}
      <h2
        style={{
          fontSize: '24px',
          fontWeight: '600',
          margin: '32px 0 20px',
          color: '#111827',
          textAlign: 'center',
        }}
      >
        Payments
      </h2>

      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '32px',
          justifyContent: 'center',
        }}
      >
        {/* Wallet Balance Card */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            border: '1.3px solid gray',
            width: '190px',
          }}
        >
          <h3
            style={{
              color: '#6B7280',
              fontSize: '22px',
              fontWeight: 'bold',
              marginBottom: '8px',
            }}
          >
            Wallet Balance
          </h3>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '12px',
            }}
          >
            <span
              style={{
                color: '#3B82F6',
                fontSize: '20px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              💳
            </span>
            <span
              style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#111827',
              }}
            >
              $150.00
            </span>
          </div>
          <p
            style={{
              color: '#6B7280',
              fontSize: '11px',
              textAlign: 'center',
            }}
          >
            Updated just now
          </p>
        </div>

        {/* Today's Earnings Card */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            border: '1.3px solid gray',
            width: '190px',
          }}
        >
          <h3
            style={{
              color: '#6B7280',
              fontSize: '20px',
              fontWeight: 'bold',
              marginBottom: '8px',
            }}
          >
            Today Earnings
          </h3>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '12px',
            }}
          >
            <span
              style={{
                color: '#10B981',
                fontSize: '20px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              💵
            </span>
            <span
              style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#111827',
              }}
            >
              $150.00
            </span>
          </div>
          <p
            style={{
              color: '#6B7280',
              fontSize: '11px',
              textAlign: 'center',
            }}
          >
            Updated just now
          </p>
        </div>
      </div>

      {/* Location Section */}
      <h2
        style={{
          fontSize: '24px',
          fontWeight: '600',
          marginBottom: '20px',
          color: '#111827',
          marginLeft: '70px',
        }}
      >
        Location and Availability
      </h2>
      <div
        style={{
          width: '100%',
          height: '200px',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        <iframe
          src="https://www.google.com/maps/embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default VendorDashboard;
