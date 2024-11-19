import React from 'react';
import AboutPage from './About/AboutPage';
import './App.css';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Components/Home';
import Header from './Components/Header';
import SignIn from './Components/SignIn';
import SignupPage from './SignUp/SignupPage';
import Availability from './Availability/Availability'; 
import Booking from './Components/Booking/Booking';
import Register from './Components/Register';
import Listings from './Components/Listings';
import Profile from './Components/Profile/Profile'; // Import Profile component
import AccountSettings from './Components/AccountSettings/AccountSettings'; // Import AccountSetting component
import Payments from './Components/Payments';
import BankDetails from './Components/BankDetails/BankDetails'; // Import BankDetails component
import EditVendorProfile from './Components/EditVendorProfile/EditVendorProfile';




function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <Routes>

          {/* Default Route - to handle undefined paths */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />

          {/* Redirect the root path to /home */}
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
          <Route path="/listings" element={<Listings/>} />
           <Route path="/availability" element={<Availability />} />
           <Route path="/payments" element={<Payments/>} />
           <Route path="/bankdetails" element={<BankDetails />} /> {/* Add BankDetails route */}
           <Route path="/editvendorprofile" element={<EditVendorProfile />} /> {/* Add BankDetails route */}


        </Routes>
      </div>
    </Router>
  );
}

export default App;
