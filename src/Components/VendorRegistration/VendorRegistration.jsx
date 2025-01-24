import React, { useState, useEffect } from "react";
import "./VendorRegistration.css"; // Import the CSS file
import Footer from "../Footer"; // Import the Footer component
import VendorRegistrationMobile from "./VendorRegistrationMobile"; // Import the mobile version

const VendorRegistration = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Detect if the device is mobile based on screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the threshold as needed
    };

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    // Render the mobile version if on a mobile device
    return <VendorRegistrationMobile />;
  }

  return (
    <>
      <div className="vendor-registration-container">
        <h1 className="title">Become a Service Provider</h1>
        <p className="subtitle">
          Join the community of local service professionals who are dedicated to
          delivering great experiences for Customers
        </p>
        <form className="vendor-registration-form">
          <div className="form-row">
            <div className="form-text">
              <label>First Name</label>
              <input type="text" placeholder="Enter your First Name" />
            </div>
            <div className="form-text">
              <label>Last Name</label>
              <input type="text" placeholder="Enter your Last Name" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-text">
              <label>Email Address</label>
              <input type="email" placeholder="Enter Email Address" />
            </div>
            <div className="form-text">
              <label>Phone Number</label>
              <input type="text" placeholder="Phone Number" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-text">
              <label>Gender</label>
              <select>
                <option>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-text">
              <label>Date of Birth</label>
              <input type="date" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-text">
              <label>Address</label>
              <input type="text" placeholder="Enter your Address" />
            </div>
            <div className="form-text">
              <label>City</label>
              <input type="text" placeholder="Enter your City" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-text">
              <label>Zip Code</label>
              <input type="text" placeholder="Enter your Zipcode" />
            </div>
            <div className="form-text">
              <label>State</label>
              <select>
                <option>Select State</option>
                <option>Maharashtra</option>
                <option>Tamil Nadu</option>
                <option>Karnataka</option>
                {/* Add more states */}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-text">
              <label>Country</label>
              <input type="text" placeholder="Enter your Country" />
            </div>
            <div className="form-text">
              <label>Skills</label>
              <select>
                <option>Select your Skills</option>
                <option>Plumber</option>
                <option>Electrician</option>
                <option>IT Technician</option>
                {/* Add more skills */}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-text">
              <label>Aadhaar Number</label>
              <input type="text" placeholder="Enter your Aadhaar Number" />
            </div>
            <div className="form-text aadhaar-verify-group">
              <button type="button" className="verify-button">
                Verify
              </button>
            </div>
          </div>

          <div className="form-row">
            <div className="form-text">
              <label>Upload ID Proof</label>
              <input type="file" />
              <small>
                Please upload a clear image of your government-issued ID.
              </small>
            </div>
          </div>

          <button type="submit" className="submit-button">
            Proceed to Payment
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default VendorRegistration;
