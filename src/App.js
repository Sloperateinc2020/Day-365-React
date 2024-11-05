import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Header from './Components/Header';
import SignIn from './Components/SignIn'; // Corrected the import for SignIn component

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/signin" element={<SignIn />} /> {/* Added route for SignIn */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
