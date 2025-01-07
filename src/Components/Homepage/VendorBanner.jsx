import React from 'react';

const VendorBanner = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#6666ff',
      borderRadius: '10px',
      padding: '20px',
      marginTop: '70px',
      margin: '0 auto', 
      justifyContent: 'space-between',
      width: '90%', 
      maxWidth: '830px', 
      boxSizing: 'border-box', 
    }}>
      <div style={{
        flex: 1,
        backgroundColor: '#6666ff',
      }}>
        <h2 style={{
          color: '#FFFFFF',
          fontSize: '20px',
          fontWeight: 'bold',
          marginBottom: '10px',
          marginLeft: '30px',
          marginTop: '40px',
        }}>
          Build a Vendor Profile
        </h2>
        <p style={{
          color: '#FFFFFF',
          fontSize: '13px',
          marginBottom: '15px',
          marginLeft: '30px',
          whiteSpace: 'pre-line',
        }}>
          With dedication, dedication to duty in mind,{'\n'}
          effort is made to execute responsibilities {'\n'}
          in the best possible way.
        </p>
        <button style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '5px',
          padding: '8px 20px',
          marginTop: '10px',
          alignItems: 'center',
          width: '80px',
          marginLeft: '30px',
          marginBottom: '30px',
          border: 'none',
          cursor: 'pointer',
        }}>
          <span style={{
            color: '#4A90E2',
            fontSize: '16px',
          }}>
            Create
          </span>
        </button>
      </div>

      <img
        src="https://img.freepik.com/free-photo/day-office-travel-agency_23-2150769946.jpg"
        alt="Banner Main"
        style={{
          width: '400px',
          height: '200px',
          borderRadius: '50px',
        }}
      />
    </div>
  );
};

export default VendorBanner;
