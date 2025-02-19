import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import { useNavigate } from 'react-router-dom';

const SignUpDetails = () => {
  const [showOTPDialog, setShowOTPDialog] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: ''
  });
  const [otp, setOTP] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(20);
  const [error, setError] = useState('');
  const inputRefs = Array(6).fill(0).map(() => React.createRef());
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (showOTPDialog && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showOTPDialog, timer]);

  useEffect(() => {
    if (showOTPDialog) {
      inputRefs[0].current?.focus();
    }
  }, [showOTPDialog]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${config.API_BASE_URL}/users/register`, {
        fullName: formData.fullName,
        email: formData.email, 
        phone: formData.phone,
        password: formData.password
      });

      if (response.data) {
        // Store user data in localStorage before showing OTP dialog
        localStorage.setItem('userData', JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          accountNumber: '',
          ifsc: '',
          branch: ''
        }));
        setShowOTPDialog(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  const handleOTPChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    if (value && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleOTPKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerify = async () => {
    if (otp.every(digit => digit !== '')) {
      try {
        const otpString = otp.join('');
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
    }
  };

  const handleResend = async () => {
    try {
      await axios.post(`${config.API_BASE_URL}/users/resend-otp`, {
        email: formData.email
      });

      setTimer(15);
      setOTP(['', '', '', '', '', '']);
      inputRefs[0].current?.focus();
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP. Please try again.');
    }
  };

  const handleCancel = () => {
    setShowOTPDialog(false);
    setOTP(['', '', '', '', '', '']);
    setTimer(15);
    setError('');
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '40px auto',
      padding: '20px'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '32px'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '600',
          color: '#111827',
          marginBottom: '8px'
        }}>SignUp</h1>
        <p style={{
          fontSize: '14px',
          color: '#6B7280'
        }}>Enter your details to SignUp to your account.</p>
      </div>

      {error && (
        <div style={{
          backgroundColor: '#FEE2E2',
          color: '#DC2626',
          padding: '12px',
          borderRadius: '8px',
          marginBottom: '16px',
          textAlign: 'center'
        }}>
                  {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}>
        <div>
          <label style={{
            display: 'block',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#374151',
            marginBottom: '8px'
          }}>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Enter your Full Name"
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '14px',
              border: '1px solid #E5E7EB',
              borderRadius: '24px',
              color: '#374151',
              outline: 'none',
              backgroundColor: 'transparent'
            }}
            required
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#374151',
            marginBottom: '8px'
          }}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email address"
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '14px',
              border: '1px solid #E5E7EB',
              borderRadius: '24px',
              color: '#374151',
              outline: 'none',
              backgroundColor: 'transparent'
            }}
            required
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#374151',
            marginBottom: '8px'
          }}>Mobile Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter your Mobile number"
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '14px',
              border: '1px solid #E5E7EB',
              borderRadius: '24px',
              color: '#374151',
              outline: 'none',
              backgroundColor: 'transparent'
            }}
            required
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#374151',
            marginBottom: '8px'
          }}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '14px',
              border: '1px solid #E5E7EB',
              borderRadius: '24px',
              color: '#374151',
              outline: 'none',
              backgroundColor: 'transparent'
            }}
            required
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: '#4F46E5',
            color: 'white',
            padding: '12px',
            borderRadius: '24px',
            border: 'none',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            marginTop: '8px',
            width: '100%'
          }}
        >
          SignUp
        </button>
      </form>

      {showOTPDialog && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '24px',
            width: '90%',
            maxWidth: '400px',
            position: 'relative'
          }}>
            <button 
              onClick={handleCancel}
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '24px',
                color: 'black'
              }}
            >
              &#10005;
            </button>

            <h2 style={{
              textAlign: 'center',
              fontSize: '24px',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '8px'
            }}>
              Verify Your Account
            </h2>
            <p style={{
              textAlign: 'center',
              fontSize: '14px',
              color: '#6B7280',
              marginBottom: '24px'
            }}>
              Enter OTP sent to your mobile
            </p>

            {error && (
              <div style={{
                backgroundColor: '#FEE2E2',
                color: '#DC2626',
                padding: '12px',
                borderRadius: '8px',
                marginBottom: '16px',
                textAlign: 'center'
              }}>
                {error}
              </div>
            )}

            <div style={{
              display: 'flex',
              gap: '8px',
              justifyContent: 'center',
              marginBottom: '24px'
            }}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOTPChange(index, e.target.value)}
                  onKeyDown={(e) => handleOTPKeyDown(index, e)}
                  style={{
                    width: '40px',
                    height: '40px',
                    textAlign: 'center',
                    fontSize: '20px',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    outline: 'none'
                  }}
                />
              ))}
            </div>

            <button
              onClick={handleVerify}
              disabled={!otp.every(digit => digit !== '')}
              style={{
                backgroundColor: '#4F46E5',
                color: 'white',
                padding: '12px',
                borderRadius: '24px',
                border: 'none',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                width: '100%',
                opacity: !otp.every(digit => digit !== '') ? '0.5' : '1',
                marginBottom: '16px'
              }}
            >
              Verify OTP
            </button>

            <div style={{
              textAlign: 'center',
              fontSize: '14px'
            }}>
              {timer > 0 ? (
                <p style={{ color: '#6B7280' }}>
                  Resend OTP in {timer}s
                </p>
              ) : (
                <button
                  onClick={handleResend}
                  style={{
                    color: '#4F46E5',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Resend OTP
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUpDetails;