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
                src="/signup2.WEBP" 
                alt="User" 
                className="main-user-image1"
              />
            </div>
          </div>

          <div className="signup-right1">
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

      {/* Mobile Version */}
      <div className="mobile-signup-container md:hidden">
        <div className="min-h-screen bg-white flex flex-col justify-center px-6">
          <div className="text-center mb-8">
<h1
  className="text-3xl font-bold text-black mb-4"
  style={{ position: 'relative', top: '-20px' }}
>
  Sign up
</h1>
          </div>

         <div className="social-buttons">
  <button className="social-button google">
    <i className="fab fa-google"></i>
  </button>
  <button className="social-button facebook">
    <i className="fab fa-facebook-f"></i>
  </button>
  <button className="social-button apple">
    <i className="fab fa-apple"></i>
  </button>
</div>


<div className="text-center text-light-gray text-sm mb-6">
  <p>OR</p>
</div>

          <form>
            <div className="form-group">
              <label className="form-label">Email</label>
              <div className="input-wrapper">
                <i className="fas fa-envelope input-icon"></i>
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="Enter your email or Mobile"
                />
              </div>
            </div>

            <div className="form-group">
  <label className="form-label">Password</label>
  <div className="input-wrapper">
    <i className="fas fa-lock input-icon"></i>
    <input
      type={showPassword ? 'text' : 'password'}
      className="form-input"
      placeholder="Enter your password"
    />
   
  </div>
</div>

            <button type="submit" className="signup-button">
              Sign up
            </button>

            <p className="terms">
              By signing up, I agree with the <br></br>{' '}
              <a href="#" className="text-[#6366F1] font-medium">T&C</a> &{' '}
              <a href="#" className="text-[#6366F1] font-medium">Privacy Policy</a>
            </p>
          </form>

         <div className="text-center mt-6">
  <p className="text-sm text-gray-600">
    Already have an account?{' '}
    <button
      onClick={handleLoginRedirect}
      className="signin-link text-blue-500 font-semibold"
    > 
      Log in
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
