import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from './Homepage/Hero';
// import SearchBar from './Homepage/SearchBar';
import VendorBanner from './Homepage/VendorBanner';
import CustomerHelp from './Homepage/CustomerHelp';
import LatestServices from './LatestServices/LatestServices';
import TopServices from './TopServices/TopServices'; // Import TopServices component
import ServiceList from './Homepage/ServiceList'; // Import updated ServiceList
import Footer from './Footer';


const Home = () => {
  const navigate = useNavigate();

  return (
    <>

    <div className="home-container">
      <Hero />
      {/* <SearchBar /> */}

      {/* ServiceList Section */}
      <ServiceList /> {/* Display services with navigation arrows */}

      {/* LatestServices section */}
      <div style={{ marginLeft: '50px' }}>
        <LatestServices limit={3} hideFooter={true} hideDescription={true} />
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={() => navigate('/latestservices')}
            style={{
              backgroundColor: '#6666ff',
              color: 'white',
              padding: '10px 24px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            }}
          >
            See More
          </button>
        </div>
      </div>

      {/* TopServices section */}
      <TopServices limit={4} hideFooter={true} hideDescription={true} />
      <div style={{ textAlign: 'center', marginTop: '1px', marginBottom: '20px',marginLeft:"40px" }}>
        <button
          onClick={() => navigate('/top-services')}
          style={{
            backgroundColor: '#6666ff',
            color: 'white',
            padding: '10px 24px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          }}
        >
          See More
        </button>
      </div>

      <VendorBanner />
      <CustomerHelp />
    </div>
          <Footer /> 
        </>
  );
};

export default Home;
