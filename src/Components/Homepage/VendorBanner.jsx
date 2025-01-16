import React from 'react';

const VendorBanner = ({
  hideText,
  containerWidth = '90%',
  imageWidth = '400px',
  showBookNowText = false,
  reducedHeight = false, // New prop for height adjustment
}) => {
  const leftMargin = showBookNowText ? '15px' : '30px'; // Adjust left margin based on showBookNowText
  const bannerPadding = reducedHeight ? '10px' : '20px'; // Adjust padding based on reducedHeight
  const marginTop = reducedHeight ? '50px' : '70px'; // Adjust margin-top based on reducedHeight

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#6666ff',
        borderRadius: '10px',
        padding: bannerPadding, // Dynamic padding
        marginTop: marginTop, // Dynamic margin-top
        margin: '0 auto',
        justifyContent: 'space-between',
        width: containerWidth,
        maxWidth: '830px',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          flex: 1,
          backgroundColor: '#6666ff',
        }}
      >
        <h2
          style={{
            color: '#FFFFFF',
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '10px',
            marginLeft: leftMargin,
            marginTop: '40px',
          }}
        >
          Build a Vendor Profile
        </h2>
        {showBookNowText && (
          <p
            style={{
              color: 'white',
              fontSize: '14px',
              fontWeight: 'bold',
              marginLeft: leftMargin,
              marginTop: '10px',
            }}
          >
            Empowering solutions,<br />delivered with dedication.
          </p>
        )}
        {!hideText && (
          <p
            style={{
              color: '#FFFFFF',
              fontSize: '13px',
              marginBottom: '15px',
              marginLeft: leftMargin,
              whiteSpace: 'pre-line',
            }}
          >
            With dedication, dedication to duty in mind,{'\n'}
            effort is made to execute responsibilities {'\n'}
            in the best possible way.
          </p>
        )}
        <button
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '5px',
            padding: '8px 20px',
            marginTop: '10px',
            alignItems: 'center',
            width: '80px',
            marginLeft: leftMargin,
            marginBottom: '30px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <span
            style={{
              color: '#4A90E2',
              fontSize: '16px',
            }}
          >
            Create
          </span>
        </button>
      </div>

      <img
        src="https://img.freepik.com/free-photo/day-office-travel-agency_23-2150769946.jpg"
        alt="Banner Main"
        style={{
          width: imageWidth,
          height: 'auto',
          borderRadius: '50px',
        }}
      />
    </div>
  );
};

export default VendorBanner;
