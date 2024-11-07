import React from 'react';
import AboutPage from './About/AboutPage';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Header from './Components/Header';
import SignIn from './Components/SignIn';
import SignupPage from './SignUp/SignupPage';
import Availability from './Availability/Availability'; // Import the Availability component

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<Home />} />
          
          {/* SignIn Route */}
          <Route path="/signin" element={<SignIn />} /> 
          
          {/* SignUp Route */}
          <Route path="/signup" element={<SignupPage />} />
          
          {/* About Page Route */}
          <Route path="/about" element={<AboutPage />} />

          {/* Availability Route */}
          <Route path="/availability" element={<Availability />} />

          {/* Default Route - to handle undefined paths */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
