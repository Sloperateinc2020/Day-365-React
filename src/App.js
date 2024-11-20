import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import all necessary components
import AboutPage from './About/AboutPage';
import Home from './Components/Home';
import Header from './Components/Header';
import SignIn from './Components/SignIn';
import SignupPage from './SignUp/SignupPage';
import Booking from './Components/Booking/Booking';
import Register from './Components/Register';
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

function App() {
  const [selectedMenu, setSelectedMenu] = useState('Home'); // Initial selected menu

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Pass selectedMenu and setSelectedMenu as props to Header */}
        <Header selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/register" element={<Register />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/availability" element={<Availability />} />
          <Route path="/documents" element={<Profile />} /> {/* Add Profile route */}
          <Route path="/accountsettings" element={<AccountSettings />} /> {/* Add AccountSetting route */}
          <Route path="/payments" element={<Payments />} />
          <Route path="/bankdetails" element={<BankDetails />} />
          <Route path="/editvendorprofile" element={<EditVendorProfile />} />
          <Route path="/join-as-vendor" element={<VendorRegistration />} />
          <Route path="/top-services" element={<TopServices />} />
          <Route path="/allservices" element={<AllServices />} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
