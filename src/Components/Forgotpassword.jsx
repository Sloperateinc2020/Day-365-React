import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from "../config";
import axios from 'axios';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); //1: email, 2: OTP, 3: new password
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
      fullName: '',
      email: '',
      phone: '',
      password: ''
    });

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://day365-java-9d7bebac1a3b.herokuapp.com/api/users/forget-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSuccessMessage('OTP sent successfully to your email!');
        setStep(2);
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleVerifyOTP = async () => {
    // Ensure `otp` is an array and not empty
    if (Array.isArray(otp) && otp.every(digit => digit !== '')) {
      try {
        const otpString = otp.join(''); // Convert the OTP array into a string
        await axios.post(`${config.API_BASE_URL}/users/verify-otp`, {
          email: formData.email,
          otp: otpString
        });
  
        const loginResponse = await axios.post(`${config.API_BASE_URL}/mobile-users/login`, {
          phone: formData.phone,
          password: formData.password
        });
  
        if (loginResponse.data) {
          // Store the token
          localStorage.setItem('token', loginResponse.data.token);
  
          // Store additional user data if provided in the response
          if (loginResponse.data.user) {
            const userData = {
              ...JSON.parse(localStorage.getItem('userData') || '{}'),
              ...loginResponse.data.user
            };
            localStorage.setItem('userData', JSON.stringify(userData));
          }
  
          // Navigate to profile page instead of signin
          navigate('/signin');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
      }
    } else {
      setError('OTP is incomplete or invalid. Please check and try again.');
    }
  };
  

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://day365-java-9d7bebac1a3b.herokuapp.com/api/users/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      if (response.ok) {
        setSuccessMessage('Password reset successfully!');
        setTimeout(() => {
          navigate('/signin');
        }, 2000);
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to reset password');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f7fafc' }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>
          {step === 1 ? 'Forgot Password' : step === 2 ? 'Verify OTP' : 'Reset Password'}
        </h2>

        {error && (
          <div style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fbd5d5',
            color: '#e53e3e',
            padding: '10px',
            borderRadius: '4px',
            marginBottom: '15px',
          }}>
            {error}
          </div>
        )}

        {successMessage && (
          <div style={{
            backgroundColor: '#f0fff4',
            border: '1px solid #c6f6d5',
            color: '#38a169',
            padding: '10px',
            borderRadius: '4px',
            marginBottom: '15px',
          }}>
            {successMessage}
          </div>
        )}

        {step === 1 && (
          <form onSubmit={handleSendOTP}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '14px', color: '#4a5568', marginBottom: '5px', display: 'block' }}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '4px',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>
            <button type="submit" style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#3182ce',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}>
              Send OTP
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOTP}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '14px', color: '#4a5568', marginBottom: '5px', display: 'block' }}>Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '4px',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>
            <button type="submit" style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#3182ce',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}>
              Verify OTP
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '14px', color: '#4a5568', marginBottom: '5px', display: 'block' }}>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '4px',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>
            <button type="submit" style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#3182ce',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}>
              Reset Password
            </button>
          </form>
        )}

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button onClick={() => navigate('/signin')} style={{
            background: 'none',
            border: 'none',
            color: '#3182ce',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}>
            Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;