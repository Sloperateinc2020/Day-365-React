import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import AboutPage from './About/AboutPage';
import Home from './Components/Home';
import Header from './Components/Header';
import SignIn from './Components/SignIn';
import SignupPage from './SignUp/SignupPage';
import Booking from './Components/Booking/Booking';
import Blog from './Components/Blog/Blog';
import Cart from './Components/Cart';
import Listings from './Components/Listings';
import Availability from './Availability/Availability';
import Profile from './Components/Profile/Profile'; // Ensure this is the correct path
import AccountSettings from './Components/AccountSettings/AccountSettings'; // Ensure this is the correct path
import Payments from './Components/Payments';
import BankDetails from './Components/BankDetails/BankDetails';
import TopServices from './Components/TopServices/TopServices';
import VendorRegistration from './Components/VendorRegistration/VendorRegistration';
import EditVendorProfile from './Components/EditVendorProfile/EditVendorProfile';
import AllServices from './Components/AllServices';
import Services from './Components/Services/Services';
import VendorDashboard from './Components/VendorDashboard/VendorDashboard';
import SearchResult from './Components/SearchResult/SearchResult';
import ConfirmBooking from './Components/ConfirmBooking/ConfirmBoking';
import PreviousBooking from './Components/PreviousBooking/PreviousBooking';
import UserVendorProfile from './Components/UserVendorProfile/UserVendorProfile';
import JobRegistration from './Components/JobRegistration/JobRegistration';
import Contact from './Components/Contact/Contact';
import SignUpDetails from './Components/SignUpDetails/SignUpDetails';
import ChatApp from './Components/ChatApp/ChatApp';
import VendorAvailability from './Components/VendorAvailability/VendorAvailability';
import LatestServices from './Components/LatestServices/LatestServices';
import Articles from './Components/Articles';

import ServiceDetails from './Components/ServiceDetails/ServiceDetails';



function App() {
  const [selectedMenu, setSelectedMenu] = useState('Home'); // Initial selected menu

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <AppWrapper selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
      </div>
    </Router>
  );
}

const AppWrapper = ({ selectedMenu, setSelectedMenu }) => {
  const location = useLocation(); // Get current route

  // Scroll to top whenever location changes (global scroll to top logic)
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top (0px from the top)
  }, [location.pathname]); // This effect will run on each route change

  return (
    <>
      {/* Conditionally render Header */}
      {location.pathname !== '/listings' && location.pathname !== '/vendordashboard' && 
      location.pathname !== '/booking' && 
      location.pathname !== '/profile' && 
      location.pathname !== '/accountsettings' && ( // Added condition for '/accountsettings'
        <Header selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
      )}

      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/listings" element={<Listings />} />
        
        
        {/* Add the dynamic availability route with serviceId */}
        <Route path="/availability/:serviceId" element={<Availability />} />
        
        {/* Profile and Account Settings Routes */}
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/documents" element={<Profile />} /> {/* Ensure this works */}
        <Route path="/accountsettings" element={<AccountSettings />} />
        
        {/* Other Routes */}
        <Route path="/payments" element={<Payments />} />
        <Route path="/bankdetails" element={<BankDetails />} />
        <Route path="/edit-vendor-profile/:listingId" element={<EditVendorProfile />} />
        <Route path="/join-as-vendor" element={<VendorRegistration />} />
        <Route path="/top-services" element={<TopServices />} />
        <Route path="/allservices" element={<AllServices />} />
        <Route path="/services" element={<Services />} />
        <Route path="/search-result" element={<SearchResult />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/availability" element={<Availability />} />
        <Route path="/vendordashboard" element={<VendorDashboard />} />
        <Route path="/confirmbooking" element={<ConfirmBooking />} />
        <Route path="/previousbooking" element={<PreviousBooking />} />
        <Route path="/uservendorprofile" element={<UserVendorProfile />} />
        <Route path="/jobregistration" element={<JobRegistration />} /> 
        <Route path="/contact" element={<Contact />} /> 
        <Route path="/signupdetails" element={<SignUpDetails />} /> 
        <Route path="/chat" element={<ChatApp />} />
        <Route path="/vendoravailability" element={<VendorAvailability />} />
        <Route path="/articles" element={<Articles />} />

        <Route path="/service-details" element={<ServiceDetails />} />

        
        {/* LatestServices route */}
        <Route path="/latestservices" element={<LatestServices />} />

        {/* 404 Page */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
