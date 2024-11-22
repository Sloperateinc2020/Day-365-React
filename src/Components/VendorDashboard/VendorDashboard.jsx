import React from 'react';
import { Bell, Home, ListOrdered, MessageSquare, Wallet, User, CalendarDays } from 'lucide-react';

function VendorDashboard() {
  const bookings = [
    {
      date: "2024-11-15",
      customer: "John Doe",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800"
    },
    {
      date: "2024-11-16",
      customer: "Jane Smith",
      image: "https://images.unsplash.com/photo-1543269664-56d93c1b41a6?auto=format&fit=crop&w=800"
    },
    {
      date: "2024-11-17",
      customer: "Mike Johnson",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800"
    }
  ];

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
    padding: '16px 0'
  };

  const logoStyle = {
    width: '24px',
    height: '24px',
    marginBottom: '32px'
  };

  const sidebarItemStyle = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '12px 0',
    color: '#666',
    fontSize: '11px',
    cursor: 'pointer',
    textDecoration: 'none',
    marginBottom: '8px'
  };

  const activeItemStyle = {
    ...sidebarItemStyle,
    color: '#2563eb',
    position: 'relative'
  };

  const iconContainerStyle = {
    marginBottom: '4px'
  };

  const activeDotStyle = {
    width: '3px',
    height: '100%',
    backgroundColor: '#2563eb',
    position: 'absolute',
    left: 0,
    top: 0
  };

  const mainContentStyle = {
    marginLeft: '80px',
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    width: 'calc(100% - 80px)'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 24px',
    borderBottom: '1px solid #eee',
    backgroundColor: 'white'
  };

  const containerStyle = {
    padding: '24px',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const bookingItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '16px 24px',
    marginBottom: '12px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    width: '100%' // Ensure it takes up full available width
  };

  const bookingContentStyle = {
    flex: 1
  };

  const bookingImageStyle = {
    width: '48px',
    height: '48px',
    borderRadius: '6px',
    objectFit: 'cover',
    marginLeft: '24px'
  };

  const bookingHeadingStyle = {
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '8px',
    color: '#111'
  };

  const paymentCardStyle = {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
  };

  const sectionTitleStyle = {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '16px',
    marginTop: '-8px',
    marginLeft: '-24px' // Adjusted to shift the title properly
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={sidebarStyle}>
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMkw0IDdWMjJIMjBWN0wxMiAyWiIgc3Ryb2tlPSIjMjU2M2ViIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==" 
          alt="Logo" 
          style={logoStyle} 
        />
        
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={activeItemStyle}>
            <div style={activeDotStyle}></div>
            <span style={iconContainerStyle}><Home size={20} /></span>
            <span>Home</span>
          </div>
          
          <div style={sidebarItemStyle}>
            <span style={iconContainerStyle}><ListOrdered size={20} /></span>
            <span>Listings</span>
          </div>
          
          <div style={sidebarItemStyle}>
            <span style={iconContainerStyle}><CalendarDays size={20} /></span>
            <span>Bookings</span>
          </div>
          
          <div style={sidebarItemStyle}>
            <span style={iconContainerStyle}><MessageSquare size={20} /></span>
            <span>Messages</span>
          </div>
          
          <div style={sidebarItemStyle}>
            <span style={iconContainerStyle}><Wallet size={20} /></span>
            <span>Payments</span>
          </div>

          <div style={{ marginTop: 'auto', ...sidebarItemStyle, marginBottom: '16px' }}>
            <span style={iconContainerStyle}><User size={20} /></span>
            <span>Profile</span>
          </div>
        </div>
      </div>

      <div style={mainContentStyle}>
        <div style={headerStyle}>
          <h1 style={{ fontSize: '20px', fontWeight: '600',marginLeft:"20px" }}>Day 365</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Bell size={20} color="#666" />
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#e5e7eb' }} />
          </div>
        </div>

        <div style={containerStyle}>
          <div style={{ marginBottom: '24px',marginLeft:"30px" }}>
            <h2 style={sectionTitleStyle}>Upcoming Bookings</h2>
            </div>
            {bookings.map((booking, index) => (
              <div key={index} style={bookingItemStyle}>
                <div style={bookingContentStyle}>
                  <h3 style={bookingHeadingStyle}>Upcoming Booking</h3>
                  <p style={{ color: '#666', marginBottom: '6px', fontSize: '14px' }}>Date: {booking.date}</p>
                  <p style={{ fontWeight: '500', marginBottom: '6px', fontSize: '16px' }}>Customer: {booking.customer}</p>
                  <button style={{ color: '#2563eb', fontSize: '14px', border: 'none', background: 'none', cursor: 'pointer', padding: '4px 8px', marginLeft: '-8px' }}>
                    View Booking
                  </button>
                </div>
                <img 
                  src={booking.image}
                  alt={booking.customer}
                  style={bookingImageStyle}
                />
              </div>
            ))}
          </div>

          <div style={{ marginBottom: '24px',marginLeft:"60px" }}>
            <h2 style={sectionTitleStyle}>Payments</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div style={paymentCardStyle}>
                
                <h3 style={{ color: '#666', fontSize: '16px', marginBottom: '12px' }}>Wallet Balance</h3>
                <p style={{ fontSize: '24px', fontWeight: '600' }}>$2,570.00</p>
                <p style={{ fontSize: '13px', color: '#666', marginTop: '8px' }}>Updated just now</p>
              </div>
              <div style={paymentCardStyle}>
                <h3 style={{ color: '#666', fontSize: '16px', marginBottom: '12px' }}>Today's Earnings</h3>
                <p style={{ fontSize: '24px', fontWeight: '600' }}>$150.00</p>
                <p style={{ fontSize: '13px', color: '#666', marginTop: '8px' }}>Updated just now</p>
              </div>
            </div>
          </div>

          <div>
            <h2 style={sectionTitleStyle}>Location and Availability</h2>
            <div style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15334.224460882251!2d80.157599!3d16.088508!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a6337b1dbf91d%3A0x1b400dcd5e894b67!2sHaryak%20Technologies%20India%20Private%20Limited!5e0!3m2!1sen!2sin!4v1732173867342!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              />
            </div>
          </div>
        </div>
      </div>
  );
}

export default VendorDashboard;
