import React, { useEffect, useState } from 'react';
import './Booking.css';
import config from '../../config'; 
import Footer from '../Footer'; // Ensure this is correctly imported
import { Bell, Home, ListOrdered, MessageSquare, Wallet, User, CalendarDays } from 'lucide-react';


const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(config.BOOKING_API_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBookings(data); 
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter(booking =>
    booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.mobile.includes(searchTerm)
  );

  useEffect(() => {
    document.body.classList.add('scroll-locked');

    return () => {
      document.body.classList.remove('scroll-locked');
    };
  }, []);

  // Sidebar Styles (from your original VendorDashboard)
  const sidebarStyle = {
    width: '80px',
    backgroundColor: 'white',
    borderRight: '1px solid #eee',
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px 0',
  };

  const logoStyle = {
    width: '24px',
    height: '24px',
    marginBottom: '16px',
  };

  const sidebarItemStyle = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '8px 0',
    color: '#666',
    fontSize: '11px',
    cursor: 'pointer',
    textDecoration: 'none',
    marginBottom: '4px',
  };

  const activeItemStyle = {
    ...sidebarItemStyle,
    color: '#2563eb',
    position: 'relative',
  };

  const iconContainerStyle = {
    marginBottom: '4px',
  };

  const activeDotStyle = {
    width: '3px',
    height: '100%',
    backgroundColor: '#2563eb',
    position: 'absolute',
    left: 0,
    top: 0,
  };

  // Main Content Styles
  const styles = {
    container: {
      display: "flex",
      fontFamily: "Arial, sans-serif",
      height: "100vh",
      marginLeft:"10px"
    },
    content: {
      marginLeft: '80px', // to avoid content being overlapped by the sidebar
      width: '100%',
    },
      content: {
        marginLeft: '80px', // to avoid content being overlapped by the sidebar
        width: '100%',
      },
      header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        borderBottom: "1px solid #ddd",
        backgroundColor: "#fff",
        borderColor:"white",
        marginBottom:"30px"
      },
      headerTitle: {
        fontSize: "24px",
      },
      headerIcons: {
        display: "flex",
        alignItems: "center",
        gap: "20px",
      },
      headerIcon: {
        fontSize: "20px",
        cursor: "pointer",
      },
    section: {
      padding: "2px",
    },
    sectionHeader: {
      fontSize: "18px",
      marginBottom: "10px",
    },
    booking: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "10px",
      padding: "10px",
      border: "1px solid white",
      borderRadius: "5px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    bookingInfo: {
      flex: 1,
      color: "#4a4a4a",
    },
    bookingImage: {
      width: "100px",
      height: "80px",
      borderRadius: "2px",
      marginLeft: "10px",
    },
    viewButton: {
      marginTop: "10px",
      padding: "5px 10px",
      backgroundColor: "White",
      color: "#007bff",
      border: "1px solid #007bff",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };

  return (
    <>
      <div style={styles.container}>
        {/* Sidebar */}
        <div style={sidebarStyle}>
          <img
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMkw0IDdWMjJIMjBWN0wxMiAyWiIgc3Ryb2tlPSIjMjU2M2ViIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg=="
            alt="Logo"
            style={logoStyle}
          />
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <a href="/vendordashboard" style={activeItemStyle}>
              <div style={activeDotStyle}></div>
              <span style={iconContainerStyle}><Home size={20} /></span>
              <span>Home</span>
            </a>
            <a href="/listings" style={sidebarItemStyle}>
              <span style={iconContainerStyle}><ListOrdered size={20} /></span>
              <span>Listings</span>
            </a>
            <a href="/booking" style={sidebarItemStyle}>
              <span style={iconContainerStyle}><CalendarDays size={20} /></span>
              <span>Booking</span>
            </a>
            <a href="/messages" style={sidebarItemStyle}>
              <span style={iconContainerStyle}><MessageSquare size={20} /></span>
              <span>Messages</span>
            </a>
            <a href="/payments" style={sidebarItemStyle}>
              <span style={iconContainerStyle}><Wallet size={20} /></span>
              <span>Payments</span>
            </a>
            <a href="/profile" style={sidebarItemStyle}>
              <span style={iconContainerStyle}><User size={20} /></span>
              <span>Profile</span>
            </a>
          </div>
        </div>

       {/* Main Content */}
       <div style={styles.content}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerTitle}>Day 365</div>
          <div style={styles.headerIcons}>
            <img 
              src="https://cdn.iconscout.com/icon/free/png-512/free-calendar-icon-download-in-svg-png-gif-file-formats--feather-pack-user-interface-icons-433988.png?f=webp&w=256" 
              alt="Calendar Icon" 
              style={{ width: "20px", height: "20px", cursor: "pointer" }} 
            />
            <img 
              src="https://cdn-icons-png.flaticon.com/512/5035/5035563.png"
              alt="Bell Icon"
              style={{ width: "20px", height: "20px", cursor: "pointer" }} 
            />
            <span style={styles.headerIcon}>👤</span>
          </div>
        </div>


          <div style={styles.section}>
            <div style={styles.sectionHeader}>Completed Bookings</div>

            {/* Filters */}
            <div className="filters">
              <input
                type="date"
                value={filterDate}
                onChange={e => setFilterDate(e.target.value)}
                className="date-filter"
              />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <button className="search-button">Search</button>
            </div>

            {/* Bookings Table */}
            <div className="bookings-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Amount Paid</th>
                    <th>Status</th>
                    <th>Address</th>
                    <th>Date</th>
                    <th>Service Type</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking, index) => (
                    <tr key={index}>
                      <td>{booking.name}</td>
                      <td>{booking.mobile}</td>
                      <td>{booking.amountPaid}</td>
                      <td>
                        <span className={`state ${booking.status}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td>{booking.address}</td>
                      <td>{booking.date}</td>
                      <td>{booking.serviceType}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="pagination">
              <button className="prev-btn">← Previous</button>
              <span>Page 1 of 10</span>
              <button className="next-btn">Next →</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Booking;
