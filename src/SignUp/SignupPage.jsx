import React from 'react';
import './SignupPage.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function SignupPage() {
  return (
    <div className="signup-container">
      {/* Left section with user info and icons */}
      <div className="signup-left">
        <div className="user-info">
          <img 
            src="/signup2.WEBP" 
            alt="User" 
            className="main-user-image"
          />
        </div>
      </div>

      {/* Right section with sign-up options */}
      <div className="signup-right">
        <h2>Let's Get Started 🚀</h2>
        <p>Sign up your account</p>
        
        <button className="signup-btn email-btn">
          <i className="fas fa-envelope"></i> Sign Up with Email or Mobile
        </button>
        <button className="signup-btn google-btn">
          <i className="fab fa-google"></i> Sign up with Google
        </button>
        <button className="signup-btn facebook-btn">
          <i className="fab fa-facebook-f"></i> Sign up with Facebook
        </button>
        <button className="signup-btn apple-btn">
          <i className="fab fa-apple"></i> Sign up with Apple
        </button>

        {/* Centered Terms & Conditions content */}
        <div className="centered-terms">
          <p>By continuing you agree to our</p>
          <p className="terms">
            <span className="bold-text">Terms & Conditions</span> and <span className="bold-text">Privacy Policy</span>
          </p>
        </div>
        
        {/* Centered Login link */}
        <p className="login-link">
          Already have an account? 
          <button className="login-button" onClick={() => alert('Redirecting to Login...')}>
            <strong>Log in</strong>
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
