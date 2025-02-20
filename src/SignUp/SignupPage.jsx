import React, { useState } from 'react'; 
import './SignupPage.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from '../Components/Footer';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => { 
  const navigate = useNavigate();
  
  const handleEmailMobileSignup = () => {
    navigate('/signupdetails'); 
  };

  const handleLoginRedirect = () => {
    navigate('/signin');
  };
  
  const [showPassword, setShowPassword] = useState(false); // Initialize state for password visibility

  return (
    <>
     

      {/* Desktop/Laptop Version */}
      <div className="hidden md:block signup-container1">
        <div className="signup-content-wrapper">
          <div className="signup-left1">
            <div className="user-info1">
              <img 
                src="/signup4.png" 
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
                marginBottom: "-35px", // Adjust spacing as needed
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
            <button className="signup-btn1 google-btn1">
              <i className="fab fa-google"></i> Sign up with Google
            </button>
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
