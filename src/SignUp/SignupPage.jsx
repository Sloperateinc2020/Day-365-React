import React from 'react';
import './SignupPage.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from '../Components/Footer';

function SignupPage() {
  return (
    <>
      {/* Main container for the signup content */}
      <div className="signup-container1">
        {/* Wrapper for left and right sections */}
        <div className="signup-content-wrapper">
          {/* Left section with user info and icons */}
          <div className="signup-left1">
            <div className="user-info1">
              <img 
                src="/signup2.WEBP" 
                alt="User" 
                className="main-user-image1"
              />
            </div>
          </div>

          {/* Right section with sign-up options */}
          <div className="signup-right1">
            <h2>Let's Get Started 🚀</h2>
            <p>Sign up your account</p>
            
            <button className="signup-btn1 email-btn1">
              <i className="fas fa-envelope"></i> Sign Up with Email or Mobile
            </button>
            <button className="signup-btn1 google-btn1">
              <i className="fab fa-google"></i> Sign up with Google
            </button>
            <button className="signup-btn1 facebook-btn1">
              <i className="fab fa-facebook-f"></i> Sign up with Facebook
            </button>
            <button className="signup-btn1 apple-btn1">
              <i className="fab fa-apple"></i> Sign up with Apple
            </button>

            {/* Centered Terms & Conditions content */}
            <div className="centered-terms1">
              <p>By continuing you agree to our</p>
              <p className="terms1">
                <span className="bold-text1">Terms & Conditions</span> and <span className="bold-text1">Privacy Policy</span>
              </p>
            </div>
            
            {/* Centered Login link */}
            <p className="login-link1">
              Already have an account? 
              <button className="login-button1" onClick={() => alert('Redirecting to Login...')}>
                <strong>Log in</strong>
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Footer outside the main content container */}
      <Footer />
    </>
  );
}

export default SignupPage;
