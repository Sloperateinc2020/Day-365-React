import React, { useState,useEffect } from "react";
import "./VendorRegistration.css"; // Import the CSS file
import Footer from "../Footer"; // Import the Footer component

const VendorRegistration = () => {
  const [showOtpSection, setShowOtpSection] = useState(false); 
  const [otp, setOtp] = useState(["", "", "", ""]); // State for OTP input
  const [isBackgroundDisabled, setIsBackgroundDisabled] = useState(false); 
  useEffect(() => {
    document.body.classList.add('scroll-locked');
    
    return () => {
      document.body.classList.remove('scroll-locked');
    };
  }, []);
  const handleVerifyClick = () => {
    setShowOtpSection(true);
    setIsBackgroundDisabled(true); 
  };

  const handleOtpChange = (value, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value.slice(0, 1); 
    setOtp(updatedOtp);

    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleConfirmClick = () => {
    setShowOtpSection(false);
    setIsBackgroundDisabled(false); 
  };

  return (
    <>
    <div className="vendor-registration-container">
      {isBackgroundDisabled && <div className="overlay"></div>}

      {/* OTP Section */}
      {showOtpSection && (
        <div className="otp-modal">
          <h2 className="otp-title">Verification Code</h2>
          <p className="otp-subtitle">
            We have sent a code to your registered mobile number.
          </p>
          <div className="otp-fields">
            {otp.map((value, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={value}
                onChange={(e) => handleOtpChange(e.target.value, index)}
                className="otp-input"
              />
            ))}
          </div>
          <div className="otp-actions">
            <button type="button" className="resend-button">
              Resend
            </button>
            <button
              type="button"
              className="confirm-button"
              onClick={handleConfirmClick}
            >
              Confirm
            </button>
          </div>
        </div>
      )}

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
            <button
              type="button"
              className="verify-button"
              onClick={handleVerifyClick}
            >
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
