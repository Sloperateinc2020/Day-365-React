import React, { useEffect, useState } from 'react';
import Footer from "../Footer";
import config from '../../config';

const PreviousBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(config.PREVIOUSBOOKING_API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        
        if (Array.isArray(data.data)) {
          setBookings(data.data);
        } else {
          setBookings([]);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ padding: '24px', fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#F9FAFB', marginTop: '45px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ margin: '0', fontSize: '24px', fontWeight: '600', color: '#111827' }}>Previous Bookings</h1>
          <p style={{ margin: '4px 0 0', color: '#6B7280', fontSize: '14px' }}>View and manage your booking history</p>
        </div>
        <div style={{ position: 'relative' }}>
          <select style={{
            padding: '8px 32px 8px 12px',
            borderRadius: '8px',
            border: '1px solid #E5E7EB',
            backgroundColor: 'white',
            fontSize: '14px',
            color: '#111827',
            cursor: 'pointer',
            appearance: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%236B7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 12px center',
            minWidth: '140px'
          }}>
            <option>All Bookings</option>
          </select>
        </div>
      </div>

      {bookings.map((booking) => (
        <div key={booking.id} style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '1px solid #E5E7EB',
          padding: '24px',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <h2 style={{ margin: '0', fontSize: '18px', fontWeight: '600', color: '#111827' }}>{booking.service}</h2>
              <p style={{ margin: '4px 0 0', color: '#6B7280', fontSize: '14px' }}>Booking ID: #{booking.id}</p>
            </div>
            <span style={{
              backgroundColor: booking.status === 'Completed' ? '#00A651' : '#6B7280',
              color: 'white',
              padding: '4px 10px',
              borderRadius: '16px',
              fontSize: '12px',
              fontWeight: '500',
              height: '30px',
              display: 'flex',
              alignItems: 'center'
            }}>
              {booking.status}
            </span>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '24px', marginBottom: '12px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#111827', fontSize: '14px' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.66667 1.33334V3.33334M11.3333 1.33334V3.33334M2.33333 6.06667H13.6667M2 8.00001V11.3333C2 13.3333 3 14.6667 4.66667 14.6667H11.3333C13 14.6667 14 13.3333 14 11.3333V4.66667C14 2.66667 13 1.33334 11.3333 1.33334H4.66667C3 1.33334 2 2.66667 2 4.66667V8.00001Z" stroke="#111827" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {booking.date}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#111827', fontSize: '14px' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.6667 8.00001C14.6667 11.68 11.68 14.6667 8 14.6667C4.32 14.6667 1.33333 11.68 1.33333 8.00001C1.33333 4.32001 4.32 1.33334 8 1.33334C11.68 1.33334 14.6667 4.32001 14.6667 8.00001Z" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10.4733 10.12L8.40667 8.88667C8.04667 8.67334 7.75333 8.16001 7.75333 7.74001V5.00668" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {booking.time}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#111827', fontSize: '14px' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 14.6667C8 14.6667 13.3333 10.6667 13.3333 6.66667C13.3333 5.07537 12.7012 3.54925 11.5761 2.42406C10.4509 1.29887 8.92478 0.666672 7.33333 0.666672C5.74188 0.666672 4.21577 1.29887 3.09059 2.42406C1.9654 3.54925 1.33333 5.07537 1.33333 6.66667C1.33333 10.6667 6.66667 14.6667 6.66667 14.6667" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7.33333 8.66667C8.43791 8.66667 9.33333 7.77124 9.33333 6.66667C9.33333 5.5621 8.43791 4.66667 7.33333 4.66667C6.22876 4.66667 5.33333 5.5621 5.33333 6.66667C5.33333 7.77124 6.22876 8.66667 7.33333 8.66667Z" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {booking.location}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#111827', fontSize: '14px' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.9466 11.8867V13.8867C14.9476 14.0825 14.9054 14.2762 14.8233 14.4548C14.7411 14.6334 14.6209 14.7925 14.4701 14.9215C14.3193 15.0505 14.1414 15.1463 13.9479 15.2027C13.7544 15.2591 13.5498 15.2747 13.3486 15.2487C11.2172 14.9847 9.17441 14.2565 7.37663 13.1247C5.70793 12.0943 4.28809 10.6745 3.25763 9.00579C2.12041 7.19866 1.39165 5.14474 1.13196 3.00246C1.10608 2.80203 1.12154 2.59826 1.17753 2.40539C1.23351 2.21253 1.32866 2.03506 1.45679 1.88443C1.58492 1.73381 1.74299 1.61347 1.92065 1.53075C2.09831 1.44803 2.29111 1.40489 2.48663 1.40446H4.48663C4.82525 1.40111 5.15339 1.51451 5.41198 1.72371C5.67057 1.93291 5.84206 2.22516 5.89196 2.55046C5.98874 3.21415 6.17083 3.86391 6.43463 4.48446C6.5353 4.73676 6.55726 5.01348 6.49778 5.27835C6.43831 5.54321 6.30006 5.78328 6.09996 5.96579L5.19996 6.86579C6.15611 8.59013 7.57229 10.0063 9.29663 10.9624L10.1966 10.0624C10.3791 9.86234 10.6192 9.72409 10.8841 9.66462C11.149 9.60514 11.4257 9.6271 11.678 9.72779C12.2985 9.99159 12.9483 10.1737 13.612 10.2704C13.9424 10.3209 14.2389 10.4968 14.4492 10.7615C14.6595 11.0261 14.7705 11.3611 14.7626 11.7047L14.9466 11.8867Z" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {booking.phone}
              </span>
            </div>
          </div>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            paddingTop: '16px',
            borderTop: '1px solid #E5E7EB'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <span style={{ color: '#6B7280', fontSize: '14px' }}>Service Provider</span>
              <span style={{ color: '#111827', fontSize: '16px', fontWeight: '600' }}>₹{booking.price}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 8C9.92667 8 11.3333 6.52 11.3333 4.66667C11.3333 2.81333 9.92667 1.33333 8 1.33333C6.07333 1.33333 4.66667 2.81333 4.66667 4.66667C4.66667 6.52 6.07333 8 8 8Z" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13.7267 14.6667C13.7267 12.0867 11.16 10 8 10C4.84 10 2.27333 12.0867 2.27333 14.6667" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{ color: '#111827', fontSize: '14px', fontWeight: '500' }}>CleanPro Services</span>
              </div>
              <button 
                onClick={() => handleViewDetails(booking)}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '6px',
                  backgroundColor: 'white',
                  color: '#111827',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontWeight: '500'
                }}
              >
                View Details
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 12L10 8L6 4" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Modal */}
      {isModalOpen && selectedBooking && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            width: '100%',
            maxWidth: '500px',
            margin: '20px',
            position: 'relative'
          }}>
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                position: 'absolute',
                right: '16px',
                top: '16px',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            <div style={{ padding: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '4px' }}>
                {selectedBooking.service}
              </h2>
              <div style={{ display: 'flex', gap: '8px', color: 'black', marginBottom: '24px',fontWeight:'bold' }}>
                <span>Booking ID:</span>
                <span style={{ color: '#9CA3AF' }}>#{selectedBooking.id}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px',color:'#6B7280',fontWeight:'bold' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'black',fontWeight:'bold',fontSize:'15px' }}>Status:</span>
                  <span style={{
                    backgroundColor: selectedBooking.status === 'Completed' ? '#00A651' : '#6B7280',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '999px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    {selectedBooking.status}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'black',fontWeight:'bold'}}>Date & Time:</span>
                  <span>{selectedBooking.date}, {selectedBooking.time}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'black',fontWeight:'bold' }}>Duration:</span>
                  <span>{selectedBooking.duration || '3 hours'}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'black',fontWeight:'bold' }}>Location:</span>
                  <span>{selectedBooking.location}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'black',fontWeight:'bold' }}>Provider:</span>
                  <span>CleanPro Services</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'black',fontWeight:'bold' }}>Price:</span>
                  <span>₹{selectedBooking.price}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'black',fontWeight:'bold' }}>Description:</span>
                  <span style={{ maxWidth: '60%', textAlign: 'right' }}>
                    Deep cleaning of living room, kitchen, and two bedrooms.
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'black',fontWeight:'bold' }}>Rating:</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>4.5</span>
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default PreviousBookings;