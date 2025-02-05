import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, ListOrdered, MessageSquare, Wallet, User, CalendarDays, MapPin } from 'lucide-react';
import Sidebar from '../Sidebar';  
import config from '../../config';

function Booking() {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleViewDetails = (bookingId) => {
    console.log('Viewing details for booking:', bookingId);
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(config.BOOKING_API_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (Array.isArray(data.bookings)) {
          setBookings(data.bookings);
        } else {
          console.error('Invalid bookings data format:', data);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const styles = {
    container: {
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      position: 'relative',
      paddingBottom: isMobile ? '60px' : '0'
    },
    mainContent: {
      flex: 1,
      marginLeft: isMobile ? '0' : '80px',
      padding: '20px'
    },
    header: {
      marginBottom: '20px'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '4px',
      textAlign: 'center'
    },
    subtitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#374151',
      textAlign: 'center'
    },
    searchContainer: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: '12px',
      marginBottom: '24px'
    },
    dateInput: {
      padding: '8px 12px',
      border: '1px solid #e5e7eb',
      borderRadius: '6px',
      width: isMobile ? '100%' : '150px'
    },
    searchInput: {
      flex: 1,
      padding: '8px 12px',
      border: '1px solid #e5e7eb',
      borderRadius: '6px',
      width: isMobile ? '100%' : 'auto'
    },
    searchButton: {
      padding: '8px 16px',
      backgroundColor: '#4f46e5',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      width: isMobile ? '100%' : 'auto'
    },
    bookingCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '16px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      display: isMobile ? 'block' : 'none'
    },
    table: {
      width: '100%',
      backgroundColor: 'white',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      display: isMobile ? 'none' : 'block'
    },
    thead: {
      backgroundColor: '#f9fafb'
    },
    th: {
      padding: '12px 24px',
      textAlign: 'left',
      fontSize: '12px',
      fontWeight: '500',
      color: '#6b7280',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      borderBottom: '1px solid #e5e7eb'
    },
    td: {
      padding: '16px 24px',
      fontSize: '14px',
      color: '#374151',
      borderBottom: '1px solid #e5e7eb'
    },
    viewDetailsLink: {
      color: '#3b82f6',
      textDecoration: 'none',
      fontSize: '14px',
      float: 'right'
    },
    status: {
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '14px',
      fontWeight: '500',
      display: 'inline-block',
      textAlign: 'center',
      minWidth: '100px'
    },
    statusCompleted: {
      backgroundColor: '#22c55e',
      color: '#fff'
    },
    statusPending: {
      backgroundColor: '#f59e0b',
      color: '#fff'
    },
    locationContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      color: '#6b7280',
      fontSize: '14px',
      marginTop: '8px'
    },
    cardName: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '4px'
    },
    cardAmount: {
      fontSize: '14px',
      color: '#374151',
      marginBottom: '4px'
    },
    cardDate: {
      fontSize: '14px',
      color: '#6b7280'
    },
    navLink: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: '#6b7280',
      textDecoration: 'none',
      padding: '12px 0',
      width: '100%'
    },
    navLinkActive: {
      color: '#4f46e5',
      position: 'relative'
    },
    activeDot: {
      position: 'absolute',
      top: '0',
      width: '4px',
      height: '4px',
      backgroundColor: '#4f46e5',
      borderRadius: '50%'
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '20px',
      gap: '12px'
    },
    paginationButton: {
      padding: '8px 16px',
      backgroundColor: '#f9fafb',
      border: '1px solid #e5e7eb',
      borderRadius: '6px',
      cursor: 'pointer'
    },
    paginationText: {
      fontSize: '14px',
      color: '#6b7280'
    }
  };

  const MobileCards = () => (
    <div style={{ display: isMobile ? 'block' : 'none' }}>
      {bookings.map((booking, index) => (
        <div key={index} style={styles.bookingCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={styles.cardName}>{booking.name}</div>
              <div style={styles.locationContainer}>
                <MapPin size={16} />
                <span>{booking.address}</span>
              </div>
              <div style={styles.cardAmount}>Amount Paid: ${booking.amountPaid}</div>
              <div style={styles.cardDate}>{booking.date}</div>
            </div>
            <div>
              <a href="#" onClick={() => handleViewDetails(booking.id)} style={styles.viewDetailsLink}>
                View Details
              </a>
            </div>
          </div>
          <div style={{ marginTop: '12px', textAlign: 'right' }}>
            <span style={{
              ...styles.status,
              ...(booking.status === 'completed' ? styles.statusCompleted : styles.statusPending)
            }}>
              {booking.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div style={styles.container}>
      <Sidebar isMobile={isMobile} />  {/* Sidebar component */}
      <main style={styles.mainContent}>
        <div style={styles.header}>
          <h1 style={styles.title}>Day 365</h1>
          <h2 style={styles.subtitle}>Completed Bookings</h2>
        </div>

        <div style={styles.searchContainer}>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={styles.dateInput}
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            style={styles.searchInput}
          />
          <button style={styles.searchButton}>Search</button>
        </div>

        <MobileCards />

 <div style={styles.table}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={styles.thead}>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Mobile</th>
                <th style={styles.th}>Amount Paid</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Address</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Service Type</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index}>
                  <td style={styles.td}>{booking.name}</td>
                  <td style={styles.td}>{booking.mobile}</td>
                  <td style={styles.td}>${booking.amountPaid}</td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.status,
                      ...(booking.status === 'completed' ? styles.statusCompleted : styles.statusPending)
                    }}>
                      {booking.status}
                    </span>
                  </td>
                  <td style={styles.td}>{booking.address}</td>
                  <td style={styles.td}>{booking.date}</td>
                  <td style={styles.td}>{booking.serviceType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={styles.pagination}>
          <button style={styles.paginationButton}>← Previous</button>
          <span style={styles.paginationText}>Page 1 of 10</span>
          <button style={styles.paginationButton}>Next →</button>
        </div>
      </main>
    </div>
  );
}

export default Booking;
