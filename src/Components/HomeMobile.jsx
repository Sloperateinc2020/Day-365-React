import React, { useState, useEffect } from 'react';
import { Search, Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import LatestServices from './LatestServices/LatestServices';
import VendorBanner from './Homepage/VendorBanner';
import TopServices from './TopServices/TopServices';

function HomeMobile() {
  const [allServices, setAllServices] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
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

  // Filter services based on the search value
  const filteredServices = allServices.filter(service =>
    service.service.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh', paddingBottom: '80px' }}>
      <header
        style={{
          padding: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'fixed',
          top: '0',
          width: '100%',
          zIndex: '10',
          backgroundColor: '#fff',
        }}
      >
        <div
          onClick={() => navigate('/signup')}
          style={{ fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}
        >
          SignIn/ Register
        </div>
        <button
          onClick={() => navigate('/join-as-vendor')}
          style={{
            backgroundColor: '#8a6ded',
            color: 'white',
            padding: '5px 10px',
            borderRadius: 25,
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '12px',
          }}
        >
          Join As A Vendor
        </button>
      </header>

      <main style={{ paddingTop: '64px', paddingLeft: '16px', paddingRight: '16px' }}>
        <div style={{ position: 'relative', marginBottom: '2px' }}>
          <Search
            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}
            size={20}
          />
          <input
            type="text"
            placeholder="Search"
            style={{
              width: '100%',
              paddingLeft: '40px',
              paddingRight: '40px',
              paddingTop: '10px',
              paddingBottom: '10px',
              backgroundColor: '#ffffff',
              borderRadius: '9999px',
              border: '1px solid #e5e7eb',
              outline: 'none',
              boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
            }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Mic
            style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', cursor: 'pointer' }}
            size={20}
          />
        </div>

        <section style={{ marginBottom: '2px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: '600',marginTop:"10px" }}>Looking For</h2>
            <button
              style={{
                fontSize: '14px',
                background: 'none',
                border: 'none',
                color: 'black',
                cursor: 'pointer',
                fontWeight: '500',
                marginTop:"7px"
              }}
              onClick={() => navigate('/categories')}
            >
              More
            </button>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {filteredServices.slice(0, visibleCount).map((service, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: '#ffffff',
                  padding: '12px',
                  borderRadius: '8px',
                  boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                  width: '22%',
                }}
                onClick={() => navigate('/service-details', { state: { service } })}
              >
                <img
                  src={service.imageUrl}
                  alt={service.service}
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
                <span style={{ fontSize: '12px', textAlign: 'center', fontWeight: '500' }}>
                  {service.service}
                </span>
              </div>
            ))}
          </div>
        </section>
        <LatestServices hideFooter={true} hideDescription={true} isMobile={true} />
        <VendorBanner hideText={true} containerWidth="100%" imageWidth="140px" showBookNowText={true} reducedHeight={true} />
        <TopServices limit={3} hideFooter={true} hideDescription={true} isMobile={true} />
      </main>
    </div>
  );
}

export default HomeMobile;