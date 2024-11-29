 import React, { useState } from 'react';
import { FaGoogle, FaApple, FaFacebook } from 'react-icons/fa';
import { IoLogoOctocat } from 'react-icons/io';
import Footer from './Footer';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log('Sign-in attempted with:', { email, password });
  };


  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f9f9f9', overflowX: 'hidden' }}>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', position: 'relative' }}>

        <div style={{ position: 'absolute', top: '70px', left: '10px', display: 'flex', alignItems: 'center' }}>
          <IoLogoOctocat size={30} style={{ color: '#6A5ACD', marginRight: '8px' }} />
          <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>Day 365</span>
        </div>

        <a href="#" style={{ position: 'absolute', top: '80px', right: '10px', color: 'black', fontSize: '14px', textDecoration: 'none' }}>
          Don’t have an account? <span style={{ color: '#6A5ACD' }}>Register Now</span>
        </a>


        <div style={{marginTop:'140px', maxWidth: '500px', width: '100%', backgroundColor: '#fff', padding: '40px', borderRadius: '8px', margin: '20px 0', position: 'relative' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', color: '#333', marginBottom: '5px' }}>Welcome back</h1>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '5px', fontSize: '8px' }}>Enter your details to get sign in to your account.</p>

          <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '50px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
              <label style={{ color: '#333', fontWeight: '500' }}>Email or Mobile Number</label>
              <input
                type="text"
                placeholder="Mobile number or email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  padding: '12px',
                  fontSize: '12px',
                  borderRadius: '20px',
                  border: '1px solid #ddd',
                  outline: 'none',
                  color: '#333',
                  backgroundColor: '#f9f9f9',
                  '::placeholder': { color: '#aaa' }
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
              <label style={{ color: '#333', fontWeight: '500' }}>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  padding: '12px',
                  fontSize: '12px',
                  borderRadius: '20px',
                  border: '1px solid #ddd',
                  outline: 'none',
                  color: '#333',
                  backgroundColor: '#f9f9f9',
                  '::placeholder': { color: '#aaa' }
                }}
              />
            </div>

            <a href="#" style={{ color: '#6A5ACD', textAlign: 'left', fontSize: '14px', textDecoration: 'none' }}>Forgot Password?</a>

            <button type="submit" style={{
              padding: '12px',
              fontSize: '16px',
              borderRadius: '20px',
              backgroundColor: '#6A5ACD',
              color: '#fff',
              border: 'none',
              cursor: 'pointer'
            }}>
              Continue
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
            <hr style={{ flex: 1, border: 'none', height: '1px', backgroundColor: '#ddd' }} />
            <span style={{ margin: '0 10px', color: '#999' }}>Or Sign in with</span>
            <hr style={{ flex: 1, border: 'none', height: '1px', backgroundColor: '#ddd' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '10px 20px', border: '1px solid black', borderRadius: '20px', backgroundColor: '#fff', cursor: 'pointer' }}>
              <FaGoogle /> Google
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '10px 20px', border: '1px solid black', borderRadius: '20px', backgroundColor: '#fff', cursor: 'pointer' }}>
              <FaApple /> Apple
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '10px 20px', border: '1px solid black', borderRadius: '20px', backgroundColor: '#fff', cursor: 'pointer' }}>
              <FaFacebook /> Facebook
            </button>
          </div>
        </div>
      </div>


      <Footer />
    </div>
  );
}

export default SignIn;