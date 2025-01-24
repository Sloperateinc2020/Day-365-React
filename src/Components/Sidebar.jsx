import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, ListOrdered, MessageSquare, Wallet, User, CalendarDays } from 'lucide-react';

const Sidebar = ({ isActive }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sidebarStyle = {
    width: isMobile ? '100%' : '80px',
    backgroundColor: 'white',
    borderRight: isMobile ? 'none' : '1px solid #eee',
    borderTop: isMobile ? '1px solid #eee' : 'none',
    height: isMobile ? 'auto' : '100vh',
    position: 'fixed',
    bottom: isMobile ? 0 : 'auto',
    left: 0,
    top: isMobile ? 'auto' : 0,
    display: 'flex',
    flexDirection: isMobile ? 'row' : 'column',
    alignItems: 'center',
    justifyContent: isMobile ? 'space-around' : 'flex-start',
    padding: '10px 0',
    zIndex: 1000,
  };

  const sidebarItemStyle = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '8px 0',
    color: '#666',
    fontSize: '11px',
    textDecoration: 'none',
    cursor: 'pointer',
  };

  const activeItemStyle = {
    ...sidebarItemStyle,
    color: '#2563eb',
    position: 'relative',
  };

  const iconContainerStyle = {
    marginBottom: isMobile ? '0px' : '4px',
  };

  const activeDotStyle = {
    width: '3px',
    height: '100%',
    backgroundColor: '#2563eb',
    position: 'absolute',
    left: 0,
    top: 0,
  };

  return (
    <div style={sidebarStyle}>
      {!isMobile && (
        <img
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMkw0IDdWMjJIMjBWN0wxMiAyWiIgc3Ryb2tlPSIjMjU2M2ViIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg=="
          alt="Logo"
          style={{ width: '24px', height: '24px', marginBottom: '16px' }}
        />
      )}
      <div style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', width: '100%' }}>
        <Link to="/vendordashboard" style={isActive === 'home' ? activeItemStyle : sidebarItemStyle}>
          {isActive === 'home' && !isMobile && <div style={activeDotStyle}></div>}
          <Home size={20} style={iconContainerStyle} />
          <span>Home</span>
        </Link>
        <Link to="/listings" style={isActive === 'listings' ? activeItemStyle : sidebarItemStyle}>
          {isActive === 'listings' && !isMobile && <div style={activeDotStyle}></div>}
          <ListOrdered size={20} style={iconContainerStyle} />
          <span>Listings</span>
        </Link>
        <Link to="/booking" style={isActive === 'booking' ? activeItemStyle : sidebarItemStyle}>
          {isActive === 'booking' && !isMobile && <div style={activeDotStyle}></div>}
          <CalendarDays size={20} style={iconContainerStyle} />
          <span>Booking</span>
        </Link>
        <Link to="/chat" style={isActive === 'messages' ? activeItemStyle : sidebarItemStyle}>
  {isActive === 'messages' && !isMobile && <div style={activeDotStyle}></div>}
  <MessageSquare size={20} style={iconContainerStyle} />
  <span>Messages</span>
</Link>

        <Link to="/payments" style={isActive === 'payments' ? activeItemStyle : sidebarItemStyle}>
          {isActive === 'payments' && !isMobile && <div style={activeDotStyle}></div>}
          <Wallet size={20} style={iconContainerStyle} />
          <span>Payments</span>
        </Link>
        <Link to="/profile" style={isActive === 'profile' ? activeItemStyle : sidebarItemStyle}>
          {isActive === 'profile' && !isMobile && <div style={activeDotStyle}></div>}
          <User size={20} style={iconContainerStyle} />
          <span>Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
