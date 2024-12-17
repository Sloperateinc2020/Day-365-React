import React, { useEffect, useState } from "react";
import { Bell, Home, ListOrdered, MessageSquare, Wallet, User, CalendarDays } from 'lucide-react';
import config from '../../config';  
import { Link, useNavigate } from 'react-router-dom'; 

const VendorDashboard = () => {
  const [bookingsData, setBookingsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        console.log("Fetching bookings from URL: ", config.UPCOMINGBOOKING_API_URL);
        
        const response = await fetch(config.UPCOMINGBOOKING_API_URL);
        
        console.log("Response Status:", response.status);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Bookings not found (404).");
          } else if (response.status === 500) {
            throw new Error("Internal server error (500).");
          } else {
            throw new Error(`Failed to fetch bookings (status: ${response.status}).`);
          }
        }

        const data = await response.json();
        console.log("API Data:", data);

        if (data && Array.isArray(data.upcomingBookings)) {
          setBookingsData(data.upcomingBookings);
        } else {
          setBookingsData([]);
        }
      } catch (err) {
        console.error("Error fetching data:", err.message);
        setError(err.message);
        setBookingsData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

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

  const styles = {
    container: {
      display: "flex",
      fontFamily: "Arial, sans-serif",
      height: "100vh",
      marginLeft: "10px",
    },
    content: {
      marginLeft: '80px',
      width: '100%',
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      borderBottom: "1px solid #ddd",
      backgroundColor: "#fff",
      marginBottom: "30px",
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
    paymentSection: {
      display: "flex",
      justifyContent: "flex-start",
      gap: "10px",
      marginTop: "20px",
    },
    paymentBox: {
      flex: "0 1 350px",
      textAlign: "left",
      padding: "15px",
      border: "1px solid #ddd",
      borderRadius: "5px",
    },
    balance: {
      fontWeight: "bold",
      color: "#28a745",
      display: "flex",
      alignItems: "center",
    },
    symbolIcon: {
      width: "20px",
      height: "20px",
      marginRight: "5px",
    },
    earnings: {
      fontWeight: "bold",
      color: "#ffc107",
    },
    mapContainer: {
      marginTop: '0px',
      width: '100%',
      height: '250px',
      overflow: 'hidden',
    },
  };

  const handleCalendarClick = () => {
    navigate('/availability'); 
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      <div style={sidebarStyle}>
        <img
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMkw0IDdWMjJIMjBWN0wxMiAyWiIgc3Ryb2tlPSIjMjU2M2ViIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg=="
          alt="Logo"
          style={logoStyle}
        />
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Link to="/vendordashboard" style={activeItemStyle}>
            <div style={activeDotStyle}></div>
            <span style={iconContainerStyle}><Home size={20} /></span>
            <span>Home</span>
          </Link>
          <Link to="/listings" style={sidebarItemStyle}>
            <span style={iconContainerStyle}><ListOrdered size={20} /></span>
            <span>Listings</span>
          </Link>
          <Link to="/booking" style={sidebarItemStyle}>
            <span style={iconContainerStyle}><CalendarDays size={20} /></span>
            <span>Booking</span>
          </Link>
          <Link to="/messages" style={sidebarItemStyle}>
            <span style={iconContainerStyle}><MessageSquare size={20} /></span>
            <span>Messages</span>
          </Link>
          <Link to="/payments" style={sidebarItemStyle}>
            <span style={iconContainerStyle}><Wallet size={20} /></span>
            <span>Payments</span>
          </Link>
          <Link to="/profile" style={sidebarItemStyle}>
            <span style={iconContainerStyle}><User size={20} /></span>
            <span>Profile</span>
          </Link>
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
              onClick={handleCalendarClick} // Add onClick handler for calendar icon
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
          <div style={styles.sectionHeader}>Upcoming Bookings</div>
          {error ? (
            <div style={{ color: 'red' }}>Error: {error}</div> 
          ) : bookingsData.length > 0 ? (
            bookingsData.map((booking) => (
              <div key={booking.id} style={styles.booking}>
                <div style={styles.bookingInfo}>
                  <p>{booking.title}</p>
                  <p>Date: {booking.bookingDate}</p>
                  <p>Customer: {booking.customerName}</p>
                  <button style={styles.viewButton}>{booking.viewButtonText}</button>
                </div>
                <img
                  src={booking.bookingImage}
                  alt={booking.customer}
                  style={styles.bookingImage}
                />
              </div>
            ))
          ) : (
            <div>No bookings available</div> 
          )}
        </div>

        <div style={styles.section}>
          <h2>Payments</h2>
          <div style={styles.paymentSection}>
            <div style={styles.paymentBox}>
              <h4>Wallet Balance</h4>
              <p style={styles.balance}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuGCLVghxjwPmyDwfPfsQblAestPOS6_pBjQ&s" 
                  alt="Bitcoin Icon" style={styles.symbolIcon} />
                $5,400.99
              </p>
            </div>

            <div style={styles.paymentBox}>
              <h4>Earnings</h4>
              <p style={styles.earnings}>$1,500.75</p>
            </div>
          </div>
        </div>

        <div style={styles.section}>
          <h2>Location and Availability</h2>
          <div style={styles.mapContainer}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15334.224460882251!2d80.157599!3d16.088508!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a6337b1dbf91d%3A0x1b400dcd5e894b67!2sHaryak%20Technologies%20India%20Private%20Limited!5e0!3m2!1sen!2sin!4v1732259787373!5m2!1sen!2sin"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowfullscreen="" 
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
