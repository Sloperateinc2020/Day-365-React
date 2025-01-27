import React, { useState, useEffect } from 'react';
import { Search, Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import LatestServices from './LatestServices/LatestServices';
import VendorBanner from './Homepage/VendorBanner';
import TopServices from './TopServices/TopServices';

function HomeMobile() {
  const [allServices, setAllServices] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch(config.SERVICE_API_URL);
      const data = await response.json();
      setAllServices(data.services || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const filteredServices = allServices.filter(service =>
    service.service.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Initialize SpeechRecognition for compatibility with both Chrome and other browsers
  const startSpeechRecognition = () => {
    // Check if the browser supports SpeechRecognition or webkitSpeechRecognition
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported by your browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; // Set the language
    recognition.interimResults = false; // Get only final results
    recognition.maxAlternatives = 1; // Only take one result

    recognition.start(); // Start listening

    // When speech is recognized, update searchValue with the transcript
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log('Speech result:', transcript); // Log the result
      setSearchValue(transcript); // Update the input field with the spoken text
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event);
      alert('Error occurred during speech recognition.');
    };
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        backgroundColor: 'black',
        padding: '16px 20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '8px'
        }}>
          <div
            onClick={() => navigate('/signup')}
            style={{
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              color: "white"
            }}
          >
            SignIn/ Register
          </div>
          <button
            onClick={() => navigate('/join-as-vendor')}
            style={{
              backgroundColor: '#8a6ded',
              color: '#ffffff',
              padding: '8px 16px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: 700
            }}
          >
            Join As A Vendor
          </button>
        </div>
        {/* Search Bar */}
        <div style={{ position: 'relative', marginTop: '8px' }}>
          <Search
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9ca3af'
            }}
            size={20}
          />
          <input
            type="text"
            placeholder="What are you looking for?"
            style={{
              width: '100%',
              padding: '10px 40px',
              borderRadius: '9999px',
              border: '1px solid #e5e7eb',
              backgroundColor: '#ffffff',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
              fontSize: '16px'
            }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Mic
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9ca3af',
              cursor: 'pointer'
            }}
            size={20}
            onClick={startSpeechRecognition} // Start speech recognition when mic is clicked
          />
        </div>
      </header>

      <main style={{ paddingTop: '120px', paddingLeft: '16px', paddingRight: '16px' }}>
        {/* Services Section */}
        <section style={{ marginBottom: '3px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
            marginTop: "10px"
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: 600
            }}>Explore All Services</h2>
          </div>

          {/* Services Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            backgroundColor: '#f9fafb',
            padding: '16px',
            borderRadius: '8px',
            marginTop: "-20px",
          }}>
            {filteredServices.length > 0 ? (
              filteredServices.map((service, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={() => navigate('/service-details', { state: { service } })}
                >
                  <div style={{
                    width: '90px', // Increase background width
                    height: '80px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f3f4f6',
                  }}>
                    <img
                      src={service.imageUrl}
                      alt={service.service}
                      style={{
                        width: '70px', // Fixed image width
                        height: '80px', // Fixed image height
                        objectFit: 'contain',
                      }}
                    />
                  </div>
                  <p style={{
                    fontSize: '12px',
                    textAlign: 'center',
                    fontWeight: 500,
                    color: '#4b5563',
                    marginTop: '8px'
                  }}>
                    {service.service}
                  </p>
                </div>
              ))
            ) : (
              <p style={{ textAlign: 'center', color: '#999' }}>
                No services found matching "{searchValue}"
              </p>
            )}
          </div>
        </section>
        <TopServices
          limit={3}
          hideFooter={true}
          hideDescription={true}
          isMobile={true}
        />
      </main>
    </div>
  );
}

export default HomeMobile;
