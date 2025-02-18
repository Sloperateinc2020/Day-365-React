import React, { useEffect, useState } from "react";
import { Bell, Home, ListOrdered, MessageSquare, Wallet, User, CalendarDays } from 'lucide-react';
import config from '../../config';  
import { Link, useNavigate } from 'react-router-dom'; 
import { useMediaQuery } from 'react-responsive';
import VendorDashboardMobile from './VendorDaashboardMobile';
import { height } from "@fortawesome/free-solid-svg-icons/fa0";

const VendorDashboard = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [bookingsData, setBookingsData] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const API_URL = 'https://run.mocky.io/v3/754a59cd-a326-47bd-87c8-cc553896732d';
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  // Handle resize effect
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch vendor dashboard data
  useEffect(() => {
    const fetchVendorDashboard = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        // Handle the data as needed
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchVendorDashboard();
  }, [API_URL]);

  // Fetch bookings effect
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

  if (isMobile) {
    return <VendorDashboardMobile />;
  }

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
  };

  const handleClosePopup = () => {
    setSelectedBooking(null);
  };

  const handleCalendarClick = () => {
    navigate('/availability'); 
  };

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
      fontFamily: "Arial, sans-serif",
      padding: "16px",
      backgroundColor: "#fff",
      color: "#000",
      borderRadius: "8px",
      boxShadow: "0 0px 0px rgba(0, 0, 0, 0.1)",
      maxWidth: "400px",
      margin: "0 auto",
    },
    heading: {
      fontSize: "20px",
      fontWeight: "bold",
      marginBottom: "8px",
      color: "#333",
    },
    subHeading: {
      fontSize: "14px",
      marginBottom: "16px",
      color: "#777",
    },
    content: {
      marginLeft: '-360px',
      width: '320%',
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
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
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
    popupOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    popupContent: {
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "8px",
      width: "400px",
      position: "relative",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    closeButton: {
      position: "absolute",
      top: "10px",
      right: "10px",
      background: "none",
      border: "none",
      fontSize: "20px",
      cursor: "pointer",
    },
    detailItem: {
      display: "flex",
      alignItems: "center",
      marginBottom: "12px",
      gap:'40px'
    },
    icon: {
      marginRight: "12px",
      fontSize: "18px",
      color: "#555",
    },
    text: {
      fontSize: "14px",
      color: "#333",
    },
    label: {
      display: "block",
      fontSize: "14px",
      fontWeight: "bold",
      marginBottom: "8px",
      color: "#555",
    },
    dropdown: {
      width: "100%",
      padding: "8px",
      fontSize: "14px",
      border: "1px solid #ccc",
      borderRadius: "4px",
    },
    textarea: {
      width: "100%",
      height: "80px",
      padding: "8px",
      fontSize: "14px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      resize: "none",
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
      color:'#6B7280',
      height:'100px',
      
    },
    balance: {
      fontWeight: "bold",
      color: "#28a745",
      display: "flex",
      alignItems: "center",
      marginTop:'15px'

    },
    symbolIcon: {
      width: "20px",
      height: "20px",
      marginRight: "5px",
      marginBottom:'7px'
    },

    earnings: {
      fontWeight: "bold",
      color: "#ffc107",
     marginTop:'15px',
     

    },
    updatedText: {
      fontSize: "12px",
      color: "#6B7280",
      marginTop: "5px",
      marginLeft:'120px',
      fontWeight:'bold',
    },
    mapContainer: {
      marginTop: '0px',
      width: '100%',
      height: '250px',
      overflow: 'hidden',
    },
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
          <div style={styles.headerTitle}>Urban Maverick</div>
          <div style={styles.headerIcons}>
            <img 
              src="https://cdn.iconscout.com/icon/free/png-512/free-calendar-icon-download-in-svg-png-gif-file-formats--feather-pack-user-interface-icons-433988.png?f=webp&w=256" 
              alt="Calendar Icon" 
              style={{ width: "20px", height: "20px", cursor: "pointer" }} 
              onClick={handleCalendarClick}
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
                  <button
                    style={styles.viewButton}
                    onClick={() => handleViewBooking(booking)}
                  >
                    View Booking
                  </button>           
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

        {/* Popup for Booking Details */}
        {selectedBooking && (
          <div style={styles.popupOverlay}>
            <div style={styles.popupContent}>
              <button
                style={styles.closeButton}
                onClick={handleClosePopup}
              >
                &times;
              </button>
              <div style={styles.container}>
                <h2 style={styles.heading}>Booking Details</h2>
                <p style={styles.subHeading}>Booking information for John Doe</p>
                
                <div style={styles.detailItem}>
                  <span style={styles.icon}>📞</span>
                  <span style={styles.text}>+1 (555) 123-4567</span>
                </div>

                <div style={styles.detailItem}>
                  <span style={styles.icon}>📧</span>
                  <span style={styles.text}>john.doe@example.com</span>
                </div>

                <div style={styles.detailItem}>
                  <span style={styles.icon}>📅</span>
                  <span style={styles.text}>2024-10-29 at 10:00 AM</span>
                </div>

                <div style={styles.detailItem}>
                  <span style={styles.icon}>📍</span>
                  <span style={styles.text}>123 Main St, Anytown, USA</span>
                </div>

                <div style={styles.detailItem}>
                  <span style={styles.icon}>⏰</span>
                  <span style={styles.text}>Normal Service</span>
                </div>

                <div style={styles.detailItem}>
                  <span style={styles.icon}>🔧</span>
                  <span style={styles.text}>Pipe Repair</span>
                </div>

                <div style={styles.detailItem}>
                  <span style={styles.icon}>💵</span>
                  <span style={styles.text}>Advance Paid: $50 / Total: $200</span>
                </div>

                <div style={styles.detailItem}>
                  <span style={styles.icon}>⚠️</span>
                  <span style={styles.text}>Leaking pipe under the kitchen sink</span>
                </div>

                <div style={styles.detailItem}>
                  <label style={styles.label}>Status</label>
                  <select style={styles.dropdown}>
                    <option value="Scheduled">Scheduled</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div style={styles.detailItem}>
                  <label style={styles.label}>Notes</label>
                  <textarea
                    style={styles.textarea}
                    placeholder="Customer mentioned the leak started yesterday"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div style={styles.section}>
          <h2>Payments</h2>
          <div style={styles.paymentSection}>
            <div style={styles.paymentBox}>
              <h4>Wallet Balance</h4>
              <p style={styles.balance}>
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuGCLVghxjwPmyDwfPfsQblAestPOS6_pBjQ&s" 
                  alt="Bitcoin Icon" 
                  style={styles.symbolIcon} 
                />
                $5,400.99
                <p style={styles.updatedText}>Updated just now</p>

              </p>
            </div>

            <div style={styles.paymentBox}>
              <h4>Earnings</h4>
              <p style={styles.earnings}>$1,500.75</p>
              <p style={styles.updatedText}>Updated just now</p>

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
              allowFullScreen="" 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;