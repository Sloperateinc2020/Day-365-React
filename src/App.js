import React from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Header from './Components/Header';
import SignIn from './Components/SignIn';
import SignupPage from './SignUp/SignupPage';
import Register from './Components/Register';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/signin" element={<SignIn />} /> 
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
