import React, { useState } from 'react'; 
import './SignupPage.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from '../Components/Footer';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const SignupPage = () => { 
  const navigate = useNavigate();
  
  const handleEmailMobileSignup = () => {
    navigate('/signupdetails'); 
  };

  const handleLoginRedirect = () => {
    navigate('/signin');
  };
  
  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log(decoded);
    // Here you can handle the user data from Google
    // Typically you would:
    // 1. Send this to your backend
    // 2. Create/update user in your database
    // 3. Navigate to the next page or dashboard
    navigate('/dashboard');
  };

  const handleGoogleError = () => {
    console.error('Google Sign In was unsuccessful.');
  };

  return (
    <>
      {/* Desktop/Laptop Version */}
      <div className="hidden md:block signup-container1">
        <div className="signup-content-wrapper">
          <div className="signup-left1">
            <div className="user-info1">
              <img 
                src="/signup2.WEBP" 
                alt="User" 
                className="main-user-image1"
              />
            </div>
          </div>

          <div className="signup-right1">
            {/* This is the mobile sign-up heading, it will be shown only on small screens */}
            <h1
              className="mobile-heading"
              style={{
                fontSize: "35px",
                marginBottom: "-35px",
                textAlign: "center",
              }}
            >
              Sign up
            </h1>

            <h2>Let's Get Started 🚀</h2>
            <p>Sign up your account</p>

            <button className="signup-btn1 email-btn1" onClick={handleEmailMobileSignup}>
              <i className="fas fa-envelope"></i> Sign Up with Email or Mobile
            </button>
            
            <div className="google-btn-wrapper">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="filled_blue"
                shape="rectangular"
                size="large"
                text="continue_with"
              />
            </div>

            <button className="signup-btn1 facebook-btn1">
              <i className="fab fa-facebook-f"></i> Sign up with Facebook
            </button>
            <button className="signup-btn1 apple-btn1">
              <i className="fab fa-apple"></i> Sign up with Apple
            </button>

            <div className="centered-terms1">
              <p>By continuing you agree to our</p>
              <p className="terms1">
                <span className="bold-text1">Terms & Conditions</span> and <span className="bold-text1">Privacy Policy</span>
              </p>
            </div>

            <p className="login-link1">
              Already have an account?{' '}
              <button className="login-button1" onClick={handleLoginRedirect}>
                <strong>Log in</strong>
              </button>
            </p>
          </div>
        </div>
      </div>

      <Footer /> 
    </>
  );
};

export default SignupPage;