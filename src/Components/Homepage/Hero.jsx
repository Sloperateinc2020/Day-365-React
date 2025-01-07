import React from 'react';

const Hero = () => {
  return (
    <div style={{
      background: '#D6E4FF',
      padding: '60px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <div style={{ flex: 1, paddingRight: '40px', marginLeft: '50px' }}>
        <h1 style={{
          fontSize: '38px',
          fontWeight: 'bold',
          marginBottom: '16px'
        }}>
          Welcome to <span style={{ color: '#4A90E2' }}>Day</span> 365
        </h1>
        <p style={{
          fontSize: '13px',
          fontWeight: 'bold',
          marginBottom: '10px',
          marginLeft: '170px'
        }}>
          - Local Services at Your Fingertips!
        </p>
        <p style={{
          fontSize: '12px',
          color: '#666',
          marginBottom: '24px',
          lineHeight: '22px'
        }}>
          At <span style={{ fontWeight: 'bold' }}>Day 365</span>, we make it easier than ever to book trusted local services,<br />
          online. Whether you need a plumber, electrician, driver, or any other<br />
          professional, we've got you covered with a network of experts ready to<br />
          serve you.
        </p>
        <button style={{
          backgroundColor: 'blue',
          color: 'white',
          padding: '10px',
          border: 'none',
          borderRadius: '5px',
          width: '120px',
          height: '40px',
          cursor: 'pointer'
        }}>
          Explore now
        </button>
      </div>
      <div style={{
          position: 'relative',
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            position: 'relative',
            width: '400px',
            height: '160px',
            backgroundColor: '#6666ff',
            borderRadius: '100px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            padding: '20px',
          }}>
            <img src="https://www.shutterstock.com/image-photo/happy-young-guy-flag-us-260nw-2000077403.jpg" alt="Person 1" style={{
              position: 'absolute',
              top: '-0px',
              left: '-0px',
              width: '70px',
              height: '60px',
              borderRadius: '50%',
              border: '4px solid white',
            }} />

            <div style={{
              backgroundColor: 'white',
              borderRadius: '15px',
              padding: '15px',
              textAlign: 'center',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              marginRight: '40px',
              zIndex: 1,
              width:"200px",
              marginTop:'70px'
            }}>
              <img src="https://www.shutterstock.com/image-vector/user-circle-isolated-icon-round-260nw-2459622791.jpg" alt="Plumber Icon" style={{
                width: '30px',
                height: '30px',
                marginBottom: '8px',
              }} />
              <h3 style={{
                fontSize: '16px',
                fontWeight: 'bold',
                margin: '0',
              }}>Plumber</h3>
              <p style={{
                fontSize: '12px',
                color: '#6666ff',
                margin: '0',
              }}>Book with Ease</p>
            </div>

            <div style={{
              position: 'absolute',
              top: '30%',
              right: '20px',
              transform: 'translateY(-50%)',
              backgroundColor: 'white',
              borderRadius: '15px',
              padding: '15px',
              textAlign: 'center',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              zIndex: 1,
              width:"150px"
            }}>
              <img src="https://img.freepik.com/premium-vector/businessman-driver-icon-flat-character-with-steering-wheel_176411-4417.jpg" alt="Driver Icon" style={{
                width: '30px',
                height: '30px',
                marginBottom: '8px',
              }} />
              <h3 style={{
                fontSize: '16px',
                fontWeight: 'bold',
                margin: '0',
              }}>Driver</h3>
              <p style={{
                fontSize: '12px',
                color: 'blue',
                margin: '0',
              }}>Book at Cheep COST</p>
            </div>

            <img src="https://via.placeholder.com/50" alt="Person 2" style={{
              position: 'absolute',
              bottom: '-20px',
              right: '-20px',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              border: '4px solid white',
            }} />

            {/* Location Icon */}
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '-10px',
              backgroundColor: 'white',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ff4081',
              fontSize: '16px',
              fontWeight: 'bold',
              zIndex: 2,
            }}>
              📍
            </div>
          </div>
          </div>
 
    </div>
  );
};

export default Hero;