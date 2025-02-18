import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './App.css';
import AboutPage from './About/AboutPage';
import Home from './Components/Home';
import Header from './Components/Header';
import SignIn from './Components/SignIn';
import SignupPage from './SignUp/SignupPage';
import Booking from './Components/Booking/Booking';
import Blog from './Components/Blog/Blog';
import Listings from './Components/Listings';
import Availability from './Availability/Availability';
import Profile from './Components/Profile/Profile';
import AccountSettings from './Components/AccountSettings/AccountSettings';
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
import Forgotpassword from './Components/Forgotpassword';
import Userdropdown from './Components/Userdropdown';
import BeautyServices from './Components/Beauty/BeautyServices';
import VideoDetails from './Components/VideoDetails/VideoDetails';

// Replace this with your actual Google Client ID
const GOOGLE_CLIENT_ID = "1075595028652-aqr9rj7ji1nf49cuk3btf3dbh9d7tha8.apps.googleusercontent.com";

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <AppContent />
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

const AppContent = () => {
  const [selectedMenu, setSelectedMenu] = useState('Home');
  return <AppWrapper selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />;
};

const AppWrapper = ({ selectedMenu, setSelectedMenu }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {location.pathname !== '/listings' && 
       location.pathname !== '/vendordashboard' && 
       location.pathname !== '/booking' && 
       location.pathname !== '/profile' && 
       location.pathname !== '/accountsettings' && (
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
        <Route path="/availability/:serviceId" element={<Availability />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/documents" element={<Profile />} />
        <Route path="/accountsettings" element={<AccountSettings />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/bankdetails" element={<BankDetails />} />
        <Route path="/edit-vendor-profile/:listingId" element={<EditVendorProfile />} />
        <Route path="/join-as-vendor" element={<VendorRegistration />} />
        <Route path="/top-services" element={<TopServices />} />
        <Route path="/allservices" element={<AllServices />} />
        <Route path="/services" element={<Services />} />
        <Route path="/search-result" element={<SearchResult />} />
        <Route path="/Blog" element={<Blog />} />
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
        <Route path="/beautyServices" element={<BeautyServices />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/video-details" element={<VideoDetails />} />
        <Route path="/service-details" element={<ServiceDetails />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route path="/userdropdown" element={<Userdropdown />} />
        <Route path="/latestservices" element={<LatestServices />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </>
  );
};

export default App;