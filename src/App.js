import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Header from './Components/Header';
import Home from './Components/Home';
import SignIn from './Components/SignIn';
import SignupPage from './SignUp/SignupPage';
import AboutPage from './About/AboutPage';
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

function App() {
  const [selectedMenu, setSelectedMenu] = useState('Home'); 

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
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
          <Route path="/documents" element={<Profile />} />
          <Route path="/accountsettings" element={<AccountSettings />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/bankdetails" element={<BankDetails />} />
          <Route path="/join-as-vendor" element={<VendorRegistration />} />
          <Route path="/top-services" element={<TopServices />} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
