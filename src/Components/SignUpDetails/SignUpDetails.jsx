import React, { useState, useEffect } from 'react';

const SignUpDetails = () => {
  const [showOTPDialog, setShowOTPDialog] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: ''
  });
  const [otp, setOTP] = useState(['', '', '', '', '']);
  const [timer, setTimer] = useState(15);
  const inputRefs = Array(5).fill(0).map(() => React.createRef());

  // Simulate sending OTP
  const sendOTP = (mobile) => {
    const generatedOTP = Math.floor(10000 + Math.random() * 90000).toString(); // Generate a 5-digit OTP
    console.log(`OTP sent to ${mobile}: ${generatedOTP}`);
    setOTP(generatedOTP.split('')); // Set the OTP in the state (split to individual digits)
  };

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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if all the fields are filled
    if (formData.fullName && formData.email && formData.mobile && formData.password) {
      // Simulate sending OTP for the mobile number entered
      sendOTP(formData.mobile);
      setShowOTPDialog(true); // Show OTP dialog after OTP is sent
    } else {
      alert('Please fill in all the details before submitting!');
    }
  };

  const handleOTPChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    if (value && index < 4) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleOTPKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerify = () => {
    if (otp.every(digit => digit !== '')) {
      // Handle verification success
      console.log('Verification successful!', formData);
      setShowOTPDialog(false);
      setOTP(['', '', '', '', '']);
      setTimer(15);
    }
  };

  const handleResend = () => {
    setTimer(15);
    setOTP(['', '', '', '', '']);
    inputRefs[0].current?.focus();
    sendOTP(formData.mobile); // Resend OTP when requested
  };

  const handleCancel = () => {
    setShowOTPDialog(false);
    setOTP(['', '', '', '', '']);
    setTimer(15);
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
            placeholder="enter your Full Name"
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
            placeholder="enter your email address"
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
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            placeholder="enter your Mobile number"
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
            placeholder="enter your password"
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
            {/* Cancel Button */}
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
                color: 'black' // Set the color to black
              }}
            >
              &#10005; {/* This is the Unicode for "X" */}
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
              Enter OTP
            </p>

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
