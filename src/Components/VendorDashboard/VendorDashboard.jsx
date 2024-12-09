import React, { useEffect, useState } from "react";
import { Bell, Home, ListOrdered, MessageSquare, Wallet, User, CalendarDays } from 'lucide-react';
import config from '../../config';  // Import the config file for API URL
import { Link } from 'react-router-dom'; // Import Link for navigation


const VendorDashboard = () => {
  const [bookingsData, setBookingsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(config.UPCOMINGBOOKING_API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data = await response.json();

        // Log the API response to inspect the data structure
        console.log("API Data: ", data);

        // Check if 'upcomingBookings' exists and is an array
        if (data && Array.isArray(data.upcomingBookings)) {
          setBookingsData(data.upcomingBookings);  // Set data.upcomingBookings
        } else {
          setBookingsData([]);  // Fallback if 'upcomingBookings' is not found or is not an array
        }
      } catch (err) {
        setError(err.message);
        setBookingsData([]);  // Set to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Sidebar Styles
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
    padding: '10px 0', // Reduced padding to decrease gaps
  };

  const logoStyle = {
    width: '24px',
    height: '24px',
    marginBottom: '16px', // Reduced margin to decrease gaps
  };

  const sidebarItemStyle = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '8px 0', // Reduced padding
    color: '#666',
    fontSize: '11px',
    cursor: 'pointer',
    textDecoration: 'none',
    marginBottom: '4px', // Reduced margin to decrease gaps
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
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Adds a light shadow around the element
    },
    bookingInfo: {
      flex: 1,
      color: "#4a4a4a", // Light black color (pencil color)
    },
    
    bookingImage: {
      width: "100px",
      height: "80px",
      borderRadius: "2px",
      marginLeft: "10px",
      marginTop:"50px"
    },
    viewButton: {
      marginTop: "10px",
      padding: "5px 10px",
      backgroundColor: "White",
      color: "#007bff",  // Blue color for text
      border: "1px solid #007bff",  // Light blue (hex code)
      borderRadius: "5px",
      cursor: "pointer",
    },
    
    paymentSection: {
      display: "flex",
      justifyContent: "flex-start", // Align the items to the left
      gap: "10px",  // Space between the boxes
      marginTop: "20px", // Space above the section
    },
    paymentBox: {
      flex: "0 1 350px", // Adjust to a smaller width for each box
      textAlign: "left",
      padding: "15px",
      border: "1px solid #ddd",
      borderRadius: "5px",
    },
    balance: {
      fontWeight: "bold",
      color: "#28a745",
      display: "flex", // Flex container for wallet icon and text
      alignItems: "center", // Align icon with text
    },
    symbolIcon: {
      width: "20px",
      height: "20px",
      marginRight: "5px", // Space between icon and text
    },
    earnings: {
      fontWeight: "bold",
      color: "#ffc107",
    },
    mapContainer: {
      marginTop: '0px', // Space above the map
      width: '100%',
      height: '250px',  // Set a fixed height for the map
      overflow: 'hidden',
    },
  };

  // Render loading, error, or actual data
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={styles.container}>
    {/* Sidebar */}
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
            />
            <img 
              src="https://cdn-icons-png.flaticon.com/512/5035/5035563.png"
              alt="Bell Icon"
              style={{ width: "20px", height: "20px", cursor: "pointer" }} 
            />
            <span style={styles.headerIcon}>👤</span>
          </div>
        </div>

        {/* Upcoming Bookings */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>Upcoming Bookings</div>
          {Array.isArray(bookingsData) && bookingsData.length > 0 ? (
            bookingsData.map((booking) => (
              <div key={booking.id} style={styles.booking}>
                <div style={styles.bookingInfo}>
                  <p>{booking.title}</p>
                  <p>Date: {booking.date}</p>
                  <p>Customer: {booking.customer}</p>
                  <button style={styles.viewButton}>{booking.viewButtonText}</button>
                </div>
                <img
                  src={booking.image}
                  alt={booking.customer}
                  style={styles.bookingImage}
                />
              </div>
            ))
          ) : (
            <div>No bookings available</div>
          )}
        </div>

        {/* Payments Section with Heading */}
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

        {/* Location and Availability Headings */}
        <div style={styles.section}>
          <h2>Location and Availability</h2>      
        {/* Google Map Embed */}
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