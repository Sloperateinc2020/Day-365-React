import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Header from './Components/Header'; // Adjust path if needed

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header /> {/* Include Header here */}
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
